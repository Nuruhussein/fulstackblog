import Post from "../post/Post";
import "./posts.css";

export default function Posts({ post }) {
  return (
    <div className="posts">
      {post.map((p, index) => {
        return <Post post={p} key={index} />;
      })}
    </div>
  );
}
