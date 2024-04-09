import Head from 'next/head';
import { useEffect,useState } from 'react';
import Layout from './components/layout'
import { Container, Button,Row ,Col,Form,Table,Alert} from 'react-bootstrap';
import secureLocalStorage from "react-secure-storage";
import Link from "next/link";
import { set } from 'react-hook-form';
export default function Home() {
  const mainURL="http://localhost:8081/auth/";
  const [token, setToken] = useState(secureLocalStorage.getItem("token"));
  const [Name, setName] = useState();
  const [petaCaste, setPetaCaste] = useState();
  const [job, setJob] = useState();
  const [village, setVillage] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [peopleData, setPeopleData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [error, setError] = useState(false);
  const [dataArrive, setDataArrive] = useState();
  const [message, setMessage] = useState();

  const handleSubmitName=async(e)=>{
    setDataArrive(false);
    setShowData(false);
    e.preventDefault();
    try {
      const res = await fetch(`${mainURL}people/search/name/`+Name, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
       
  
      
      if (res.status === 200) {
        const resdata = await res.json();
        console.log(resdata);
        setDataArrive(resdata.dataArrive);
        setMessage(resdata.message);
        setPeopleData(resdata.peopleDataList);
        setShowData(true);
       
      } else if (res.status === 403) {
        
      }
    } catch (error) {
     // console.log(error);
      
    }
  };
  const handleSubmitCast=async(e)=>{
    setDataArrive(false);
    setShowData(false);
    e.preventDefault();
    try {
      const res = await fetch(`${mainURL}people/search/cast/`+petaCaste, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
       
  
      
      if (res.status === 200) {
        const resdata = await res.json();
        console.log(resdata);
        setDataArrive(resdata.dataArrive);
        setMessage(resdata.message);
        setPeopleData(resdata.peopleDataList);
        setShowData(true);
       
      } else if (res.status === 403) {
        
      }
    } catch (error) {
     // console.log(error);
      
    }
  };
  const handleSubmitVillage=async(e)=>{
    setDataArrive(false);
    setShowData(false);
    e.preventDefault();
    try {
      const res = await fetch(`${mainURL}people/search/village/`+village, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
       
  
      
      if (res.status === 200) {
        const resdata = await res.json();
        console.log(resdata);
        setDataArrive(resdata.dataArrive);
        setMessage(resdata.message);
        setPeopleData(resdata.peopleDataList);
        setShowData(true);
       
      } else if (res.status === 403) {
        
      }
    } catch (error) {
     // console.log(error);
      
    }
  };
  const handleSubmitJob=async(e)=>{
    setDataArrive(false);
    setShowData(false);
    e.preventDefault();
    try {
      const res = await fetch(`${mainURL}people/search/job/`+job, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
       
  
      
      if (res.status === 200) {
        const resdata = await res.json();
        console.log(resdata);
        setDataArrive(resdata.dataArrive);
        setMessage(resdata.message);
        setPeopleData(resdata.peopleDataList);
        setShowData(true);
       
      } else if (res.status === 403) {
        
      }
    } catch (error) {
     // console.log(error);
      
    }
  };
  const handleSubmitBloodGroup=async(e)=>{
    setDataArrive(false);
    setShowData(false);
    e.preventDefault();
    try {
      const res = await fetch(`${mainURL}people/search/bloodgroup/`+bloodGroup, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
       
  
      
      if (res.status === 200) {
        const resdata = await res.json();
        console.log(resdata);
        setDataArrive(resdata.dataArrive);
        setMessage(resdata.message);
        setPeopleData(resdata.peopleDataList);
        setShowData(true);
       
      } else if (res.status === 403) {
        
      }
    } catch (error) {
     // console.log(error);
      
    }
  };
  // useEffect(()=>{
  // },[]);
  return (
    <Layout>
    
    <Container fluid>
    <Head>
      <title></title>
      
    </Head>
    <Container>
    <Row className="mb-3 mt-3">
        <Col>
        {error && <Alert variant='danger' dismissible> {error}   </Alert> }
      {dataArrive && <Alert  variant='success' dismissible> {message}    </Alert>}
        </Col>
      </Row>
    <Form>
    <Row className="mb-3">
      <Col>
      <Form.Group>
          <Form.Control type="taxt" placeholder="search by name" value={Name} onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
      </Col>
      <Col>
      <Button id="name" onClick={handleSubmitName} >search</Button>
      </Col>
        </Row>

        <Row className="mb-3">
        <Col>
      <Form.Group>
          <Form.Control type="taxt" placeholder="search by village" value={village} onChange={(e)=>setVillage(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
      <Button id="village" onClick={handleSubmitVillage} >search</Button>
      </Col>

        </Row>
        <Row className="mb-3">
        <Col>
      <Form.Group>
          <Form.Control type="taxt" placeholder="search by Caste" value={petaCaste} onChange={(e)=>setPetaCaste(e.target.value)}/>
        </Form.Group>
      </Col>
      <Col>
      <Button id="cast" onClick={handleSubmitCast} >search</Button>
      </Col>
        </Row>
        <Row className="mb-3"> 
        <Col>
      <Form.Group>
          <Form.Control type="taxt" placeholder="search by job" value={job} onChange={(e)=>setJob(e.target.value)}/>
        </Form.Group>
      </Col>
      <Col>
      <Button id="job" onClick={handleSubmitJob} >search</Button>
      </Col>
        </Row>
        <Row className="mb-3">
        <Col md="4">
          <Form.Group >
          
          <Form.Select id="" value={bloodGroup} onChange={(e)=>setBloodGroup(e.target.value)}>
            <option></option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option>...</option>
            <option  value="other"> other </option>
          </Form.Select>
        </Form.Group>
        </Col>
        <Col>
      <Button id="bloodgroup" onClick={handleSubmitBloodGroup}>search</Button>
      </Col>
        </Row>

    </Form>
    </Container>
    <Container fluid>
    {showData && <Table  hover size="sm" responsive="sm">
        <thead>
          <tr>
            
            <th scope="col"> First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Peta Caste</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Age</th>
            <th scope="col">Blood Group</th>
            <th scope="col">Job Type</th>
            <th scope="col">Other Type</th>
            <th scope="col">Job</th>
            <th scope="col">Other Job</th>
            <th scope="col">District</th>
            <th scope="col">Taluka</th>
            <th scope="col">Village</th>
            <th scope="col">Permanent address</th>
            <th scope="col">Current address</th>
           
          </tr>
        </thead>
        {peopleData.map((data)=>{
        return ( 
        
        <tbody  key={data.id}>
         <tr>
            <td scope="row">{data.firstName}</td>
            <td scope="row">{data.middleName}</td>
            <td scope="row">{data.lastName}</td>
            <td scope="row">{data.petaCaste}</td>
            <td scope="row">{data.phoneNumber}</td>
            <td scope="row">{data.age}</td>
            <td scope="row">{data.bloodGroup}</td>
            <td scope="row">{data.jobType}</td>
            <td scope="row">{data.otherJobType}</td>
            <td scope="row">{data.job}</td>
            <td scope="row">{data.otherJob}</td>
            <td scope="row">{data.district}</td>
            <td scope="row">{data.taluka}</td>
            <td scope="row">{data.village}</td>
            <td scope="row">{data.permanentAddress}</td>
            <td scope="row">{data.currentAddress}</td>
            
            
            
          </tr>
        </tbody>
         ); 
     })} 
      </Table>}
    </Container>
   


    </Container>
  </Layout>
  );
}
