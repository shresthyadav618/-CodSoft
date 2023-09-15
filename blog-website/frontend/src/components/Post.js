
import { getAuth } from "firebase/auth";
import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firestore";
import Header from "./Header";
import "./post.css";
export default function usePost(){
    const BASE_URL = 'https://blog-website-bu2i.onrender.com';
    const Navigate = useNavigate();
   const auth = getAuth(app);
//    console.log(auth.currentUser.displayName)
const [data,changeData] = useState({
    title:"",
    summary:"",
    file:[],
    content:"",
})
console.log(auth.currentUser);
function handleSubmit(e){
    e.preventDefault();
    
    console.log('this was submitted', data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('content', data.content);
    formData.append('file', data.file);
    
    let x ='';
    let y='';

    if(auth.currentUser.uid){
        y=auth.currentUser.uid;
        }
    if(auth.currentUser.displayName===undefined){
         x = 'Manu Shresth';
    }else{
        x=auth.currentUser.displayName;
    }
    formData.append('author',x);
    formData.append('uid',y);
    const reader = new FileReader();
    reader.readAsDataURL(data.file);
    reader.onloadend = function() {
      const base64String = reader.result.split(',')[1];
    formData.append('buffer',base64String);
  
      fetch(BASE_URL + '/new-post',{
        method:'POST',
        body: formData,
    }).then((res)=>{
        console.log(res);
        Navigate('/');
        
    }).catch((err)=>{
        console.log('there was some error',err);
    })
        
    

    }





}

    return (
        <>
        <Header/>
        
        <div className="post__container">
<form className="post__form" onSubmit={handleSubmit}>
    <input className="post__title" placeholder="Title"  onChange={(e)=>{
        changeData((prev)=>{
            return {...prev,title:e.target.value}
        })
    }}></input>
    <input className="post__summary" placeholder="Summary" onChange={(e)=>{
        changeData((prev)=>{
            return {...prev,summary:e.target.value}
        })
    }}></input>
    <input type="file" className="ip" name="file" onChange={(e)=>{
        changeData((prev)=>{
            return {...prev,file:e.target.files[0]}
        })
    }}></input>
    {/* <textarea className="post__textarea"></textarea> */}
    <ReactQuill onChange={newValue => changeData((prev)=>{return {...prev,content:newValue}})}/>
    <button className="post__btn" >Create Post</button>
</form>
        </div>
        </>
    )

}