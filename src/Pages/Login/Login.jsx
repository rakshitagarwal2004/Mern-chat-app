import React from 'react'
import assets from '../../assets/assets'
import './Login.css'
import { signup ,login} from '../../Config/firebase'

const Login = () => {

  const [currState, setCurrState] = React.useState('Sign Up');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();// Prevent the default form submission behavior
    if (currState === 'Sign Up') {
      await signup(username, email, password);
    } else {
      await login(email, password);
    }
  }

  return (
    <div className='login'>
     <img src={assets.logo_big} alt="logo" className='logo' />
     <form onSubmit={onSubmitHandler} className='login-form'>

      <h2>{currState}</h2>

      {currState === 'Sign Up' ?<input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" placeholder='Enter your name' className='form-input'required />: null} 

      <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='Enter your email' className='form-input' required />
      <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" placeholder='Enter your password' className='form-input' required />
      <button type='submit'>{currState === 'Sign Up' ? 'Create Account' : 'Login Now'}</button>

      <div className='login-term'>
        <input type="checkbox"/>
        <p>I agree to the terms and conditions </p>
      </div>
      <div className='login-forget'>

        {
          currState === 'Sign Up' ? 
          <p className='login-toggle'>Already have an account <span onClick={() => setCurrState('Login')}>Login here</span></p> 
          : 
          <p className='login-toggle'>Don't have an account <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
        } 
        
      </div>
     </form>
    </div>
  )
}

export default Login
