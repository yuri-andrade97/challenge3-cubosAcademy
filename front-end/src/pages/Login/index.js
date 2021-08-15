import React, { useState, useContext } from 'react';

import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, TextField, Button, Backdrop, CircularProgress, Snackbar } from '@material-ui/core';

import { Alert } from '@material-ui/lab';


import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


import PasswordInput from '../../components/PasswordInput';
import { AuthContext } from '../../context/AuthContext';

import './style.css'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 378,
    boxShadow: "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    borderRadius: 16,
    padding: "80px 20px",
    display: "flex",
    flexDirection: "column",
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
      backgroundColor: "#007DFF"
    }
  },
  caption: {
    padding: "24px 90px 58px 90px"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { setToken } = useContext(AuthContext);

  const { handleSubmit, register, formState: { errors }, setError } = useForm();
  
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState('');


  async function login(data) {
    if (!data.email) {
      setError('email', { type: "validate" }, { shouldFocus: true })
      return;
    }

    if (!data.senha) {
      setError('senha', { type: "validate" }, { shouldFocus: true })
      return;
    }

    setRequestError('');
    setIsLoading(true);

    const response = await fetch('https://desafio-m03.herokuapp.com/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    });

    setIsLoading(false);

    const requestLoginResponse = await response.json();
    
    if (response.ok) {
      setToken(requestLoginResponse.token);
      localStorage.setItem("nome_loja", requestLoginResponse.usuario.nome_loja);
      localStorage.setItem("token", requestLoginResponse.token);
      history.push('/produtos');
      return;
    }
    setRequestError(requestLoginResponse);
  }

  function handleOnAlertClose() {
    setRequestError(''); 
  }

  return (
    <form className="container" onSubmit={handleSubmit(login)}>
      <Card className={classes.card}>
        <Typography variant="h4" component="h2">Login</Typography>
        <div className={classes.column}>
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
        </div>
        <Button type="submit" className={classes.button} variant="contained" color="primary">
            ENTRAR
        </Button>
        <Typography className={classes.caption} variant="caption"> Primeira vez aqui? <Link to="/cadastro">Crie uma conta</Link> </Typography>
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


export default Login;