import { useRef, useState, useEffect } from 'react';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

const loginBody = () => {
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

  const USER_REGEX = /^[a-zA-z][a-xA-X0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    userRef.current.focus();
  }, []);

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
    const userId = uniqueId();

    e.preventDefault();

    console.log(`Username : ${user}`);
    console.log(`Password : ${password}`);

    const url = 'https://api.escuelajs.co/api/v1/users/';
    const data = {
      name: 'defaultUser',
      email: `${user}`,
      password: `${password}`,
      avatar: 'https://picsum.photos/800',
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

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    setPasswordFocus(false);
    setUserFocus(false);
    setValidPassword(false);
    setValidName(false);
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
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          Username:
          <FontAwesomeIcon
            icon={faCheck}
            className={validName ? 'valid' : 'hide'}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validName || !user ? 'hide' : 'invalid'}
          />
        </label>
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

        <p
          id='uidnote'
          className={
            userFocus && user && !validName ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor='password'>
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPassword ? 'valid' : 'hide'}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPassword || !password ? 'hide' : 'invalid'}
          />
        </label>
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

        <p
          id='uidnote'
          className={
            passwordFocus && !validPassword ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{' '}
          <span aria-label='exclamation mark'>!</span>{' '}
          <span aria-label='at symbol'>@</span>{' '}
          <span aria-label='hashtag'>#</span>{' '}
          <span aria-label='dollar sign'>$</span>{' '}
          <span aria-label='percent'>%</span>
        </p>

        <button disabled={!validName || !validPassword ? true : false}>
          Sign Up
        </button>
      </form>
      <p>
        Already registered? <br />
        <span>
          <a href='#'>Sign in</a>
        </span>
      </p>
    </div>
  );
};

export default loginBody;
