// for preventing unauthenticated users from accessing this route 
import {useSelector} from "react-redux"
import { Navigate} from "react-router-dom"

function OpenRoute({children}){
    const {token}= useSelector((state)=>state.auth)
    console.log("Current token:", token);

    if(!token){
        return children
    }
    else{
        return <Navigate to="/dashboard/my-profile"/>
    }
}

export default OpenRoute