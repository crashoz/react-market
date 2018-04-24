/**
*
* LoginModal
*
*/

import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  display: flex;
`

const Form = styled.form`
  background-color: rgba(255,255,255,1.0);
  border: 1 px solid #000000;
  border-radius: 10px;
  margin: auto;
  text-align: center;
  width: 30%;
`
const Input = styled.input`
  background-color: rgba(250,250,250,1.0);
  border: 1px solid #888888;
  border-radius: 3px;
  width: 60%;
  height: 2em;
  text-align: center;
  display: block;
  margin: auto;
  margin-bottom: 10px;
  padding: 5px;
`


function LoginModal(props) {
  if (!props.display) {
    return null;
  }
  return (
    <Background onClick={props.cancelModal}>
      <Form onSubmit={(event) => {props.login(event.target.username.value, event.target.password.value); event.preventDefault()}} onClick={(event) => event.stopPropagation()} >
        <h1>Connexion</h1>
        <Input type="text" name="username" placeholder="Email" />
        <Input type="password" name="password" placeholder="Mot de passe" style={{marginBottom: '50px'}}  />
        <Input type="submit" value="Connexion" />
        <p style={{color: '#ff0000'}}>{props.loginError}</p>
        <a href='#' onClick={props.callRegister}>Inscription</a>
      </Form>
    </Background>
  );
}

LoginModal.propTypes = {

};

export default LoginModal;
