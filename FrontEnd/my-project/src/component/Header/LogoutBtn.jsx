import React, { useState,useEffect } from "react";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toaster from "../toaster/Toaster";
function LogoutBtn() {
  const nav=useNavigate()
  const dispatch = useDispatch();
  const [error,setError]=useState("")
  const [showToast, setShowToast] = useState(false); // State to control toaster visibility
  const handleClose=()=>{
    setShowToast(false)
  }
  
  

  

  const logoutHandler = () => {
console.log("inside logout");
setShowToast(true); 
  setTimeout(()=>{
    nav("/")
    dispatch(logout());
  },1000)


    setTimeout(()=>{
      setShowToast(false); 
    


 },5000)
  
    
  };
  return (<>

    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
    {showToast && <Toaster text="Logout Successfully" 
className='bg-red-500 text-white' 
onClick={handleClose}/>}    </>

    
  );
}

export default LogoutBtn;