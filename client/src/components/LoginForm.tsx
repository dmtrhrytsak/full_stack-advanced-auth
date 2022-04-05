import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '..';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const { store } = useContext(Context);

  return (
    <div>
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setpassword(e.target.value)}
      />

      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.registration(email, password)}>
        Registeration
      </button>
    </div>
  );
};

export default observer(LoginForm);
