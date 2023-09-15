'use client'
import { useEffect, useState } from "react";
import Common from "../../../components/common";
export default function page(){

const [name,setName] = useState(null);
const [editing,setEditing] = useState(null);
const [parentCategory , setParentCategory] = useState('');
const [categories,setCategories] = useState(null);
const [render,changeRender] = useState(false);
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
            console.log('some error receving the data',resError);
        }
    }

    getCategories();
    
},[render])

async function handleSave(e){
e.preventDefault();
console.log(name);

const data = await fetch('http://localhost:3000/api/categories',{
    method : 'POST',
    headers : {'Content-Type': 'application/json'},
    body : JSON.stringify({name : name , parentCategory , properties})
})

if(data.ok){
    const resJson = await data.json();
    console.log('the response back is : ',resJson);
    alert('saved the category');
    setName('');
    setParentCategory('');
    setProperties([]);
}else{
    const resError = await data.json();
    console.log('the error from the api received is',resError);
}

changeRender((prev)=>{
    return !prev;
})
}

async function handleEdit(cat){
    setName(cat.name);
    console.log('the parent cat id : ',cat.parent?._id)
    setParentCategory(cat.parent?._id || '');
    setEditing(cat);
    setProperties(()=>{
        return cat?.properties.map((p)=>{
            return {name : p.name , value : typeof(p.value) === Object ? p.value?.join(',') : p.value }
        }) || [];
    })
    

}

async function handleEditSubmit(e){
    e.preventDefault();
    const data = await fetch('http://localhost:3000/api/categories',{
        method : 'PUT',
        body : JSON.stringify({_id : editing._id , name , parentCategory, properties : properties.map((p)=>{
            return {
                name : p.name,
                value : p.value?.split(',') || p.value
            }
        })}),
        headers : {'Content-Type':'application/json'}
    });

    if(data.ok){
        const dataRes = await data.json();
        console.log('the category is edited ',dataRes);
        setEditing(null);
    }else{
        console.log('some error while editing the category');
    }
    changeRender((prev)=>{
        return !prev;
    });
    setName(()=>'');
    setParentCategory(()=>'');
    setProperties(()=>[]);
}

async function handleDelete(cat){
    console.log('inside the delete function',cat._id);
    const response = await fetch('http://localhost:3000/api/categories/delete',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({_id : cat._id})
    });

    if(response.ok){
        const json = await response.json()
        console.log('deleted the category',json);
        changeRender((prev)=>{return !prev});
    }else{
        const jsonError = await response.json();
        console.log('there was some error deleting  the category',jsonError);

    }
}
const [properties,setProperties] = useState([]);
async function createProperty(){
setProperties((prev)=>{
    return [ ...prev , {name : '' , value : ''}]
})
}

function handlePropertyNameChange(e,idx){
    const newValue = e.target.value;
    setProperties((prev)=>{
        const prevProperties = [...prev];
        prevProperties[idx].name = newValue;
        return prevProperties;
    })
}
function handlePropertyValueChange(e,idx){
    const newValue = e.target.value;
    setProperties((prev)=>{
        const prevProperties = [...prev];
        prevProperties[idx].value = newValue;
        return prevProperties;
    })
}
console.log(properties);

function handleRemoveProperty(index){
    setProperties((prev)=>{
        const prevProperty = [...prev];
        const newProperty = prevProperty.filter((property,idx)=>{
            if(idx!==index){
                return property;
            }
        });
        if(newProperty==null){
            return [];
        }return newProperty;
    })
}

return (
<Common>
    
    <form className="flex flex-col w-[35%] gap-y-4" >
    <h1 className="ml-3 font-bold text-blue-900 text-xl">Categories</h1>
        <label htmlFor="categories_name">{editing ? `Edit ${name} Category` : 'Create A New Category'}</label>
        <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-2">
        <input onChange={(e)=>{
            setName(e.target.value)
        }} value={name} name="categories_name" placeholder="enter the categories"></input>
        <select  value={parentCategory} onChange={(e)=>{
            setParentCategory(e.target.value); 
        }}>
            <option value={''} >Parent Category</option>
            {categories && categories.map((cat)=>{
                return <option value={cat._id}>{cat.name}</option>
            })}
        </select>
        </div>

        <div className="flex flex-col gap-y-4">
        <label>Properties</label>
        <button type="button" onClick={createProperty}>Add New Property</button>
        {properties && properties.map((prop,idx)=>{
            return <>
            <div className="flex gap-x-2  ">
            <input placeholder="Enter the name (ex-> color)" value={prop.name} onChange={(e)=>{handlePropertyNameChange(e,idx)}} ></input>
            <input placeholder="Enter the value (ex-> color value )" value={prop.value} onChange={(e)=>{handlePropertyValueChange(e,idx)}}></input>
            <button onClick={()=>{handleRemoveProperty(idx)}} type="button">Remove</button>
            </div>
            </>
        })}
        </div>
        {editing ? <div className="flex gap-x-2"> <button type="button" onClick={(e)=>{
            e.preventDefault();
            setEditing(()=>false);
            setProperties(()=>[]);
            setName(()=>'');
            setParentCategory(()=>'');
        }}>Cancel</button>  <button type="button" onClick={(e)=>{handleEditSubmit(e)}}>Edit</button> </div>  : <button type="click" onClick={(e)=>{handleSave(e)}}>Save</button>}
        </div> 
    </form>
    <table className="basic mt-6 w-full ">
        <thead>
            <tr><td>Categories</td> <td>Parent Category</td> <td>Operations</td> </tr>
            
        </thead>
        {categories && categories.map((cat)=>{
            return <tr><td>{cat.name}</td> <td>{cat?.parent?.name}</td> <td><button onClick={()=>{
                handleEdit(cat);
            }}>Edit</button> <button onClick={()=>{
                handleDelete(cat)
            }}>Delete</button></td>  </tr>
        })}

    </table>
</Common>
)

}