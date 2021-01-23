import React,{useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './sigin.css';
function Login({setsign}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [redirect, setredirect] = useState(null)
    if(localStorage.getItem('token')) setsign(true);
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        let form_data = new FormData();
        form_data.append('email', email);
        form_data.append('password', password);
        let url = 'http://127.0.0.1:8000/api/token/';
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
            .then(res => {
              localStorage.setItem('token',res.data.token);
              setredirect("/");
            })
            .catch(err =>alert("Wrong email or password"))
      };

        if (redirect) {
            return <Redirect to={redirect} />
          }
        return (
            <div className="container-fluid" style={{marginTop:"1rem"}}>
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">Login !</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-label-group">
                            <input type="email" id="email" value={email} onChange={(e)=>setemail(e.target.value)} className="form-control" placeholder="Email address" required />
                            <label for="email">Email address</label>
                            </div>
        
                            <div className="form-label-group">
                            <input type="password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" placeholder="Password" required/>
                            <label for="password">Password</label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Login</button>
        
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
            
        );

}
export default Login;
