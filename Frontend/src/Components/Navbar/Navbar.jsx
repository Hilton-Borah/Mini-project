import { Box } from "@chakra-ui/react";
import { all } from "axios";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import {AiOutlineCaretDown} from "react-icons/ai"
import { useState } from "react";
import { getLocalData, saveLocalData } from "../../Utils/LocalStorage";

const links = [
  { path: "/", title: "Home Page" },
  { path: "/about", title: "About Page" },
  { path: "/login", title: "Login Page" },
  { path: "/signup", title: "Signup Page" },
];

const Navbar = () => {
  const navigate = useNavigate()
  const { alldata, isLoading, isError } = useSelector((state) => {
    return {
      alldata: state.alldata,
      isLoading: state.isLoading,
      isError: state.isError
    }
  });
  const [name,setName]=useState(false);


  useEffect(() => {
    setTimeout(() => {
      const varibale =alldata.userdata.name
      setName(true)
      saveLocalData("name",varibale)
    }, 100)
  }, [alldata])

  const nameLocal = getLocalData("name") || ""

  const handleLogout=()=>{
    localStorage.removeItem("name")
    setName(false)
    navigate("/")
  }


  return (
    <div className="navbar">
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/about">
        About
      </NavLink>
        <Menu>
          <MenuButton as={Button}  rightIcon={<AiOutlineCaretDown />}>
            {
              nameLocal?nameLocal:"My Account"
            } 
          </MenuButton>
          <MenuList>
            <MenuItem display={"flex"} justifyContent={"center"} >Profile</MenuItem>
            <NavLink to={"/login"}><MenuItem display={"flex"} justifyContent={"center"} >Login</MenuItem></NavLink>
            <NavLink to={"/signup"}><MenuItem display={"flex"} justifyContent={"center"} >Signup</MenuItem></NavLink>
            <MenuItem onClick={handleLogout} display={"flex"} justifyContent={"center"} >Logout</MenuItem>
          </MenuList>
        </Menu>
    </div>
  );
};

export default Navbar;
