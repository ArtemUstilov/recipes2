import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {API_URL} from "../../constants";
import './style.css';

const LoginForm = () => {
  const [loggedin, setLoggedin] = useState(localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined');
  const [ error, setError ] = useState('');
  const history = useHistory();
  const loginUser = async ({login, password}) => {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.status === 401){
        setError('Invalid creds');
        return;
    }
    const { token } = await response.json();

    setError(null);
    window.location.reload();
    localStorage.setItem('token', token);
    setLoggedin(true);
    // history.push('/recipes');
  };
  if(loggedin){
    return(
      <div className="login_form">
      <button onClick={() => {
        localStorage.setItem('token', undefined);
        setLoggedin(false);
        window.location.reload();
        history.push('/recipes');
      }}>Logout </button>

      </div>
    );
  }
  return (
    <div className="login_form">
      <form onSubmit={async (e) => {
        e.persist();
        e.preventDefault();
        const {target: {elements: {login, password}}} = e;
        await loginUser({
          login: login.value,
          password: password.value,
        });
      }}>
        <input type="text" name="login"  placeholder="login" onChange={() => setError(null)}/>
        <input type="password" name="password" placeholder="password" onChange={() => setError(null)}/>
        <input type="submit" value="login"/>
      </form>
      {error && <p style={{color: 'red'}}>
        {error}
      </p>}
    </div>
  )
};

export default LoginForm;
