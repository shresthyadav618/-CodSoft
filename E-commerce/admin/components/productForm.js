"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { PuffLoader } from "react-spinners";
import Common from "../components/common";

export default function ProductForm({name,desc,price,check,_id,images,parentCategory,properties}){
    console.log(name,desc,price,check,_id)
    const Router = useRouter();
    const [categories , setCategories] = useState(null);

    useEffect(()=>{
        async function getCategories(){
            const data  = await fetch('http://localhost:3000/api/categories',{
            method : 'GET'
        });

        if(data.ok){
            console.log('recevied the ok data');
            const resJson = await data.json();
            console.log('the json recevived is  : ',resJson);
            setCategories(()=>{
                return resJson.categories;
            });
        }else{
            const resError = await data.json();
            console.log('some error receiving the data',resError);
        }
        }
        getCategories();
    },[])
    const [Properties,setProperties] = useState(properties || []);
    console.log('INITIAL PROPERTIES ARE : ',properties)
    const [data,changeData] = useState({
    name : name || "",
    desc : desc || "",
    price: price || "",
    images :  images || []
    }) ;

    useEffect(()=>{
        const filteredImages = data.images.filter((elm)=>{if(elm){return elm}});
        changeData((prev)=>{return {...prev, images : filteredImages}});
    },[])

    const [ParentCategory , setParentCategory] = useState(parentCategory?._id);
console.log(data);
const [loading,setLoading] = useState(false);
async function handleSubmit(e){
    e.preventDefault();
    console.log(data);

    if(check){
        const response = await fetch('http://localhost:3000/api/products/edit',{
            headers : {'Content-Type' : 'application/json'},
            method : 'PUT',
            body : JSON.stringify({...data,_id,ParentCategory,Properties})
        });

        if(response.ok){
            const responseBody = await response.json();
            console.log('edited the product',responseBody);
            Router.push('/products');
            alert('edited your product');
        }else{
            const responseError = await response.json();
            console.log('unable to edit the product',responseError);
        }
    }else{
        const response = await fetch('http://localhost:3000/api/products/add',{
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({...data , ParentCategory,Properties}),
        method : 'POST'
    });
   
    if(response.ok){
        const responseData = await response.json();
        console.log('the response came back',responseData);
        changeData(()=>{return {
            name : "",
            desc : "",
            price: ""
        }})
        alert('New Product Added successfully');
        Router.push('/products');
    }else{
        const responseError = await response.json();
        console.log('there was some error getting back the response',responseError);
    }
    }
}

let propertyToFill = [];
if(ParentCategory && categories){
    
    const parentCat = categories.filter((element)=>  element._id === ParentCategory);
    console.log('found the parent category',parentCat[0]);
    // propertyToFill.push(...parentCat[0].properties);
    // console.log(propertyToFill);
    let catInfo = parentCat;
    while(catInfo && catInfo?.length > 0 && catInfo[0].properties){
        console.log('THE PROPERTIES VALUE INSIDE CATINFO IS : ',...catInfo[0].properties)
        propertyToFill.push(...catInfo[0]?.properties);
        console.log('the category info is : ',catInfo[0]);
        // console.log('the value is : ',...catInfo.properties);
        console.log(propertyToFill);
        catInfo = categories.filter((element)=>element._id === catInfo[0]?.parent?._id )
    }    
}
console.log('THE FINAL PROPERTY ARRAY IS : ',propertyToFill);
console.log('THE TYPE OF ELM.VALUE IS : ', typeof(propertyToFill[0]?.value));
async function uploadImages(e){
setLoading(true);
console.log(e);
const files = e.target?.files;
console.log(files);
if(files?.length>0){
 const dataForm = new FormData();
 for(const file of files){
    dataForm.append('file',file);
 }
 const response = await fetch('http://localhost:3000/api/upload',{
    method : 'POST',
    body : dataForm
 });
 console.log('the response is : ',response);
 const bodyResponse = await response.json();
 console.log('the json response is : ',bodyResponse);
 console.log(data.images);
 const newImages = data.images? data.images: [];
 newImages.push(bodyResponse[0]);
 console.log('the new images are : ',newImages);
 
 changeData((prev)=>{
    
    
    return {
        ...prev , images : newImages
    }
 })
 console.log(bodyResponse);
 console.log('the updated data is : ',data);

}else{
    console.log('No file found')
}
setLoading(false);
}
function updateImagesOrder(){
    console.log(arguments[0]);
    changeData((prev)=>{
        return {...prev, images : arguments[0]}
    })
}
console.log(Properties);
async function handlePropertyChange(e , pname){
    
    console.log(pname,e.target.value);
    
    console.log('INSIDE HANDLING THE PROPERTY CHANGE');
    await setProperties((prev)=>{
        return {...prev , [pname] : e.target.value}
    });
    console.log('PROPERTIES CHANGED',Properties);
}

console.log('THE VALUE OF DATA.IMAGES' , data.images)
return (<Common>
   <form className="flex flex-col w-[60%] gap-y-4">
   {check ?  <div className="p-[10px]">Edit Product</div>: <div className="p-[10px]">New Product</div>}
    <label  htmlFor="name">Product Name</label>
   <input value={data.name} onChange={(e)=>{changeData((prev)=>{return {...prev,name : e.target.value}})}} placeholder="Product Name" name="name"></input>
   
   <label>Category</label>
   <select onChange={(e)=>{
    console.log('TRYING TO CHANGE PARENT CATEGORY',e.target.value);
    setProperties([]);
    setParentCategory(()=>{return e.target.value})
   }} value={ParentCategory}><option value={''}>Uncategorized</option> {categories && categories.map((cat)=>{
    return <option value={cat._id}>{cat.name}</option>
   })} </select>
   {propertyToFill  && propertyToFill.map((elm)=>{
    console.log(elm);
    console.log(typeof(elm.value))
        return <div className="flex gap-x-2  flex-col"> <label>{elm.name}</label> <select onChange={(e)=>{handlePropertyChange(e , elm.name)}} value={Properties[elm.name]} > <option>Please select</option> {elm && Array.isArray(elm.value) ? elm.value.map((v)=>{
            console.log(v);
            return <option value={v}>{v}</option>
        }) : <option value={elm.value}>{elm.value}</option> }  </select>  </div> 
   })}
   <label htmlFor="photos">Photos</label>
   <label className="ml-2 btn font-normal cursor-pointer flex flex-col items-center justify-center gap-y-2" > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
Upload
<input onChange={(e)=>{uploadImages(e)}} type="file" className="hidden"></input>
</label>

   <div className="relative">
    {loading && <div className="p-2">
   <PuffLoader color="#36d7b7"  />
   </div>}
   <div className="uploaded__images">
   <ReactSortable list={data.images} setList={updateImagesOrder}>
    {data?.images?.length>0 && data?.images?.map((imageContent)=>{
        if(imageContent)
        return  <img src={imageContent} width={'60px'} height={'60px'}></img> 
      })      }
    </ReactSortable>
    </div>
   </div>
   
   
   <label htmlFor="desc">Description</label>
   <textarea value={data.desc} rows={'40'} onChange={(e)=>{changeData((prev)=>{return {...prev,desc : e.target.value}})}} placeholder="Description" name="desc" ></textarea>
   <label htmlFor="price">Price (in RS)</label>
   <input value={data.price} onChange={(e)=>{changeData((prev)=>{return {...prev,price : e.target.value}})}} placeholder="Price" name="price"></input>
   
   {check ? <button onClick={(e)=>{handleSubmit(e)}}>Edit This Product</button> : <button onClick={(e)=>{handleSubmit(e)}}>Save</button>}
  
   </form>
</Common>)
}