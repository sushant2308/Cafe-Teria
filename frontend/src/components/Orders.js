import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useAlert } from 'react-alert'
function Order({setsign}) {
    if(localStorage.getItem('token')) setsign(true);
    const [Data,setData] = useState([]);
    const alert = useAlert()
    let vari=0;
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          let token=localStorage.getItem('token')
          const res = await axios.get(`http://127.0.0.1:8000/api/me`,{
            headers: {
                'Authorization': `token ${token}`
              }
          });
         
          setData(res.data);
           
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
            <h3 className="menu-title">Here are your orders {Data.name}</h3>
            {
                Data.orders ?
                <div>
                  {Data.orders.map((item,i)=>(
                      <div className="menu-content">
                      <div className="row">
                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                              <div className="dish-img"><img src={item.food_item.image} alt=""  style={{borderRadius:"50%",width:"100px",height:"100px"}}/></div>
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                              <div className="dish-content">
                                  <h5 className="dish-title">{item.food_item.name}</h5>
                                  
                                  <div className="dish-price">
                                  <p>₹ {item.food_item.price}</p>
                                  <p style={{visibility:"hidden"}}>{vari+=item.food_item.price}</p>
                              </div>
                              </div>
                            </div>
                      </div>
                  </div>))
                  }
                  <h3>Your total bill is ₹ {vari}</h3>
                  <button className="btn btn-success" onClick={()=>alert.success("You will be redirected to payment gateway from here  when it will be added")}>Pay Now</button>
                </div>

                
                  
                :
                <div><h5>Oh no its so empty <Link to="/">Order Now</Link></h5></div>
            }

        </div>
      </div>
      

      
        
    );
}
export default Order;