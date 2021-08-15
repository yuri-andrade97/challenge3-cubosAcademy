import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  InputAdornment, IconButton, Input, FormControl, InputLabel
 } from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons';


const useStyles = makeStyles({
  input: {
    width: 220
  }
})


function PasswordInput(props) {
  const classes = useStyles();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <FormControl> 
        <InputLabel 
          htmlFor={props.id}
          error={props.error}
        >
          {props.label}
        </InputLabel>
        <Input 
            id={props.id}
            type={isPasswordVisible ? "text" : "password"}
            className={classes.input}
            error={props.error}
            {...props.register()}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              }
          />
      </FormControl>
  )
}

export default PasswordInput;