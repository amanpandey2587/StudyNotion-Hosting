import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch} from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import {resetCourseState} from "../../slices/courseSlice"
const SidebarLink = ({link,iconName}) => {
    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();

    const matchRoute=((route)=>{
        return matchPath({path:route},location.pathname);
    })
  return (
    <NavLink
    to={link.path}
    onClick={() => dispatch(resetCourseState())}
    className={'relative px-0 py-2 ${matchRoute(link.path) ? "bg-cyan-800":" bg-opacity-0"}  text-richblack-5'}
    >
    <span className={`
    absolute -left-4 top-0 h-full w-[0.2rem] bg-cyan-50
    ${matchRoute(link.path) ? "opacity-100":"opacity-0"}`}
    >

    </span>

    <div className="flex items-center gap-x-2 ">
        <Icon className="text-lg"/>
        <span>{link.name}</span>
    </div>

    </NavLink>
  )
}

export default SidebarLink