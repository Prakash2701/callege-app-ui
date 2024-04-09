import React from 'react'
import {useRouter} from "next/router";
import { useEffect,useState } from 'react';
import secureLocalStorage from "react-secure-storage";
import Layout from './components/layout'
import { Container, Button,Row ,Col,Form,Table,Alert} from 'react-bootstrap';

function profile() {

    const mainURL="http://localhost:8081/auth/";
    const [token, setToken] = useState(secureLocalStorage.getItem("token"));
    const [useNumber, setUseNumber] = useState(secureLocalStorage.getItem("number"));
    const [peopleData, setPeopleData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [error, setError] = useState(false);
    const [dataArrive, setDataArrive] = useState();
    const [message, setMessage] = useState();
    const router = useRouter();
    const [userId, setUseId] = useState(secureLocalStorage.getItem("id"));
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState();
    const [middleName, setMiddleName] = useState();
    const [lastName, setLastName] = useState();
    const [petaCaste, setPetaCaste] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [age, setAge] = useState();
    const [bloodGroup, setBloodGroup] = useState();
    const [job, setJob] = useState();
    const [jobType, setJobType] = useState();
    const [district, setDistrict] = useState();
    const [taluka, setTaluka] = useState();
    const [village, setVillage] = useState();
    const [pAddress, setpAddress] = useState();
    const [cAddress, setcAddress] = useState();
    const [parentId, setParentId] = useState();
    const [otherjobType, setOtherjobType] = useState(null);
    const [otherjob, setOtherjob] = useState(null);
    const [peopleId, setPeopleId] = useState();
    const [dataEdit, setDataEdit] = useState(false);

   
    const handleMobileValidation= (event)=>
  {
    var phoneno = /^[5-9]{1}\d{9}$/;
    if(event.target.value.match(phoneno)){
        event.target.setCustomValidity('');
      }else{
        event.target.setCustomValidity('Invlid Phone number');
    }
  }

    const hendleClear =()=>{
       setAge('');
       setBloodGroup('');
       setDistrict('');
       setJob('');
       setJobType('');
       setPetaCaste('');
       setpAddress('');
       setcAddress('');
       setPhoneNumber('');
       setFirstName('');
       setMiddleName('');
       setLastName('');
       setTaluka('');
       setVillage('');

    };

    const handleSubmit = async (event) => {
      
      setDataArrive(false);
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }else{
      
        
        try {
            const res = await fetch(`${mainURL}admin/people/update`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify({
                id:peopleId,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                petaCaste: petaCaste,
                age: age,
                bloodGroup: bloodGroup,
                job: job,
                jobType: jobType,
                district: district,
                taluka: taluka,
                phoneNumber: phoneNumber,
                village: village,
                permanentAddress: pAddress,
                currentAddress: cAddress,
                otherJobType: otherjobType,
                otherJob: otherjob,
                parentId: parentId
              }),
            });
    
            
            if (res.status === 200) {
              const resdata = await res.json();
              console.log(resdata);
              setValidated(false);
              setDataArrive(resdata.dataArrive);
              setMessage(resdata.message);;
              hendleClear();
             
            } else if (res.status === 403) {
            //   setMessage("somthing wrong");
            //   setSuccessful(false);
            }
          } catch (error) {
            // console.log(error);
            // setSuccessful(false);
          }
        
        }
     
    };


    useEffect(() => {
       
              fetchData();
           
      }, []);
  
    const fetchData=async(e)=>{
       
        setShowData(false);
            try {
          const res = await fetch(`${mainURL}admin/pepole/profile/${userId}`, {
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
           
            setPeopleData(resdata.peopleDataList);
            setShowData(true);
           
          } else if (res.status === 403) {
            
          }
        } catch (error) {
         // console.log(error);
          
        }
      };

      

      const openUser = async(e)=>{
        setDataEdit(true);
        setShowData(false);
        const id=e.target.id;
        try {
            const res = await fetch(`${mainURL}admin/select/people/`+id, {
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
              setFirstName(resdata.peopleData.firstName);
              setMiddleName(resdata.peopleData.middleName);
              setLastName(resdata.peopleData.lastName);
              setPetaCaste(resdata.peopleData.petaCaste);
              setPhoneNumber(resdata.peopleData.phoneNumber);
              setAge(resdata.peopleData.age);
              setBloodGroup(resdata.peopleData.bloodGroup);
              setJob(resdata.peopleData.job);
              setOtherjob(resdata.peopleData.otherJob?resdata.peopleData.otherJob:'');
              setJobType(resdata.peopleData.jobType);
              setOtherjobType(resdata.peopleData.otherJobType?resdata.peopleData.otherJobType:'');
              setDistrict(resdata.peopleData.district);
              setTaluka(resdata.peopleData.taluka);
              setVillage(resdata.peopleData.village);
              setcAddress(resdata.peopleData.currentAddress);
              setpAddress(resdata.peopleData.permanentAddress);
              setParentId(resdata.peopleData.parentId);
              setPeopleId(resdata.peopleData.id);
              
            } else if (res.status === 403) {
              setMessage(res.status);
            } else {
              setMessage("somthing wrong");
            }
          } catch (error) {
            console.log(error);
          }
      };
      const Cancel=(e)=>{
       setShowData(true);
       setDataEdit(false);
       fetchData();
      }
      
  return (
    <Layout>
      <Container fluid>
      <Row className="mb-3 mt-3">
        <Col>
        {error && <Alert variant='danger' dismissible> {error}   </Alert> }
      {dataArrive && <Alert  variant='success' dismissible> {message}    </Alert>}
        </Col>
      </Row>
    {showData && <Table  hover size="sm" responsive="sm">
        <thead>
          <tr>
            
            <th scope="col">Id</th>
            <th scope="col">Parent Id</th>
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
            <th scope="col">Option</th>
          </tr>
        </thead>
        {peopleData.map((data)=>{
        return ( 
        
        <tbody  key={data.id}>
         <tr>
            <td scope="row">{data.id}</td>
            <td scope="row">{data.parentId}</td>
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
            <td><Button variant="success" size="sm" id={data.id} name={data.id} onClick={openUser} ><i id={data.id} name={data.id} onClick={openUser}  className="bi bi-pencil-square"></i></Button></td>
            
            
          </tr>
        </tbody>
         ); 
     })} 
      </Table>}

      {dataEdit &&<Form noValidate validated={validated} onSubmit={handleSubmit}>
      
      <Row className="mb-3">
      <Col md="4">
             <Form.Group  >
             <Form.Label>Parent Id</Form.Label>
               <Form.Control type="taxt" placeholder="Enter Parent Id" value={parentId}  onChange={(e)=>setParentId(e.target.value)}  />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  parentId.
               </Form.Control.Feedback>
             </Form.Group>
          </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>First Name</Form.Label>
          <Form.Control type="taxt" placeholder="Enter First Name" value={firstName?firstName:''}  onChange={(e)=>setFirstName(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
          Please provide a valid  First Name.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Middle Name</Form.Label>
          <Form.Control type="taxt" placeholder="Enter Middle Name" value={middleName?middleName:''}  onChange={(e)=>setMiddleName(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
          Please provide a valid  Middle Name.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="taxt" placeholder="Enter Last Name" value={lastName}  onChange={(e)=>setLastName(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
          Please provide a valid  Last Name.
            </Form.Control.Feedback>
        </Form.Group>
        
      </Row >
      
      <Row className="mb-3">
      <Form.Group as={Col} >
          <Form.Label>Peta Caste</Form.Label>
          <Form.Control type="taxt" placeholder="Enter Peta Caste" value={petaCaste}  onChange={(e)=>setPetaCaste(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
          Please provide a valid  Peta Caste.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="taxt" placeholder="Enter Phone Number" value={phoneNumber} onInput={handleMobileValidation}  onChange={(e)=>setPhoneNumber(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
          Please provide a valid  Phone Number.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>age</Form.Label>
          <Form.Control type="number" placeholder="Enter age" value={age}  onChange={(e)=>setAge(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
          Please provide a valid  Age.
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
     <Row className="mb-3">
          <Col md="4">
             <Form.Group  >
             <Form.Label>Blood Group</Form.Label>
               <Form.Select  value={bloodGroup}  onChange={(e)=>setBloodGroup(e.target.value)} required >
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
                <Form.Control.Feedback type="invalid">
                Please provide a valid  Blood Group.
               </Form.Control.Feedback>
             </Form.Group>
          </Col>
          <Col md="4">
          <Form.Group >
          <Form.Label>Job Type</Form.Label>
          <Form.Select id="Choosejob" name='JobType' value={jobType?jobType:''} onChange={(e)=>setJobType(e.target.value)} required>
            <option></option>
            <option value="government">government</option>
            <option value="private">private</option>
            <option value="business">business</option>
            <option value="student">student</option>
            <option>...</option>
            <option value="other">other</option>
          </Form.Select>
        </Form.Group>
        {jobType&&jobType==="other"&&<Form.Group  className='mt-3' >
               <Form.Control type="taxt" placeholder="Enter Job Type" name="otherJobType" value={otherjobType?otherjobType:''}  onChange={(e)=>setOtherjobType(e.target.value)}  />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  Job Type.
               </Form.Control.Feedback>
             </Form.Group>}
          
          </Col>
          <Col md="4">
          <Form.Group >
          <Form.Label>Job</Form.Label>
          <Form.Select id="Choosejob" value={job?job:''} onChange={(e)=>setJob(e.target.value)} required>
            <option></option>
            <option>teacher</option>
            <option>...</option>
            <option>...</option>
            <option>...</option>
            <option>...</option>
            <option value="other">other</option>
          </Form.Select>
        </Form.Group>
        { job && job==='other' && <Form.Group  className='mt-3' >
               <Form.Control type="taxt" placeholder="Enter Job " name="otherJob" value={otherjob?otherjob:''}  onChange={(e)=>setOtherjob(e.target.value)}  />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  Job .
               </Form.Control.Feedback>
             </Form.Group>}

          </Col>

        </Row>
     
        <Row className="mb-3">
          <Col md="4">
             <Form.Group  >
             <Form.Label>district</Form.Label>
               <Form.Control type="taxt" placeholder="Enter district" value={district}  onChange={(e)=>setDistrict(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  district.
               </Form.Control.Feedback>
             </Form.Group>
          </Col>
          <Col md="4">
             <Form.Group  >
             <Form.Label>Taluka</Form.Label>
               <Form.Control type="taxt" placeholder="Enter taluka" value={taluka}  onChange={(e)=>setTaluka(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  taluka.
               </Form.Control.Feedback>
             </Form.Group>
          </Col>
          <Col md="4">
             <Form.Group  >
             <Form.Label>Village</Form.Label>
               <Form.Control type="taxt" placeholder="Enter village" value={village}  onChange={(e)=>setVillage(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  village.
               </Form.Control.Feedback>
             </Form.Group>
          </Col>

        </Row>
        <Row className="mb-3">
        <Col md="4">
             <Form.Group  >
             <Form.Label>Permanent address</Form.Label>
               <Form.Control  as={"textarea"} placeholder="Enter permanent address" value={pAddress}  onChange={(e)=>setpAddress(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  permanent address.
               </Form.Control.Feedback>
             </Form.Group>
          </Col>
          <Col md="4">
             <Form.Group  >
             <Form.Label>Current address</Form.Label>
               <Form.Control   as={"textarea"} placeholder="Enter current address" value={cAddress}  onChange={(e)=>setcAddress(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  current address.
               </Form.Control.Feedback>
             </Form.Group>
          </Col>

        </Row>
        <Row>
          <Col md="4">
          <Button variant="primary" type="submit">
        Submit
      </Button>
          </Col>
          <Col md="4">
          <Button variant="primary" onClick={hendleClear}>
        Clear
      </Button>
          </Col>
          <Col>
                <Button  onClick={Cancel} variant="primary">Cancel</Button>
                </Col>
        </Row>
      
    </Form>}
    </Container>
    </Layout>
  )
}

export default profile
