import  { useEffect, useState } from 'react'
import "./Add.css"
import axios from 'axios'
import { assets } from '../../assets/assets'
function Add() {
    const url = "http://localhost:4000";
    const [image,setImage]=useState(false);
    const[data,setData]=useState({name:"",
        description:"",
        price:"",
        category:"Salad",

    });
    const onChangeHandler =(event)=>{
const name = event.target.name;
const value = event.target.value;
setData(data=>({...data,[name]:value}))
    }
    useEffect(()=>{
console.log(data);
    },[data])
    const onSubmitHandler = async(event)=>{
event.preventDefault();
const formdata = new FormData();
formdata.append("name",data.name)
formdata.append("description",data.description)
formdata.append("price",Number(data.price))
formdata.append("category",data.category)
formdata.append("image",image)
const response = await axios.post(`${url}/api/food/add`,formdata);
if(response.data.success){
    setData({name:"",
        description:"",
        price:"",
        category:"Salad",})
}

    }
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload">
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>
                
                </label>
                <input onChange={(e)=>setImage(e.target.files[0]) } type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here'/>
            </div>
            <div className="add-product-description">
                <p>product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="write here"/>

            </div>
            <div className='add-category-price'>
                <div className="add-category flex-col">
                    <p>product caregory</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure veg">Pure veg</option>
                        <option value="pasta">Pasts</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>PRoduct price</p>
                    <input onChange={onChangeHandler} value ={data.price} type="Number" name="price" placeholder='$20'/>
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add