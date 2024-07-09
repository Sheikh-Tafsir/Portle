import React, {useState, useEffect} from 'react'
import './NavigationBar.css';
// import {BsFillPlayCircleFill} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import { FaSearch } from "react-icons/fa";
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link } from 'react-router-dom';

import { checkLogin } from '@/utils/checkLogin';
import {useUserContext} from '../../context/UserContext';
import { Button } from '@/components/ui/button';
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { apiPath } from '@/utils/apiPath';
import axios from 'axios';
const clientPath = import.meta.env.VITE_CLIENT_PATH;


const NavigationBar = () => {
  const loggedIn = checkLogin();
  const {userInfo, setUserInfo} = useUserContext();
  const [menuClickedCount,setMenuClickedCount]=useState(0);
  const [allusers, setAllusers] = useState([])
  const [searchInput, setSearchInput] = useState('');

  const toggleResponsiveNav = () => {
    let homepage_navigation_navMain = document.querySelector('.homepage_navigation_navMain');
    let navBarIconBurger = document.querySelector('.navBarIconBurger');
    let navBarIconCross = document.querySelector('.navBarIconCross');
    //alert(menuClickedCount);
    if(menuClickedCount&1){
      homepage_navigation_navMain.classList.remove('homepage_navigation_navMainOpen');
      navBarIconBurger.style.visibility = 'visible';
      navBarIconCross.style.visibility = 'hidden';
    }
    else{
      homepage_navigation_navMain.classList.add('homepage_navigation_navMainOpen');
      navBarIconCross.style.visibility = 'visible';
      navBarIconBurger.style.visibility = 'hidden';
    }
    setMenuClickedCount(menuClickedCount+1);
  }


  //screen size
  const [deviceType, setDeviceType] = useState('');

  //change navbar accorging to screen size
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setDeviceType('mobile');
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('pc');
      }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call the resize handler initially to set the initial state
    handleResize();

    // Cleanup: remove event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to ensure effect runs only once
  
  

  //slide to component
  useEffect(() => {
    const componentSlide = () => {
      var sectionId = window.location.hash.substring(1);
    
      // Check if the section ID exists and corresponds to an element on the page
      if (sectionId) {
        var targetSection = document.getElementById(sectionId);
    
        // Scroll to the target section smoothly
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'auto'
          });
        }
      }
    }

    setTimeout(() => {
      componentSlide();
    }, 150);
  }, []);
  
  
  //navbar fixation
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if(deviceType == 'pc'){
        if (window.scrollY > 100) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
      else{
        if (window.scrollY > 70) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.setItem('portleAccessToken', '');
    setUserInfo([]);
    window.open("/", "_top");
  };

  const getUserList = async () => {
    try{
      const apipath = `${apiPath}/users`;
      const response = await axios.get(apipath);
      // console.log(response);
      if(response.data.message=="found all users"){
        setAllusers(response.data.user);
      }

    }
    catch(error){
        console.log(error.response.data.message);
    };
  }

  useEffect(() => {
    getUserList();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter users based on search input
  const filteredUsers = allusers.filter(user =>
    user.username.toLowerCase().includes(searchInput.toLowerCase()))
  .slice(0, 8);

  return (
    <header className="homepage_navigation">
        <div className={`homepage_navigation_mainBox ${isFixed? 'homepage_navigation_fixed': ''}`}>
          <div className="homepage_navigation_logoBar">
            <a href="/" className='my-auto'>
              <img src="/navbar/logo2.png" alt="navlogo" loading="lazy"/>
            </a>
            <div className='my-auto navBarIconBar'>
              <GiHamburgerMenu className='my-auto navBurgerIcon navBarIconBurger text-green-900' onClick={()=> toggleResponsiveNav()}/>
              <ImCross className=' my-auto navBurgerIcon navBarIconCross text-green-900' onClick={()=> toggleResponsiveNav()}/>
            </div>
            <div className='searchbox'>
              <div className='searchBar'>
                <FaSearch/>
                <input type="text" value={searchInput} onChange={handleSearchInputChange} placeholder='Search user'/>
              </div>
              <div className='searchlist'>
              {searchInput && (
                <div className='searchlist'>
                  {filteredUsers.map(user => (
                    // <a href={`${clientPath}/portfolio/${user.username}`} target="_blank" rel="noopener noreferrer" className='user' key={user.id}>
                    //   <img src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSCRrx-Ug72ewPFuGyN5z2flmPbgDeUBIOlLCSy9FpCHiCJ0tRKKq83nRaCjtHiqmY9XTtKVdndn63WbdM9E4u4jq7nmLQJ7LGbAFA9U"} alt={user.name} />
                    //   <p>{user.username}</p>
                    // </a>
                    <Link to={`/portfolio/${user.username}`} className='user' key={user.id}>
                      <img src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSCRrx-Ug72ewPFuGyN5z2flmPbgDeUBIOlLCSy9FpCHiCJ0tRKKq83nRaCjtHiqmY9XTtKVdndn63WbdM9E4u4jq7nmLQJ7LGbAFA9U"} alt={user.name} />
                      <p>{user.username}</p>
                    </Link>
                  ))}
                </div>
              )}
              </div>
            </div>
          </div>

          <div className='homepage_navigation_navMain'>
            <div className='homepage_navigation_navMenu'>
              <div className="my-auto homepage_navigation_navSubMenu">
                <Link to="/" className='homepage_navigation_navMenuPageLinks'>Home</Link>
                {
                  loggedIn ?
                  ( 
                    <>
                      <DropdownMenu className="cursor-pointer">
                        <DropdownMenuTrigger asChild>
                          {userInfo.image ?
                            <img src={userInfo.image} className='homepage_navigation_navSubMenuImg cursor-pointer' />
                            :
                            <img src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" 
                              className='homepage_navigation_navSubMenuImg cursor-pointer'
                            />
                          }
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mt-[2vw] lg:mt-[1vw]">
                          <DropdownMenuLabel>{userInfo.username}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <Link to="/profile" className='homepage_navigation_navMenuPageLinks'>Profile</Link>
                              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <UserPlus className="mr-2 h-4 w-4" />
                                <span>Invite users</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={()=>handleLogout()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )
                  : 
                  (
                    <Link to="/signup" className="my-auto homepage_navigation_loginButton">
                      Log In
                    </Link>
                  )
                }
              </div>
            </div> 
            {/* <div className='navExtra' onClick={()=> respNav()}></div> */}
          </div>
        </div>
    </header>
  )
}

export default NavigationBar