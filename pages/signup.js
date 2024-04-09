import React,{useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Layout from "./components/layout";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import Head from 'next/head';
import secureLocalStorage from "react-secure-storage";
import {useRouter} from "next/navigation";
export default function signup() {
  const router = useRouter();
    const [name, setName] = useState("");
    const [number, setNumder] = useState("");
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
        const res = await fetch("http://localhost:8081/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            number:number,
            password: password,
          }),
        });

        console.log(res.status);
        if (res.status === 200) {
          const resdata = await res.text();
          
          
          setdata(resdata);
          setSuccessful(true);
          setMessage();
          router.push("/login");
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
  
  return (
    
       
      <Container fluid data-bs-theme="light" className="mt-5">
        <Head>
          <title>SignUp</title>
        </Head>
        <div className="row mt-5 d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-4 col-lg-6 col-xl-5">
            <Card className="">
              <Card.Body className="p-5 text-center">
                <div className="mb-md-2 mt-md-2 pb-2 ">
                  <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <div className="form-outline form-white mb-5">
                    <Form.Group controlId="validationCustom01">
                      <Form.Control
                        type="text"
                        placeholder="UserName"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
            Please provide a valid User Name.
          </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="form-outline form-white mb-5">
                    <Form.Group controlId="validationCustom02">
                      <Form.Control
                        type="text"
                        placeholder="Number"
                        value={number}
                        onChange={(e)=>setNumder(e.target.value)}
                        required
                      ></Form.Control>
                       <Form.Control.Feedback type="invalid">
            Please provide a valid Number.
          </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="form-outline form-white mb-5">
                    <Form.Group controlId="validationCustom03">
                      <Form.Control
                      autoComplete="on"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                        required
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <Button type="submit" variant="primary">SignUp</Button>
                </Form>
                <div>
                  <p className="mb-0">
                    I have an account?{" "}
                    <Link href={"/login"} className="text-black-50 fw-bold">
                      Login
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    
  );
}
