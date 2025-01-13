import React, { useState } from 'react'
import '../../../app.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import NavBar from '../../components/navbar/Navbar'
export default function Home() {
  const [smallSidebar , setSmallSidebar]=useState(true)
  const [category , setCategory]=useState(0);
  return (
   <>
    <NavBar setSmallSidebar={setSmallSidebar}/>
    <Sidebar smallSidebar={smallSidebar} category={category} setCategory={setCategory} />
      <div className={`container ${smallSidebar ? "":"large-container"}`}>
         </div>
          <Feed smallSidebar={smallSidebar} category={category} />
   
   </>
  )
}
