import { useEffect, useState } from 'react';

const App = () => {
  const [username, setUsername] = useState();

  const getGetData = async () => {
    const preResult = await fetch('http://localhost:8080/api', {
      credentials: 'include',
    });
    const { username } = await preResult.json();
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
    getGetData();
  }, []);
  return (
    <div>
      <h1>APP</h1>
      <h1>username: {username}</h1>
      <button onClick={getGetData}>GET CURRENET USER</button>
      <button onClick={tryToLogin}>LOGIN</button>
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default App;
