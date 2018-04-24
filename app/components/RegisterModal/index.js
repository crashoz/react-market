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


function RegisterModal(props) {
  if (!props.display) {
    return null;
  }
  return (
    <Background onClick={props.cancelModal}>
      <Form onSubmit={(event) => {props.register(event.target.username.value, event.target.password1.value, event.target.password2.value, event.target.code.value); event.preventDefault();}} onClick={(event) => event.stopPropagation()} >
        <h1>Inscription</h1>
        <Input type="text" name="username" placeholder="Email" />
        <Input type="password" name="password1" placeholder="Mot de passe" />
        <Input type="password" name="password2" placeholder="Mot de passe" />
        <Input type="text" name="code" placeholder="Code Joueur" />
        <Input type="submit" value="S'inscrire" />
        <p style={{color: '#ff0000'}}>{props.registerError}</p>
      </Form>
    </Background>
  );
}

RegisterModal.propTypes = {

};

export default RegisterModal;
