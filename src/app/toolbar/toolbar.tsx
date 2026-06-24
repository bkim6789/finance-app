import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'

export const Toolbar = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const loginError = useSelector((state: RootState) => state.user.loginError);

  const handleLogIn = () => {
    console.warn('@bgk loging:', loginUsername);
  }

  return (
    <div>
      <div>isLoggedIn: {String(isLoggedIn)}</div>
      <div>error: {loginError}</div>
      
      username: <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
      <button onClick={handleLogIn}>Log In</button>
    </div>
  );
}