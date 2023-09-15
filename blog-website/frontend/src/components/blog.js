
import { Link } from "react-router-dom";
import "../App.css";
export default function blog(props){
  const BASE_URL = 'https://blog-website-bu2i.onrender.com';


return(
    <>
    {/* <Loader/> */}
    <Link to={'/blogs/'+props.id} className="trash">
    <div className='blog__content'>
  <div className='blog__image'>
  <img src={`${BASE_URL}/`+props.img}></img>
  </div>
 <div className='blog__text'>
 <h1>{props.title} </h1>
 <span className='blog__info'> <a className='author'>{props.author}</a> <span>{props.time}</span> </span>
  <span dangerouslySetInnerHTML={{__html: props.summary}} >

  </span>

 </div>


</div>
</Link>
</>
)

}