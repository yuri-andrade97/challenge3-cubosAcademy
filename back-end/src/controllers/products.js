const connection = require('../connection');

const handleErrorsProducts = require('../utils/handleErrorsProducts');

const getAllProducts = async (req, res) => {
  const category = req.query.categoria;
  const price = req.query.price;
  const  { infoUser } = req;
  
  if (category) {
    try {
      const query = `
        SELECT * FROM produtos WHERE usuario_id = $1 AND categoria = $2
      `;
      const products = await connection.query(query, [infoUser.id ,category]);
      
      if (products.rowCount === 0) {
        return res.status(400).json(`Produto da categoria ${category}, não encontrado.`);
      }
      return res.status(200).json(products.rows);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  if (price) {
    try {
      const query = `
        SELECT * FROM produtos WHERE usuario_id = $1 AND preco > $2
      `;
      const products = await connection.query(query, [infoUser.id, Number(price)]);
      
      if (products.rowCount === 0) {
        return res.status(400).json(`Produto não encontrado.`);
      }
      return res.status(200).json(products.rows);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  try {  
    const query = `
      SELECT * FROM produtos WHERE usuario_id = $1
    `;

    const products = await connection.query(query, [infoUser.id]);

    return res.status(200).json(products.rows)
  } catch (error) {
    return res.status(400).json(error.message);
  }

};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const  { infoUser } = req;

  try {
    const query = `
      SELECT * FROM produtos WHERE id = $1 AND usuario_id = $2
    `;
    
    const product = await connection.query(query, [Number(id) ,infoUser.id])
    
    if (product.rowCount === 0) {
      return res.status(400).json("Produto não encontrado.")
    }

    return res.status(200).json(product.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const registerProduct = async (req, res) => {
  const  { infoUser } = req;
  const {
    nome, 
    estoque,
    categoria,
    preco,
    descricao,
    imagem
  } = req.body;

  const error = handleErrorsProducts(nome, estoque, preco, descricao);

  if (error) {
    return res.status(400).json(error)
  }

  try {
    const query = `
      INSERT INTO produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const product = await connection.query(query, [infoUser.id, nome, estoque, categoria, preco, descricao, imagem]);
    
    if (product.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o produto.");
    }

    return res.status(200).json("Produto cadastrado!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  const  { infoUser } = req;
  const { id } = req.params;
  const {
    nome,
    estoque,
    categoria,
    preco,
    descricao,
    imagem
  } = req.body;

  const error = handleErrorsProducts(nome, estoque, preco, descricao);

  if (error) {
    return res.status(400).json(error)
  }

  try {
    const query = `
      UPDATE produtos SET nome = $1, estoque = $2, categoria = $3, preco = $4, descricao = $5, imagem = $6
      WHERE id = $7 AND usuario_id = $8
    `;

    const product = await connection.query(query, [nome, estoque, categoria, preco, descricao, imagem, Number(id)], infoUser.id);

    if (product.rowCount === 0) {
      return res.status(400).json("Não foi possível editar o produto.");
    }

    return res.status(200).json("Produto atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const  { infoUser } = req;
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM produtos WHERE id = $1 AND usuario_id = $2
    `;

    const product = await connection.query(query, [Number(id), infoUser.id]);

    if (product.rowCount === 0) {
      return res.status(400).json("Não foi possível excluir o produto.");
    }

    return res.status(200).json("Produto excluido com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  registerProduct,
  updateProduct,
  deleteProduct,
}
