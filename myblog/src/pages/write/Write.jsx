import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      try {
        const uploadResponse = await axios.post("https://fulstackblog-api.vercel.app/api/upload", data);
        newPost.photo = uploadResponse.data.url; // Use the URL from Vercel Blob Storage
      } catch (err) {
        console.error("Failed to upload file:", err);
      }
    }
    try {
      const res = await axios.post("https://fulstackblog-api.vercel.app/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg m-5 md:ml-[150px]" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup m-5 md:ml-[150px]">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup m-5 md:ml-[150px] flex flex-col">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input
            type="input"
            placeholder="Add category you want"
            className="cat"
            onChange={(e) => setCategories(e.target.value)}
          />
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
