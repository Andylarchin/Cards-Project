import {useRef, useState, useEffect} from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css'


const loginBody = () => {  


  const userRef = useRef();
  const errRef = useRef();


    const [user,setUser] = useState('');
    const [validName,setValidName] = useState('hide');
    const [userFocus,setUserFocus] = useState(false);

    const [password,setPassword] = useState('');
    const [validPassword,setValidPassword] = useState(false);
    const [passwordFocus,setPasswordFocus] = useState(false);

    const [matchpwd,setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus,setMatchFocus] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [sucess,setSuccess] = useState(false);


    const USER_REGEX = /^[a-zA-z][a-xA-X0-9-_]{3,23}$/
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/


    // useEffect(() => {
    //   userRef.current.focus();
    // }, []);
  
    useEffect(() => {
      const result = USER_REGEX.test(user);
      console.log(result);
      console.log(`Username : ${user}`);
      setValidName(result)
    }, [user]);


    useEffect(() => {
      const result = PWD_REGEX.test(password);
      console.log(result);
      console.log(`Password : ${password}`);
      setValidPassword(result);
      const match = password === matchpwd;
      setValidMatch(match)
    }, [password, matchpwd])


    useEffect(() => {
      setErrMsg('')
    }, [user,password,matchpwd]);
  
  
    return (
    <div>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
      <h1>Register</h1>

      <form>
        <label htmlFor='username'>
          Username: 
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
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

<p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

      </form>

      <form>
        <label htmlFor='password'>
          Password: 
          <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
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

<p id="uidnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
      </form>
    </div>

    
    );
  };

  export default loginBody;
