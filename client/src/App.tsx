import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '.';
import UserService from './services/UserService';
import { IUser } from './models/IUser';
import LoginForm from './components/LoginForm';

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Get users</button>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {store.isAuth ? `User is authenticated ${store.user.email}` : 'LOG IN'}
      </h1>
      <p>
        {store.user.isActivated
          ? 'Account is activated'
          : 'Please, active your account!'}
      </p>

      <button onClick={() => store.logout()}>Logout</button>

      <div>
        <button onClick={getUsers}>Get users</button>
      </div>

      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default observer(App);
