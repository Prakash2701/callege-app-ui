import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Layout from "./components/layout";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import {useRouter} from "next/navigation";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";

export default function login() {
  const router = useRouter();
  const [numder, setNumder] = useState("");
  const [password, setpassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setdata] = useState();
  const [validated, setValidated] = useState(false);

  let handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }else{
      
   
      e.preventDefault();
      e.stopPropagation();
      try {
        const res = await fetch("http://localhost:8081/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number: numder,
            password: password,
          }),
        });

        console.log(res.status);
        if (res.status === 200) {
          const resdata = await res.json();
          secureLocalStorage.setItem("token", resdata.token);
          secureLocalStorage.setItem("username", resdata.username);
          secureLocalStorage.setItem("id", resdata.id);
          secureLocalStorage.setItem("number", resdata.number);
          secureLocalStorage.setItem("roles", resdata.roles);
          router.push("/");
          setdata(resdata);
          setValidated(false);
          setSuccessful(true);
          setMessage("Login succefull ");
        } else if (res.status === 403) {
          setMessage("Username and Password incorrect");
          setSuccessful(false);
        }
      } catch (error) {
        console.log(error);
        setSuccessful(false);
      }
    }
  };

  const handleMobileValidation= (event)=>
  {
    var phoneno = /^[5-9]{1}\d{9}$/;
    if(event.target.value.match(phoneno)){
        event.target.setCustomValidity('');
      }else{
        event.target.setCustomValidity('Invlid Phone number');
    }
  }
  

  return (
    <Container fluid className="mt-5">

        <Container className={` text-body `} fluid >
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-12 col-md-4 col-lg-6 col-xl-5">
              <Card>
                <Card.Body className="p-5 text-center">
                  <div className="mb-md-2 mt-md-2 pb-2 ">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  </div>
                  {message}

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-5">
                      <Form.Group  as={Row}>
                        <Form.Label column sm={3}>
                          Number
                        </Form.Label>
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="Number"
                            onInput={handleMobileValidation}
                            id="Numder"
                            value={numder}
                            onChange={(e) => setNumder(e.target.value)}
                            required
                          ></Form.Control>
                                                  <Form.Control.Feedback type="invalid">
                             Please provide a valid  Number.
                              </Form.Control.Feedback>
                        </Col>

                      </Form.Group>
                    </div>

                    <div className="form-outline form-white mb-5">
                      <Form.Group controlId="pass" as={Row}>
                        <Form.Label column sm={3}>
                          Password
                        </Form.Label>
                        <Col>
                          <Form.Control
                            autoComplete="on"
                            placeholder="Password"
                            type="password"
                            
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                             Please provide a valid Password .
                              </Form.Control.Feedback>
                          
                        </Col>
                        
                      </Form.Group>
                    </div>

                    <Button type="submit" variant="info">
                      Login
                    </Button>
                  </Form>
                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link href={"/signup"} className="text-black-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
     
    </Container>
  );
}



