import React from 'react';
///404 page
function Error({setsign}) {
    if(localStorage.getItem('token')) setsign(true);
    return (
      
      <div className="container" style={{marginTop:"2rem"}}>
          <h2>Ooops! 404 page not found</h2>
      </div>
      

      
        
    );
}
export default Error;