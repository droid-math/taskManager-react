import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from   'primereact/button';

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './Login.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();   


    try {
      const response = await   
 fetch('/api/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // Redirecionar   
        //para /dashboard (veremos como fazer isso com React Router)
        // ... 
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <div className="card login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <InputText 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <Password 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              feedback={false}
            />
          </div>
          <Button label="Entrar" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;