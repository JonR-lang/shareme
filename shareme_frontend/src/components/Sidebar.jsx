import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { categories } from "../utils/data";
const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle();
  };
  const isActiveStyle =
    "flex items-center px-5 py-2 gap-3 font-bold border-r-2 border-black transition-all duration-300 ease-in-out";
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-300 ease-in-out";

  return (
    <div className='flex flex-col justify-between bg-gray-200 h-full overflow-y-scroll min-w-[210px] hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='flex px-5 gap-2 my-6 pt-6 w-[190px] items-center'
          onClick={handleCloseSidebar}>
          <p className='uppercase'>FotoFusion</p>
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}>
            <RiHomeFill fontSize={20} />
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
            Discover categories
          </h3>
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              onClick={handleCloseSidebar}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              key={category.name}>
              <img
                src={category.image}
                alt='category-image'
                className='rounded-full w-10 h-10 object-cover shadow-sm'
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          onClick={handleCloseSidebar}
          className='flex my-5 mb-3 gap-2 items-center p-2 bg-white rounded-lg shadow-lg mx-3'>
          <img
            src={user.image}
            className='w-10 h-10 rounded-full'
            alt='user-profile'
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
