import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert'

///All the food items will be retrieved and shown here
function All({setsign}) {
    if(localStorage.getItem('token')) setsign(true);
    const alert = useAlert()
    const [Data,setData] = useState([]);
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          let data=[]
          const res = await axios.get(`http://127.0.0.1:8000/api/food_list/`);
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
    //Order created if user is logged in else error message
    const purchase=(id)=>{
      if(localStorage.getItem('token')){
        let token=localStorage.getItem('token')
        let url = `http://127.0.0.1:8000/api/purchase/${id}/`;
        console.log(token);
        axios.get(url, {
          headers: {
            'Authorization': `token ${token}`
          }
        })
            .then(res => {
              console.log(res);
              alert.success("Added! See your order at Order section");
            })
            .catch(err => console.log(err))
      }
      else alert.error("Please Login First!")


    }
    console.log(Data);
    return (
      <div className="container" style={{marginTop:"2rem"}}>
        <div className="menu-block">
            <h3 className="menu-title">Get your Tummy a Treat!</h3>
            {
              Data.map((item,i)=>(
                <div className="menu-content">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <div className="dish-img"><img src={"http://127.0.0.1:8000"+item.image} alt=""  style={{borderRadius:"50%",width:"100px",height:"100px"}}/></div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                        <div className="dish-content">
                            <h5 className="dish-title">{item.name}</h5>
                            <button className="btn btn-success" onClick={()=>purchase(item.id)}>Add to Order</button>
                            <div className="dish-price">
                            <p>₹ {item.price}</p>
                        </div>
                        </div>
                      </div>
                </div>
            </div>
              ))
            }

        </div>
      </div>

      
        
    );
}
export default All;
