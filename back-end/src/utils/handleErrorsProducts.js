function handleErrorsProducts(nome, estoque, preco, descricao) {
  if (!nome) {
    return "O campo nome é obrigatório";
  }

  if (!estoque) {
    return "O campo estoque é obrigatório";
  }

  if (!preco) {
    return "O campo preço é obrigatório";
  }

  if (!descricao) {
    return "O campo descrição é obrigatório";
  }
}

module.exports = handleErrorsProducts;