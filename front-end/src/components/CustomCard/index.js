import React, { useContext } from 'react';
import {
  Card, CardMedia, CardContent, Typography, Button
} from '@material-ui/core';

import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import useStyles from './style';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';


function CustomCard(props) {
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const history = useHistory();

  async function handleDelete(id) {
    const response = await fetch(`https://desafio-m03.herokuapp.com/produtos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      alert(data);
      history.push('/produtos')
      return 
    }
  }

  return (
    <Card className={classes.card}>

      <div className={classes.buttonSpace} onClick={() => handleDelete(props.id)}>
        <DeleteSweepIcon />
      </div>
      
      <CardMedia
        className={classes.image}
        image={props.imagem}
        title={props.nome}
      />
      <CardContent>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h3"
          className={classes.nome}
        >
            {props.nome}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.descricao}
        >
          {props.descricao}
        </Typography>
      </CardContent>
      <div className={classes.cardFooter}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.estoque}
        >
            {props.estoque} {props.estoque > 1 ? 'UNIDADES' : 'UNIDADE'} 
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.preco}
        >
            R${(props.preco / 100).toFixed(2)}
          </Typography>
      </div>
  </Card>
  )
}

export default CustomCard;