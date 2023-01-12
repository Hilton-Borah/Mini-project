import React, { useReducer } from "react";
import {
    Input,
    Box,
    Image,
    Flex,
    Text
} from "@chakra-ui/react";
import axios from "axios";
import "../Signup/Signup.css"
import { useDispatch, useSelector } from "react-redux"
import { getRegistration } from "../../Redux/action";
import { Spinner } from '@chakra-ui/react'
import { getLocalData } from "../../Utils/LocalStorage";
import { Link } from "react-router-dom";

const initialState = {
    name: "",
    email: "",
    num: "",
    location: "",
    role: "",
    pass: "",
    confirmPass: "",
    birth: ""
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


const Signup = () => {
    const dispatchtwo = useDispatch()
    const { massage, isLoading, isError } = useSelector((state) => {
        return {
            massage: state.massage,
            isLoading: state.isLoading,
            isError: state.isError
        }
    });
    // const isLoading = useSelector(state=>state.isLoading) ;
    // const isError = useSelector(state=>state.isError) ;
    const [state, dispatch] = useReducer(reducer, initialState)

    let { name, email, num, location, role, pass, confirmPass, birth } = state;

    const handleChange = (e) => {
        let { name, value } = e.target;
        dispatch({ type: name, payload: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatchtwo(getRegistration(state))
    }

    console.log(isLoading)


    return (
        <div>

            <Flex className="flexSignup">

                <Box>
                    <Image className="imageSignup" src={"./Images/41621-man-working-on-laptop-in-office.gif"} />
                </Box>
                <Box className="boxSignup">

                    <form className="formSignup" onSubmit={handleSubmit}>
                        <Text className="textSignup">Signup form</Text>
                        <label className="labelSignup">Email address</label>
                        <Input type="email" name="email" value={email} variant={"unstyled"} border={"0.5px solid #8d8d8d"} onChange={handleChange} required />
                        <label> User Name</label>
                        <Input type="text" name="name" value={name} variant={"unstyled"} border={"0.5px solid #8d8d8d"} onChange={handleChange} required />

                        <label>Phone Number</label>
                        <Input type="number" name="num" value={num} variant={"unstyled"} border={"0.5px solid #8d8d8d"} onChange={handleChange} required />
                        <label>Date Of Birth</label>
                        <Input type="text" name="birth" value={birth} variant={"unstyled"} border={"0.5px solid #8d8d8d"} onChange={handleChange} required />
                        <select name="role" className="selectSignup" value={role} variant={"unstyled"} border={"0.5px solid #8d8d8d"} required onChange={handleChange}>
                            <option value="">Please Select the Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select><br />
                        <label>Location</label>
                        <Input type="text" name="location" variant={"unstyled"} border={"0.5px solid #8d8d8d"} value={location} onChange={handleChange} required />
                        <label>Password</label>
                        <Input type="password" name="pass" variant={"unstyled"} border={"0.5px solid #8d8d8d"} value={pass} onChange={handleChange} required />
                        <label>Confirm Password</label>
                        <Input type="password" name="confirmPass" variant={"unstyled"} border={"0.5px solid #8d8d8d"} value={confirmPass} onChange={handleChange} required />
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
                            <Box>Already have an acount ?</Box>
                            <Link to={"/login"}><Box color={"green"} fontWeight={"bold"}>Login</Box></Link>
                        </Flex>
                        <input className="buttonSignup" type="submit" value="Submit" />
                    </form>
                </Box>
            </Flex>
        </div>
    );
};

export default Signup;
