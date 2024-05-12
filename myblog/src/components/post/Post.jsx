import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post}) {
  const PF = "https://fulstackblog-api.vercel.app/images/";
  return (
    <div className="post w-screen ml-0 md:w-72">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats text-blue-300">
          {/* {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))} */}

          {post.categories}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc.substring(0, 20) + " ..."}</p>
    </div>
  );
}
