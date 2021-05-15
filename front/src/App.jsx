import { useEffect, useState } from 'react';

const App = () => {
  const [username, setUsername] = useState();

  const getCurrentUser = async () => {
    console.log(' getCurrentUser = > start');

    const preResult = await fetch('http://localhost:8080/api', {
      credentials: 'include',
    });

    const { username } = await preResult.json();
    console.log(' username =', username);
    setUsername(username);
  };

  const tryToLogin = async () => {
    const preResult = await fetch('http://localhost:8080/api', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'rauf', password: '123' }),
    });
    const { username } = await preResult.json();
    setUsername(username);
  };

  const logout = async () => {
    const preResult = await fetch('http://localhost:8080/api', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'rauf', password: '123' }),
    });
    const { username } = await preResult.json();
    setUsername(username);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      <h1>APP</h1>
      <h1>username: {username}</h1>

      <button onClick={getCurrentUser}>GET CURRENET USER</button>
      <button onClick={tryToLogin}>LOGIN</button>
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default App;
