import React from 'react'
import { Container, Button,Row ,Col} from 'react-bootstrap';
import Layout from './components/layout'
import Form from './components/Form'
import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";

let nextId = 1;
function Add() {

  const [token, setToken] = useState(secureLocalStorage.getItem("token"));
  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  const [adminRols, setAdminRols] = useState(true);
  const [userRole, setUserRole] = useState(true);
  const [loggedin, setLoggedin] = useState(false);
  const [artists, setArtists] = useState([]);
  
  
  const handlePlus=()=>{
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++,  },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    
    console.log(artists);
  };

  useEffect(() => {
   
   

    if (typeof window !== "undefined" && window.localStorage) {
      setUsername(secureLocalStorage.getItem("username"));
      setRole(secureLocalStorage.getItem("role"));
      if (secureLocalStorage.getItem("token") !== null &&  secureLocalStorage.getItem("token") != undefined ) {
        setLoggedin(true);
        setToken(secureLocalStorage.getItem("token"));
         
 

      } else {
        router.push("/login");
        setLoggedin(false);
      }
    }
   
    
  }, []);

  
 
  return (
<Layout>
<Container>
  <Row>
    <Col md="12">
    <Form url="parent"/>
    </Col>
    <Col className='mt-3'>
    <Button className='' onClick={handlePlus} >+</Button>
    </Col>
  </Row>
  {
    artists.map((itme) =>{
      return (
    <Row key={itme.id}>
      <Col md="12" className='mt-5 mb-5'>
      <Form url="child"/>
      
      </Col>
     
   
    </Row>
      );
     })
    }
      
     
    </Container>
</Layout>
   
  )
}

export default Add
