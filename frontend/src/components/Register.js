import React,{ useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button,Modal,Container,Row,Col } from 'react-bootstrap';
import { useAlert } from 'react-alert'

function Register({setsign}){
  if(localStorage.getItem('token')) setsign(true);
  const alert = useAlert()
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [phone_no,setphone_no]=useState('')
  const [employee_id,setemployee_id]=useState('')
  const [organisation_name,setorganisation_name]=useState('')
  const [id_image,setid_image]=useState({ preview: "", raw: "" })
  const [redirect,setredirect]=useState(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = e => {
    if (e.target.files.length) {
      setid_image({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };
  const submit =()=>{
    let form_data = new FormData();
    form_data.append('name', name);
    form_data.append('email', email);
    form_data.append('password', password);
    form_data.append('phone_no', phone_no);
    form_data.append('organisation_name', organisation_name);
    form_data.append('employee_id', employee_id);
    form_data.append('id_image', id_image.raw);
    let url = 'http://127.0.0.1:8000/api/create/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res)
          alert.success("Registration Id " + res.data.id)
          setredirect("/login")
          setShow(false)
        })
        .catch(err => {
          alert.error("Already Registered")
          console.log(err);
        })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleShow();

  };
    
      if (redirect) {
        return <Redirect to={redirect} />
      }
        return (
            <div className="container-fluid" style={{marginTop:"1rem"}}>
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image2"></div>
                <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">Register</h3>
                        <form onSubmit={handleSubmit}>
                        <div className="form-label-group">
                            <input type="text" id="name" value={name} onChange={(e)=>setname(e.target.value)} className="form-control" placeholder="Enter your name" required/>
                            <label for="name">Name</label>
                            </div>
                            <div className="form-label-group">
                            <input type="email" id="email" value={email} onChange={(e)=>setemail(e.target.value)} className="form-control" placeholder="Email address" required />
                            <label for="email">Email address</label>
                            </div>
        
                            <div className="form-label-group">
                            <input type="password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" placeholder="Password" required/>
                            <label for="password">Password</label>
                            </div>
                            <div className="form-label-group">
                            <input type="text" id="phone_no" value={phone_no} onChange={(e)=>setphone_no(e.target.value)} className="form-control" placeholder="Enter your phone no" required />
                            <label for="phone_no">Phone No.</label>
                            </div>
                            <div className="form-label-group">
                            <input type="text" id="employee_id" value={employee_id} onChange={(e)=>setemployee_id(e.target.value)} className="form-control" placeholder="Enter your Address" required />
                            <label for="employee_id">Employee ID</label>
                            </div>
                            <div className="form-label-group">
                            <input type="text" id="organisation_name" value={organisation_name} onChange={(e)=>setorganisation_name(e.target.value)} className="form-control" placeholder="Enter your Gst Number" required />
                            <label for="organisation_name">Organisation Name</label>
                            </div>
                            <div className="form-label-group">
                            <input type="file" id="id_image" accept="image/png, image/jpeg"  onChange={handleChange} required/>
                            <label for="image">Upload ID CARD's Image</label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Register</button>
        
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Check Your Details again</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col xs={12} md={6}>
                      <img src={id_image.preview} alt="dummy"  style={{width:"300px",height:"300px"}}/>
                    </Col>
                    <Col xs={12} md={6}>
                    <h3>Name: {name}</h3>
                    <h3>Employee Id: {employee_id}</h3>
                    <h3>email: {email}</h3>
                    <h3>Organisation Name: {organisation_name}</h3>
                    <h3>Phone Number: {phone_no}</h3>
                    
                    </Col>
                  </Row>
                </Container>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={submit}>
                  Yes! All checked
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
            
            
        );
    

}
export default Register;
