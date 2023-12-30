import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const userInfo = fetchUser();
  const navigate = useNavigate();

  //for the above code, userinfo is either equals undefined or is equal to the actual content of the localstorage.

  useEffect(() => {
    if (!userInfo) {
      navigate("login");
    } else {
      const query = userQuery(userInfo?.sub);
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  const handleSlideOut = () => {
    setIsAnimatingOut(true); // Set the flag to trigger slide-out animation
    setTimeout(() => {
      setToggleSidebar(false); // After animation delay, close the sidebar
      setIsAnimatingOut(false); // Reset the flag after animation completion
    }, 500); // Adjust the time to match the slide-out animation duration
  };

  return (
    <div className='flex md:flex-row flex-col transition-height h-screen duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer'
            onClick={() => setToggleSidebar(true)}
          />
          <Link to='/' className='uppercase tracking-widest'>
            FotoFusion
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt='user-image'
              className='w-12 rounded-full'
            />
          </Link>
        </div>
      </div>
      {toggleSidebar && (
        <div
          className={`fixed w-2/3 bg-white h-screen overflow-y-auto shadow-md z-10 ${
            isAnimatingOut ? "animate-slide-out" : "animate-slide-in"
          }`}>
          <div className='absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle
              fontSize={34}
              className='cursor-pointer'
              onClick={handleSlideOut}
            />{" "}
          </div>
          <Sidebar user={user && user} closeToggle={handleSlideOut} />
        </div>
      )}
      <div className='pb-2 h-screen overflow-y-scroll flex-1' ref={scrollRef}>
        <Routes>
          <Route path='user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
