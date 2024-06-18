import React from "react";
import LogoutBtn from "./LogoutBtn";
import { Link, useNavigate } from "react-router-dom";
import Container from "../container/Container";

import { useSelector } from "react-redux";
import CustomerLentData from "./CustomerLentDataNav";
function Header() {

    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const roleId = userData ? userData.RoleId : null;

    const navigate = useNavigate();

    const navItems = [
        {
          name: "Home",
          slug: "/",
          active: true,
        },
        {
          name: "Login",
          slug: "/login",
           active: !authStatus,
        },
        {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
        },
        
   
       
      
      ];
      if (authStatus && roleId === 1) {
        navItems.push({
          name: "lentData",
          slug: "/lentDetails",
          active: true,
        });
      }
      if (authStatus && roleId === 2) {
        navItems.push({
          name: "lent",
          slug: "/lentTakenCustomers",
          active: true,
        });
      
      }
  return (
    <header className="py-3 sticky shadow bg-gray-500">
      <Container>
        <nav className="flex">
          {/* <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div> */}
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock  m-1 px-6 py-2 duration-200 bg-blue-500 font-bold hover:bg-blue-500 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="inline-bock duration-200 m-1 text-black bg-red-500 font-bold hover:bg-red-600 rounded-full">
                <LogoutBtn />
              </li>
            )}
           
            
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header