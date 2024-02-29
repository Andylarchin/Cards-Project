import { useRef, useState, useEffect } from 'react';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState('hide');
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchpwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [sucess, setSuccess] = useState(false);

  const USER_REGEX = /^[a-zA-z][a-xA-X0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const uniqueId = () => {
    const S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  };

  useEffect(() => {
    const result = user;
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = password;
    setValidPassword(result);
    const match = password === matchpwd;
    setValidMatch(match);
  }, [password, matchpwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, password, matchpwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`Username : ${user}`);
    console.log(`Password : ${password}`);

    console.log(user, password);
    const url = 'https://api.escuelajs.co/api/v1/auth/login';
    const data = {
      email: `${user}`,
      password: `${password}`,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log('Login successful:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setPasswordFocus(false);
    setUserFocus(false);
    setValidPassword(false);
    setValidName(false);
    console.log(`Username : ${user}`);
    console.log(`Password : ${password}`);
  };

  return (
    <div>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={validPassword ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <button disabled={!validName || !validPassword ? true : false}>
          Sign in
        </button>
      </form>
      <p>
        Need to register? <br />
        <span>
          <a href='#'>Sign up</a>
        </span>
      </p>
    </div>
  );
};

export default Login;
