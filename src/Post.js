import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const params = useParams();
  const navigateTo = useNavigate();
  const [post, setPost] = useState();

  useEffect(() => {
    const makeAPICall = async () => {
      const postResponse = await fetch(
        `http://localhost:3001/post/${params.id}`
      );
      const postData = await postResponse.json();
      setPost(postData.post);
    };
    makeAPICall();
  }, [params.id]);

  if (!post) {
    return (
      <div>
        <h1>Post does not exist or is loading...</h1>
      </div>
    );
  }

  const deleteClicked = async () => {
    const deleteResponse = await fetch(
      `http://localhost:3001/post/${params.id}`,
      {
        method: "DELETE",
      }
    );
    navigateTo("/");
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <h3>{post.tagline}</h3>
      <p>{post.content}</p>
      <div>
        <span
          style={{
            color: "red",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={deleteClicked}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default Post;
