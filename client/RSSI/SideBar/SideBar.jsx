import React from 'react'
import SideBarItem from "./SideBarItem.jsx"

function SideBar() {

  const sidebaritems =[];
  return (
    <div>SideBar

      {sidebaritems.map((sidebaritem) =>{
        return <SideBarItem sidebaritem={sidebaritem}/>
      })}
    </div>
  )
}

export default SideBar