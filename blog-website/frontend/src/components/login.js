
import "./auth.css";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {app} from "../firebase/firestore"
import { useState } from "react";
import {useNavigate} from "react-router-dom";
export default function useLogin(){

const Navigate = useNavigate();

    const auth = getAuth(app);
const [data,changeData] = useState({
    email:"",
    password:"",
});

function handleSubmit(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth,data.email,data.password).then((user)=>{
        console.log('signed in');
Navigate('/');
        
    })
}
    return(
        <div className="login__container">
            <h1>Login</h1>
            <form className="input__form" onSubmit={handleSubmit}>
                <input placeholder="Enter Email"  onChange={(e)=>{changeData((prev)=>{return {...prev,email:e.target.value}})}}></input>
                <input placeholder="Enter Password" onChange={(e)=>{changeData((prev)=>{return {...prev,password:e.target.value}})}}></input>
                <button>Login</button>
            </form>
        </div>
    )
}