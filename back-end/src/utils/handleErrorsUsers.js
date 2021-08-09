function handleErrorsUsers(nome, email, senha, nome_loja) {
  if (!nome) {
    return "O campo nome é obrigatório";
  }

  if (!email) {
    return "O campo e-mail é obrigatório";
  }

  if (!senha) {
    return "O campo senha é obrigatório";
  }

  if (!nome_loja) {
    return "O campo nome da loja é obrigatório";
  }
}

module.exports = handleErrorsUsers;