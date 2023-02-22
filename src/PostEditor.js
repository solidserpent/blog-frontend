import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [content, setContent] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(`http://localhost:3001/authStatus`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.loggedIn) {
      } else {
        alert("Fluff off. Not authorized");
        navigateTo("/");
      }
    };
    checkAuth();
  }, []);

  const addPost = async (event) => {
    event.preventDefault();

    const postContent = {
      title, //shorthand of title: title (ie the key is "title" and the value from state is also called title)
      tagline,
      content,
    };

    /*const serverResponse =*/ await fetch(`http://localhost:3001/newPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postContent),
      credentials: "include",
    });

    navigateTo("/");
  };

  const logoutClicked = async () => {
    await fetch(`http://localhost:3001/logout`, {
      credentials: "include",
    });
    navigateTo("/");
  };

  return (
    <div className="container">
      <h1>Post Editor</h1>
      <span
        style={{
          textDecoration: "underline",
          color: "blue",
        }}
        onClick={logoutClicked}
      >
        Logout
      </span>
      <form onSubmit={addPost}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          className="form-control"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label>Tagline:</label>
        <input
          type="text"
          name="tagline"
          className="form-control"
          value={tagline}
          onChange={(event) => {
            setTagline(event.target.value);
          }}
        />
        <label>Content: </label>
        <textarea
          name="content"
          className="form-control"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostEditor;
