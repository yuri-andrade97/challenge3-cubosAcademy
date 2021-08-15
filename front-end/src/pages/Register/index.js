import React, { useState } from 'react';

import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, Typography, TextField, Button, Backdrop, CircularProgress, Snackbar
 } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


import PasswordInput from '../../components/PasswordInput';

import './style.css'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 378,
    boxShadow: "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    borderRadius: 16,
    padding: "80px 20px",
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",

    "& h2": {
      textAlign: "center",
      marginBottom: 68
    }
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
    marginBottom: 40
  },
  input: {
    width: 220,
  },
  button: {
    backgroundColor: "#007DFF",
    margin: "0 auto",

    "&:hover": {
      backgroundColor: "#064F9B"
    }
  },
  caption: {
    padding: "24px 90px 38px 90px"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


function Register() {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, register, formState: { errors }, setError } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState('');

  async function registerUser(data) {
    if (data.senha !== data.repitaSenha) {
      setError('senha', { type: "validate" }, { shouldFocus: true })
      setError('repitaSenha', { type: "validate" }, { shouldFocus: false })
      return
    }

    setRequestError('');
    setIsLoading(true);

    const response = await fetch('https://desafio-m03.herokuapp.com/usuarios', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    });

    setIsLoading(false);

    if (response.ok) {
      history.push('/');
      return;
    }

    const requestResponse = await response.json();
    setRequestError(requestResponse);
  };

  function handleOnAlertClose() {
    setRequestError(''); 
  }

  return (
    <form className="container" onSubmit={handleSubmit(registerUser)}>
      <Card className={classes.card}>
        <Typography variant="h4" component="h2">Criar uma conta</Typography>
          <div className={classes.column}>
            <TextField
              className={classes.input}
              label="Seu nome"
              error={!!errors.nome}
              {...register('nome', { required: true })}
            />
            <TextField
              className={classes.input}
              label="Nome da loja"
              error={!!errors.nome_loja}
              {...register('nome_loja', { required: true })}
            />
            <TextField
              className={classes.input}
              label="Email"
              error={!!errors.email}
              {...register('email', { required: true })}
            />
            <PasswordInput
              label="Senha"
              id="senha"
              error={!!errors.senha}
              register={() => register('senha', { required: true })}
            />
            <PasswordInput 
              label="Repita a senha"
              id="repita-senha"
              error={!!errors.repitaSenha}
              register={() => register('repitaSenha', { required: true })}
            />
          </div>
        <Button type="submit" className={classes.button} variant="contained" color="primary">
            CRIAR CONTA
        </Button>
        <Typography className={classes.caption} variant="caption">
          Já possui uma conta? <Link to="/">ACESSE</Link> 
        </Typography>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={!!requestError} autoHideDuration={6000} onClose={handleOnAlertClose}>
          <Alert onClose={handleOnAlertClose} severity="error">
            {requestError}
          </Alert>
        </Snackbar>
      </Card>
    </form>
  )
};


export default Register;