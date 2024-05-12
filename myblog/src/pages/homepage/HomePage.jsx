import { useEffect, useState } from "react";
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import SideBar from '../../components/sidebar/Sidebar'
import axios from "axios";
import "./homePage.css";
import { useLocation } from "react-router";



function HomePage() {
   const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://fulstackblog-api.vercel.app/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <div>
      <Header />
      <div className="home">
        <Posts post={posts}/>
      <SideBar/>
      </div>
    </div>
  )
}

export default HomePage
