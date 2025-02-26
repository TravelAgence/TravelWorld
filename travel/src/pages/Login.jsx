import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from './../context/AuthContext';
import { BASE_URL_Login } from './../utils/config.js';
import swal from 'sweetalert';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL_Login}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
        swal("Error", result.message, "error");
        return;
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
      swal("Success", "Logged in successfully", "success").then(() => {
        navigate('/');
      });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
      swal("Error", err.message, "error");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login__container d-flex justify-content-between'>
              <div className='login__img'>
                <img src={loginImg} alt="" />
              </div>

              <div className='login__form'>
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='Email' required id='email' onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                  </FormGroup>
                  <Button type='submit' className='btn secondary__btn auth__btn'>Login</Button>
                </Form>
                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;