import React from 'react';

import './Login.css';
import tindev from '../assets/tindev.svg';

export default function Login() {
  return (
    <div className="login-container">
      <form>
        <img src={tindev} alt="logo" id="tindev-logo"/>
        <input placeholder="Digite seu usuário do github" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
