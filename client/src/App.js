import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.authToken);
  const [posts, setPosts] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("logging in..")
    // make a POST request to the /login endpoint
    // the response will include the JWT token that we should store in sessionstorage
    const response = await axios.post("http://localhost:8080/login", {
      username: e.target.username.value,
      password: e.target.password.value
    })
    //store response.data.token in the session storage
    // console.log(response)
    sessionStorage.authToken = response.data.token;
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    //request to /profile (or /posts, any endpoint that would require authetication) and then display the data

    axios.get("http://localhost:8080/posts", {
      headers: {
        Authorization: `Bearer ${sessionStorage.authToken}`
      }
    }).then(resp => {
      console.log(resp.data)
      setPosts(resp.data)
    })

  }, [isLoggedIn])


  if (!isLoggedIn) {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>Username:<input type="text" name="username" /></label>
          <label>Password:<input type="password" name="password" /></label>
          <input type="submit" value="Login" />
        </form>
      </>
    );
  }

  return (
    <>
      <h1>Here are your posts, {localStorage.username}</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </>

  )

}

export default App;
