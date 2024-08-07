import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SideBar() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      // const res = await axios.get("http://localhost:5000/api/categories");
      // setCats(res.data);
      const res = await axios.get(
        "https://fulstackblog-api.vercel.app/api/posts",
        {
          timeout: 10000, // Set timeout to 10 seconds (adjust as needed)
        }
      );

      setPosts(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar hidden md:block">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="../assets/1702302281627im1.jpg" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {[...new Set(posts.map((post) => post.categories))].map(
            (category, index) => (
              <Link to={`/?cat=${category}`} key={index} className="link">
                <li className="sidebarListItems">{category}</li>
              </Link>
            )
          )}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
