import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useTodos } from '../../context/TodosContext'

export const Toolbar = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [shouldCapitalize, setShouldCapitalize] = useState(true);
  const { userData, loginUser, logoutUser, clearLoginError } = useUser();
  const { resetTodos } = useTodos();

  const username = userData.username && shouldCapitalize 
    ? userData.username.toUpperCase() 
    : userData.username.toLowerCase();
  const isLoggedIn = userData.isLoggedIn;
  const isAttemptingToLogIn = userData.authStatus === 'pending';
  const loginError = userData.loginError;

  const handleLogIn = async () => {
    try {
      await loginUser({
        username: inputUsername,
        password: inputPassword,
      });
    } catch {
      // Error is already set in context
    }
  };

  const handleLogOut = () => {
    logoutUser();
    resetTodos();
    setInputPassword('');
  };

  const handleShouldCapitalizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldCapitalize(event.target.checked);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loginError) {
      clearLoginError();
    }

    setInputUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loginError) {
      clearLoginError();
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