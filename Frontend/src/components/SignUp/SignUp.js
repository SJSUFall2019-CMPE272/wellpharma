import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import {hostAddress,port} from '../../config'
import { Redirect } from "react-router";
import { Row, Col, Form, Button } from "react-bootstrap";

class SignUp extends Component {
  constructor(props) {
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      fullname: "",
      mobile: "",
      address: "",
      city: "",
      country: "",
      zipcode: ""
    };

    //Bind the handlers to this class
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {}

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //submit Login handler to send a request to the node backend
  registerUser = e => {
    e.preventDefault();
    var headers = new Headers();

    const data = {
      email: this.state.email,
      password: this.state.password,
      fullname: this.state.fullname,
      mobile: this.state.mobile,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      zipcode: this.state.zipcode
    };

    if (this.state.email == "" ||
      this.state.fullname == "" ||
      this.state.mobile == "" ||
      this.state.address == "" ||
      this.state.password == "" ||
      this.state.city == "" ||
      this.state.country == "" ||
      this.state.zipcode == ""
    ) {
      alert("Please fill all Fields!");
    } else {
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.post("http://"+hostAddress+":"+port+"/signUp/signUp", data)
        .then(response => {
          alert(response.data.resmsg);
          console.log("Status Code for Sign Up : ", response.status);
          if (response.data.resmsg.trim() == "User Added Successfully!") {
            console.log("Hello New User!");
            localStorage.setItem("email", this.state.email);
            localStorage.setItem("jwtToken", response.data.token);
            localStorage.setItem('fullname',this.state.fullname);
            this.setState({
              authFlag: true
            });
          }
        });
    }
  };
  render() {
    let redirectVar = null;
    if (localStorage.getItem("jwtToken")) {
      redirectVar = <Redirect to="/userhome" />;
    }
    return (
      <Row>
        {redirectVar}
        <Col
          className="col-sm-8"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/originals/02/2e/96/022e9691c5ba65d23cbf27a53f83163e.jpg)",
            height: "700px"
          }}
        >
          {/* <img
            style={{ width: "100%" }}
            src="https://i0.wp.com/www.upinpoole.co.uk/wp-content/uploads/2018/11/background-colour.png?ssl=1"
          ></img> */}
        </Col>
        <Col className="col-sm-4" style={{backgroundColor:"#fefefe"}}>
          <br></br>
          <Form>
            <Form.Group controlId="formFullName" style={{width:"60%", marginLeft:"16%"}}>
              <Form.Label style={{marginLeft:"5px"}}>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={this.inputChangeHandler}
                style={{height:"30px", fontSize:"13px"}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" style={{width:"60%", marginLeft:"16%"}}>
              <Form.Label style={{marginLeft:"5px"}}>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.inputChangeHandler}
                style={{height:"30px", fontSize:"13px"}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" style={{width:"60%", marginLeft:"16%"}}>
              <Form.Label style={{marginLeft:"5px"}}>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="Mobile"
                name="mobile"
                onChange={this.inputChangeHandler}
                style={{height:"30px", fontSize:"13px"}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" style={{width:"60%", marginLeft:"16%"}}>
              <Form.Label style={{marginLeft:"5px"}}>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                onChange={this.inputChangeHandler}
                style={{height:"30px", fontSize:"13px"}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" style={{width:"60%", marginLeft:"16%"}}> 
              <Form.Label style={{marginLeft:"5px"}}>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" style={{width:"60%", marginLeft:"16%"}}>
              <Form.Label style={{marginLeft:"5px"}}>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="country"
                onChange={this.inputChangeHandler}
                style={{height:"30px", fontSize:"13px"}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" style={{width:"60%", marginLeft:"16%"}}>
              <Form.Label style={{marginLeft:"5px"}}>Zipcode</Form.Label>
              <Form.Control
                type="number"
                placeholder="Zipcode"
                name="zipcode"
                onChange={this.inputChangeHandler}
                style={{height:"30px", fontSize:"13px"}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{width:"60%", marginLeft:"16%"}}>
              <Form.Label style={{marginLeft:"5px"}}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.inputChangeHandler}
                style={{height:"30px", fontSize:"13px"}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{width:"60%", marginLeft:"16%"}}>
              <Form.Label style={{marginLeft:"5px"}}>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                onChange={this.inputChangeHandler}
                style={{height:"30px", fontSize:"13px"}}
              />
            </Form.Group>

            <Button
              style={{ float: "left", marginLeft:"65%" }}
              onClick={this.registerUser}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
          <br></br>
          <div style={{ paddingTop: "10px" }}>
            <a href="/login" style={{ textAlign: "left", marginLeft:"16%" }}>
              Already a Member? Sign In!
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}
//export Login Component
export default SignUp;
