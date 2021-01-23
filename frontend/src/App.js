import './App.css';
import {Route,Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import All from './components/All';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Form from './components/Form';
import Order from './components/Orders';
import Error from './components/Error';
import React,{useState} from 'react';
function App() {
  const [Signed,SetSigned] = useState(false)
    return (
      <div>
        <main> 
          <Navbar sign={Signed} setsign={SetSigned}/>
          <Switch>
                  <Route path='/' component={()=><All setsign={SetSigned} />}exact/>
                  {Signed?
                    <div>
                      
                      <Route path='/order/' component={()=><Order setsign={SetSigned} />}exact/>
                      <Route path='/signup/' component={()=><Error setsign={SetSigned} />} exact/>
                      <Route path='/login/' component={()=><Error setsign={SetSigned} />}exact/>
                      <Route path='/admin/' component={()=><Admin setsign={SetSigned} />} exact/>
                      <Route path='/addproduct/' component={Form} exact/>
                    </div>

                    :
                    <div>
                      <Route path='/login/' component={()=><Login setsign={SetSigned} />}exact/>
                      <Route path='/order/' component={()=><Error setsign={SetSigned} />}exact/>
                      <Route path='/signup/' component={()=><Register setsign={SetSigned} />} exact/>
                      <Route path='/admin/' component={()=><Admin setsign={SetSigned} />} exact/>
                      <Route path='/addproduct/' component={Form} exact/>
                    </div>

                  }

            </Switch>
        </main>
      </div>
    );


}

export default App;
