const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const connection = require('../connection');


async function authToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json("É necessário preencher o token");
  }

  try {
    const token = authorization.split('').slice(7).join('');
    
    const userValidate = jwt.verify(token, jwtSecret);
    const query = `
      SELECT * FROM usuarios WHERE id = $1
    `;
    const users = await connection.query(query, [userValidate.id]);

    if (users.rowCount === 0) {
      return res.status(400).json("Usuário não encontrado.");
    }

    const { senha, ...user } = users.rows[0];
    req.infoUser = user;
    
    next();    
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = authToken;