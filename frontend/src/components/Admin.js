import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

///This will show all the orders placed and a link to adding products
function Admin({setsign}) {
    if(localStorage.getItem('token')) setsign(true);
    const [Data,setData] = useState([]);
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          let data=[]
          const res = await axios.get(`http://127.0.0.1:8000/api/order_list/`);
          for(const dataobj of res.data){
              data.push(dataobj);
            
          }
          setData(data);
           
        }
        catch(err){

        }
    }

    fetchData();
  
    },[]);
    console.log(Data);
    return (
      
      <div className="container" style={{marginTop:"2rem"}}>
        <div className="menu-block" >
            <h3 className="menu-title">Orders List  </h3>
            {
              Data.map((item,i)=>(
                <div className="menu-content">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <div className="dish-img"><img src={"http://127.0.0.1:8000"+item.food_item.image} alt=""  style={{borderRadius:"50%",width:"100px",height:"100px"}}/></div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                        <div className="dish-content">
                            <h5 className="dish-title">{item.food_item.name}</h5>
                            <p className="dish-title"> </p>
                            <div className="dish-price">
                            <p>₹ {item.food_item.price}</p>
                        </div>
                        </div>
                      </div>
                </div>
            </div>
              ))
            }
            <Link to="/addproduct">Add more food items</Link>
        </div>
      </div>
      

      
        
    );
}
export default Admin;