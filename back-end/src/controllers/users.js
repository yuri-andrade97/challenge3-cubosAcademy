const connection = require('../connection');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const handleErrorsUsers = require('../utils/handleErrorsUsers');
 
const pwd = securePassword();

const register = async (req, res) => {
  const {
    nome,
    email,
    senha,
    nome_loja
  } = req.body;

  const error = handleErrorsUsers(nome, email, senha, nome_loja)

  if (error) {
    return res.status(400).json(error)
  }

  // validação se o e-mail já existe
  try {
    const user = await connection.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (user.rowCount > 0) {
      return res.json('Já existe usuário cadastrado com esse e-mail.');
    }

  } catch (error) {
    return res.status(400).json(error.message);
  }

  try {
    const userPassword = Buffer.from(senha);

    const hash = (await pwd.hash(userPassword)).toString("hex");

    const query = `
      INSERT INTO usuarios (nome, email, senha, nome_loja)
      VALUES ($1, $2, $3, $4)
    `;

    const user = await connection.query(query, [nome, email, hash, nome_loja]);

    if (user.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o usuário");
    }

    return res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const {
    email, senha
  } = req.body;
  
  if (!email) {
    return res.status(400).json("O campo e-mail é obrigatório.")
  }

  if (!senha) {
    return res.status(400).json("O campo senha é obrigatório.")
  }

  try {
    const query = `
      SELECT * FROM usuarios WHERE email = $1
    `;

    const users = await connection.query(query, [email]);

    if (users.rowCount === 0) {
      return res.status(400).json("Email ou senha inválidos.");
    }

    const user = users.rows[0];

    // verificação da senha.
    const result = await pwd.verify(Buffer.from(senha), Buffer.from(user.senha, "hex"));

    switch (result) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
      case securePassword.INVALID:
        return res.status(400).json('Email ou senha incorretos');
      case securePassword.VALID:
        break;
      case securePassword.VALID_NEEDS_REHASH:  
        try {
          const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
          const query = `
            UPDATE usuarios SET senha = $1 WHERE email = $2
         `;
          await connection.query(query, [hash, email]);
        } catch {
        }
        break;
    }

    const token = jwt.sign({
      id: user.id,
      nome: user.nome,
      email: user.email,
      nome_loja: user.nome_loja
    }, jwtSecret);

    const usuario = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      nome_loja: user.nome_loja,
    };

    return res.json({usuario, token});
  } catch (error) {
    return res.status(400).json(error.message);
  }
  
};

const viewProfile = async (req, res) => {
  const  { infoUser } = req;
  
  try {  
    const query = `
      SELECT * FROM usuarios WHERE id = $1
    `;

    const requestUser = await connection.query(query, [infoUser.id]);
    const { senha, ...user } = requestUser.rows[0];

    return res.status(200).json(user);

  } catch (error) {
    res.status(400).json("O token fornecido é inválido.")
  }

};

const updateProfile = async (req, res) => {
  const  { infoUser } = req;
  const {
    nome,
    email,
    senha,
    nome_loja
  } = req.body;

  const error = handleErrorsUsers(nome, email, senha, nome_loja)

  if (error) {
    return res.status(400).json(error)
  }

  try {
    const query = `
      SELECT * FROM usuarios WHERE email = $1
    `;

    const checkIfEmailAlreadyExists = await connection.query(query, [email]);

    if (checkIfEmailAlreadyExists.rowCount > 0) {
      return res.status(400).json("E-mail já cadastrado!");
    }
  } catch (error) {
    return res.status(400).json("O token fornecido é inválido.")
  }

  try {
    const userPassword = Buffer.from(senha);

    const hash = (await pwd.hash(userPassword)).toString("hex");

    const query = `
      UPDATE usuarios SET nome = $1, email = $2, senha = $3, nome_loja = $4  
      WHERE id = $5
    `;
    const updateUser = await connection.query(query, [nome, email, hash, nome_loja, infoUser.id])
    
    if (updateUser.rowCount === 0) {
      return res.status(400).json("Não foi possível atualizar os dados, tente novamente.");
    }

    return res.status(200).json("Usuário atualizado.");
  } catch (error) {
    return res.status(400).json("O token fornecido é inválidooo.")
  }

};

module.exports  = {
  register,
  login,
  viewProfile,
  updateProfile,
}