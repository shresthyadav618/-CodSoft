import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firestore";
import "./auth.css";
export default function useRegister(){
const Navigate = useNavigate();
const BASE_URL = 'https://blog-website-bu2i.onrender.com';
const [data,changeData] = useState({
    email:"",
    username:"",
    password:"",
});
const [error,setError] = useState(null);
console.log(app);
    const auth =  getAuth(app);

    async function handleSubmit(e){
e.preventDefault();
        if(data.email==="" || data.password==="" || data.username===""){
            setError(()=>{
                return 'Please enter all the fields';
            })
            return;
        }

        createUserWithEmailAndPassword(auth,data.email,data.password).then((userc)=>{
            console.log('user created');

            console.log(data);
 fetch(`${BASE_URL}/user`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data),
    
});

updateProfile(auth.currentUser, {
    displayName: data.username,
  }).then((user) => {
    console.log(user);
  }).catch((error) => {
    // An error occurred
    // ...
  });
Navigate('/');
        })
        .catch((err)=>{
            console.log('oops there was some error', err);
        })


    
    }

    return (
        <div className="login__container">
        <h1>Register</h1>
        <form className="input__form" onSubmit={handleSubmit}>
            <input placeholder="Enter Email"  onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,email: e.target.value}
                })
            }}></input>
            <input placeholder="Enter Username" onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,username: e.target.value}
                })
            }}></input>
            <input placeholder="Enter Password" onChange={(e)=>{
                changeData((prev)=>{
                    return {...prev,password: e.target.value}
                })
            }}></input>
            <button>Register</button>
            {error && <div className="input__error">{error}</div>}
        </form>
    </div>
    )
}