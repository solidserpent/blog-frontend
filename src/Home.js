import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [postsInState, setPostsInState] = useState([]);
  useEffect(() => {
    const makeAPICall = async () => {
      const postsResponse = await fetch(`http://localhost:3001/posts`);
      const postsData = await postsResponse.json();
      console.log(postsData);
      setPostsInState(postsData.posts);
    };
    makeAPICall();
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(`http://localhost:3001/authStatus`, {
        credentials: "include",
      });
      const data = await response.json();
      setLoggedIn(data.loggedIn);
    };
    checkAuth();
  }, []);
  return (
    <div>
      <h1>Brian Blog Home</h1>
      <div className="row">
        {postsInState.map((post) => {
          return (
            <div className="col-4" key={post.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <h6>
                    {new Date(post.createdAt).toLocaleDateString()}{" "}
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </h6>
                  <p>By: {post.user.firstName}</p>
                  <p className="card-text">{post.tagline}</p>
                  <Link to={`/post/${post.id}`} className="btn btn-primary">
                    Read more
                  </Link>{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {loggedIn ? (
        <Link to="/postEditor">Post Editor</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Home;
