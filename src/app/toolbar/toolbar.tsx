import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import {
  selectFormattedUsername,
  selectUserIsAttemptingToLogIn,
  selectUserIsLoggedIn,
  selectUserLoginError,
} from '../../shared/user/userSlice'

export const Toolbar = () => {
  const [inputUsername, setInputUsername] = useState('');
  const username = useSelector((state: RootState) => selectFormattedUsername(state, true));
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const isAttemptingToLogIn = useSelector(selectUserIsAttemptingToLogIn);
  const loginError = useSelector(selectUserLoginError);

  const handleLogIn = () => {
    console.warn('@bgk loging:', inputUsername);
  }

  return (
    <div>
      <div>username: {username}</div>
      <div>isLoggedIn: {String(isLoggedIn)}</div>
      <div>isAttemptingToLogIn: {String(isAttemptingToLogIn)}</div>
      <div>error: {loginError}</div>
      
      username input: <input type="text" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />
      <button onClick={handleLogIn}>Log In</button>
    </div>
  );
}