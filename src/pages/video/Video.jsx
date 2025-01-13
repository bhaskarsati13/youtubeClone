import React, { useState } from 'react';
import './video.css';
import Sidebar from '../../components/sidebar/Sidebar';
import PlayVideo from '../../components/playVideo/PlayVideo';
import NavBar from '../../components/navbar/Navbar';
import Recommended from '../../components/recommended/Recommended';
import { useParams } from 'react-router-dom';

export default function Video() {
  const [smallSidebar, setSmallSidebar] = useState(true);
  const {videoId,categoryId}=useParams()

  return (
    <>
      <NavBar />
      <div className="play-container">
        <PlayVideo videoId={videoId} categoryId={categoryId} />
        <Recommended categoryId={categoryId} />
      </div>
    </>
  );
}

