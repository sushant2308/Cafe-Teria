import React,{Component} from 'react';
import axios from 'axios';

class Form extends Component {
    state = {
        name: '',
        price:'',
        image:null,
      };
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      };
      handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('name', this.state.name);
        form_data.append('price', this.state.price);
        form_data.append('image', this.state.image, this.state.image.name);
        let url = 'http://127.0.0.1:8000/api/addfood/';
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
          }
        })
            .then(res => {
              console.log(res);
            })
            .catch(err => console.log(err))
      };
    render() {
        return (
            <div className="container-fluid" style={{marginTop:"1rem"}}>
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image1"></div>
                <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">Add your Food Item!</h3>
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-label-group">
                            <input type="text" id="name" value={this.state.name} onChange={this.handleChange} className="form-control" placeholder="Enter your name" required/>
                            <label for="name">Enter the Name of food item</label>
                            </div>
                            <div className="form-label-group">
                            <input type="text" id="price" value={this.state.price} onChange={this.handleChange} className="form-control" placeholder="Enter your phone no" required />
                            <label for="price">Enter your Price of food item</label>
                            </div>
                            <div className="form-label-group">
                            <input type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
                            <label for="image">Upload Product's Image</label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Add</button>
        
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

}
export default Form;
