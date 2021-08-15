import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';


import CustomCard  from '../../components/CustomCard';
import { Button } from '@material-ui/core';
import Sidebar from '../../components/Sidebar';

import './style.css';

function Products() {
  const { token, setToken } = useContext(AuthContext);
  const [nameStore, setNameStore] = useState(localStorage.getItem("nome_loja"));
  const history = useHistory();

  const [product, setProduct] = useState([]);

  
  useEffect(() => {
    async function getStore() {
      const response = await fetch('https://desafio-m03.herokuapp.com/produtos', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProduct(data);   
    }
    
    getStore();
  }, [token])

  function handleLogout() {
    setToken('');
    history.push('/');
  }

  return (
      <div className="content">
        <Sidebar />
        <div className="contentProduct">
          <h1>{nameStore}</h1>
          <h2>Seus produtos</h2>
          <div className="carrosel">
            {product.map(item => {
              return (
                <CustomCard 
                  key={item.id}
                  id={item.id}
                  nome={item.nome}
                  descricao={item.descricao}
                  imagem={item.imagem}
                  estoque={item.estoque}
                  preco={item.preco}
                />
              )
            })}
          </div>
          <div className="row" />
          <Button className="button" variant="contained" color="primary">
            Adicionar Produto
          </Button>
        </div>
      </div>
  );
};

export default Products;