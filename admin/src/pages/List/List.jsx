import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from'axios'
import { Toast } from 'bootstrap';
function List() {
  const url="http://localhost:4000";
  const [list,setlist]=useState([]);

  const fetchList=async()=>{
const response = await axios.get(`${url}/api/food/list`);
console.log(response.data);
if(response.data.success){
  setlist(response.data.data);
}
else{
  Toast.error("Error")
}
  }
  const removeFood= async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      Toast.success(response.data.message)
    }
    else{
      Toast.error("Error")
    }
   }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>NAme</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick ={()=>removeFood(item._id)}className="cursor">x</p>
             
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List