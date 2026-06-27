import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  clearLoginError,
  loginUser,
  logoutUser,
  selectFormattedUsername,
  selectUserIsAttemptingToLogIn,
  selectUserIsLoggedIn,
  selectUserLoginError,
} from '../../shared/user/userSlice'
import { resetTodosState } from '../../features/todos/state/todosSlice'

export const Toolbar = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [shouldCapitalize, setShouldCapitalize] = useState(true);
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) =>
    selectFormattedUsername(state, shouldCapitalize),
  );
  const isLoggedIn = useAppSelector(selectUserIsLoggedIn);
  const isAttemptingToLogIn = useAppSelector(selectUserIsAttemptingToLogIn);
  const loginError = useAppSelector(selectUserLoginError);

  const handleLogIn = async () => {
    await dispatch(
      loginUser({
        username: inputUsername,
        password: inputPassword,
      }),
    );
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
    dispatch(resetTodosState());
    setInputPassword('');
  };

  const handleShouldCapitalizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldCapitalize(event.target.checked);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loginError) {
      dispatch(clearLoginError());
    }

    setInputUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loginError) {
      dispatch(clearLoginError());
    }

    setInputPassword(event.target.value);
  };

  const handlePasswordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      void handleLogIn();
    }
  };

  return (
    <div>
      <div>username: {username}</div>
      <div>isLoggedIn: {String(isLoggedIn)}</div>
      <div>isAttemptingToLogIn: {String(isAttemptingToLogIn)}</div>
      <div>error: {loginError}</div>

      <div>
        <label>
          capitalize username:{' '}
          <input
            type="checkbox"
            checked={shouldCapitalize}
            onChange={handleShouldCapitalizeChange}
          />
        </label>
      </div>

      <div>
        username input:{' '}
        <input type="text" value={inputUsername} onChange={handleUsernameChange} />
      </div>

      <div>
        password input:{' '}
        <input
          type="password"
          value={inputPassword}
          onChange={handlePasswordChange}
          onKeyDown={handlePasswordKeyDown}
        />
      </div>

      <div>
        <button onClick={handleLogIn} disabled={isAttemptingToLogIn}>
          {isAttemptingToLogIn ? 'Logging in...' : 'Log In'}
        </button>
        <button onClick={handleLogOut} disabled={!isLoggedIn}>
          Log Out
        </button>
      </div>
    </div>
  );
}