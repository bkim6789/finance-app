import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import {
  setIsLoggedIn,
  setUsername,
  selectFormattedUsername,
  selectUserIsAttemptingToLogIn,
  selectUserIsLoggedIn,
  selectUserLoginError,
} from '../../shared/user/userSlice'

export const Toolbar = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [shouldCapitalize, setShouldCapitalize] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector((state: RootState) =>
    selectFormattedUsername(state, shouldCapitalize),
  );
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const isAttemptingToLogIn = useSelector(selectUserIsAttemptingToLogIn);
  const loginError = useSelector(selectUserLoginError);

  const handleLogIn = () => {
    dispatch(setUsername(inputUsername));
  }

  const handleIsLoggedInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsLoggedIn(event.target.checked));
  };

  const handleShouldCapitalizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldCapitalize(event.target.checked);
  };

  return (
    <div>
      <div>username: {username}</div>
      <div>isLoggedIn: {String(isLoggedIn)}</div>
      <div>isAttemptingToLogIn: {String(isAttemptingToLogIn)}</div>
      <div>error: {loginError}</div>

      <div>
        <label>
          logged in: <input type="checkbox" checked={isLoggedIn} onChange={handleIsLoggedInChange} />
        </label>
      </div>

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
        <input type="text" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />
      </div>

      <div>
        <button onClick={handleLogIn}>Log In</button>
      </div>
    </div>
  );
}