import React from 'react';
import {Link} from 'react-router-dom';
function Navbar({sign,setsign}) {
  function logout(){
      localStorage.removeItem('token');
      setsign(false);
  }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand text-brand" to="/">CAFE-<span style={{color:"#5146AF"}}>TERIA</span></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
              {sign ?
                    <li className="nav-item">
                      <Link className="nav-link" to="/order/">Orders</Link>
                    </li>
                    :
                    <li className="nav-item">
                    <Link className="nav-link" to="/signup/">Sign-up</Link>
                    </li>
              }
              {sign ?
                    <li className="nav-item">
                    <Link className="nav-link" onClick={logout}>Logout</Link>
                    </li>
                    :
                    <li className="nav-item">
                    <Link className="nav-link" to="/login/">Login</Link>
                    </li>
              }
          </ul>
        </div>
      </nav>

        
        
    );
}
export default Navbar;
