import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';
import Time from '../Assets/BlueClock.mp4';

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBAnimation
} from 'mdbreact';

const Login = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/api/users/login', formData)
      .then((res) => {
        sessionStorage.setItem('user', res.data);
        setCurrentUser(res.data);
        history.push('/');
      })
      .catch(() =>
        swal('Make sure your email and password are correct!', 'Try again')
      );
  };
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        style={{
          objectFit: 'cover',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0
        }}
      >
        <source src={Time} type="video/mp4" />
      </video>
      <MDBContainer className="d-flex justify-content-center">
        <MDBCol md="5">
          <MDBRow className="py-4 mt-5"></MDBRow>
          <MDBAnimation type="bounceInUp" duration="700ms">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={handleSubmit}>
                  <p className="h1 text-center py-4 blue-text">Login</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Your email"
                      icon="envelope"
                      group
                      type="email"
                      name="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={handleChange}
                    />
                    <MDBInput
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      validate
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn className="mb-3" gradient="blue" type="submit">
                      Login
                    </MDBBtn>
                    <div>
                      <p>
                        {' '}
                        Don't have an account?{' '}
                        <Link to="/Signup">Sign up.</Link>
                      </p>
                      <Link to="/forgotpassword"> Forgot password?</Link>
                    </div>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBAnimation>
        </MDBCol>
      </MDBContainer>
    </div>
  );
};

export default Login;
