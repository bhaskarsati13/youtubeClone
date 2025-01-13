import React from 'react';
import './navbar.css';
import menu from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search from '../../assets/search.png';
import upload from '../../assets/upload.png';
import more from '../../assets/more.png';
import userPfp from '../../assets/jack.png';
import notification from '../../assets/notification.png';
import { Link } from 'react-router-dom';

export default function NavBar({ setSmallSidebar }) {
    return (
        <nav className="navBar">
            {/* Left Section */}
            <div className="left-nav">
                <img
                    className="menu-icon"
                    src={menu}
                    alt="menu"
                    onClick={() => setSmallSidebar(prev => !prev)}
                />
                <Link to="/" className="logo">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            {/* Middle Section */}
            <div className="mid-nav">
                <div className="search-box">
                    <input type="text" placeholder="Search" />
                    <img src={search} alt="search" />
                </div>
            </div>

            {/* Right Section */}
            <div className="right-nav">
                <img src={upload} alt="upload" />
                <img src={more} alt="more" />
                <img src={notification} alt="notification" />
                <img className="userPfp" src={userPfp} alt="user profile" />
            </div>
        </nav>
    );
}
