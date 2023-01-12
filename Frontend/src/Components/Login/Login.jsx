import React, { useReducer } from "react";
import {
  Input,
  Box,
  Image,
  Flex,
  Text
} from "@chakra-ui/react";
import axios, { all } from "axios"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import "../Login/Login.css"
import { getLogin } from "../../Redux/action";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from '@chakra-ui/react'
import { getLocalData } from "../../Utils/LocalStorage";
import { useToast } from '@chakra-ui/react'


const initialState = {
  name: "",
  email: "",
  pass: ""
}

const reducer = (state, action) => {
  switch (action.type) {
    case "name": return { ...state, name: action.payload };
    case "email": return { ...state, email: action.payload }
    case "num": return { ...state, num: action.payload }
    case "location": return { ...state, location: action.payload }
    case "role": return { ...state, role: action.payload }
    case "pass": return { ...state, pass: action.payload }
    case "confirmPass": return { ...state, confirmPass: action.payload }
    case "birth": return { ...state, birth: action.payload }
    default: return state
  }
}


const Login = () => {
  const dispatchtwo = useDispatch()
  const navigate = useNavigate()
  const [dummy, setDummy] = useState(false);
  const [dummy1, setDummy1] = useState(false);
  const toast = useToast()
  const { alldata, isLoading, isError } = useSelector((state) => {
    return {
      alldata: state.alldata,
      isLoading: state.isLoading,
      isError: state.isError
    }
  });
  const [state, dispatch] = useReducer(reducer, initialState)

  let { name, email, pass } = state;

  const handleChange = (e) => {
    let { name, value } = e.target;
    dispatch({ type: name, payload: value })
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    dispatchtwo(getLogin(state))
    // setDummy(true)
    // allTaost()
      // navigate("/")
    // }
  }

  const allTaost=()=>{
    if (alldata.success){
      toast({
        title: 'Login successfully',
        description: "Now explore our site",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else if (alldata.err){
      toast({
        title: alldata.err,
        description: "Please try again later",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
    }

  
  // console.log(isLoading)

  const nameLocal = getLocalData("name") || ""

  return (
    <Box>
      <Flex className="flexLogin">
        <Box className="boxLogin">
          <form className="formLogin" onSubmit={handleSubmit}>
            {
              nameLocal ? <Text mb={"20px"} fontSize={"18px"} color={"green"}>You are login, keep explore</Text> : null
            }
            <Text className="textLogin">Login form</Text>
            <label> User Name</label>
            <Input type="text" variant={"unstyled"} border={"0.5px solid #8d8d8d"} name="name" value={name} onChange={handleChange} required />
            <label> Email</label>
            <Input type="email" name="email" variant={"unstyled"} border={"0.5px solid #8d8d8d"} value={email} onChange={handleChange} required />
            <label>Password</label>
            <Input type="password" name="pass" variant={"unstyled"} border={"0.5px solid #8d8d8d"} value={pass} onChange={handleChange} required />
            {
              isLoading ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              /> : null
            }
            <Flex gap={"10px"} justifyContent={"center"}>
              <Box>Doesnot have an acount ?</Box>
              <Link to={"/signup"}><Box color={"red"} fontWeight={"bold"}>Sign up</Box></Link>
            </Flex>
            <input className="buttonLogin" type="submit" value="Submit" />
          </form>
        </Box>
        <Box>
          <Image className="imageLogin" src={"./Images/41620-woman-working-on-laptop-in-office.gif"} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Login