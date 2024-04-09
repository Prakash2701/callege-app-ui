import React from 'react'
import { Container, Button,Row ,Col,Form,Alert} from 'react-bootstrap';
import secureLocalStorage from "react-secure-storage";
import { useEffect,useState } from "react";
import axios from "axios";
const FormS = (props) => {

    const mainURL="http://localhost:8081/auth/";
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(secureLocalStorage.getItem("token"));
    const [userId, setUseId] = useState(secureLocalStorage.getItem("id"));
    const [peopeId, setPeopleId] = useState();
    const [validated, setValidated] = useState(false);
    const [validated2, setValidated2] = useState(false);
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
    const [dataArrive, setDataArrive] = useState();
    const [dataArriveImg, setDataArriveImg] = useState();
    const [otherjobType, setOtherjobType] = useState(null);
    const [otherjob, setOtherjob] = useState(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState();
   
    const handleMobileValidation= (event)=>
  {
    var phoneno = /^[5-9]{1}\d{9}$/;
    if(event.target.value.match(phoneno)){
        event.target.setCustomValidity('');
      }else{
        event.target.setCustomValidity('Invlid Phone number');
    }
  }
  const handleImageValidation= (event)=>
  {
    var phoneno = undefined;
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
            const res = await fetch(`${mainURL}people/${props.url}/add`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify({
                userId:userId,
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
              setPeopleId(resdata.id);
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

    const handleFileUpload = async (event) => {
      setDataArrive(false);
      event.preventDefault();
      event.stopPropagation();
      
    const form = event.currentTarget;
    if (file===undefined||file===null) {
      event.preventDefault();
      event.stopPropagation();
      setValidated2(true);
      console.log("file if  :"+file);
    }else{
     console.log("file"+file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", peopeId);
       try {
        const response = await axios.post("http://localhost:8081/auth/upload", formData ,{
          headers: {
              Accept: "application/json",
              "Content-Type": "text/plain;charset=UTF-8",
              Authorization: "Bearer " + token,
            },
           
      });

      if (response.status === 200) {
          // Image uploaded successfully!
          setDataArriveImg(response.data.dataArrive);
          setMessage(response.data.message)
          console.log(response);
      } else {
          // There was an error uploading the image
      }
      } catch (error) {
       console.log(error);
      }
      
    }
  };
  return (
    <div>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-5">
      <Row>
        <Col>
        {error && <Alert variant='danger' dismissible> {error}   </Alert> }
        {dataArrive && <Alert  variant='success' dismissible>{message}</Alert>}
        </Col>
      </Row>
      {props.url==='child'&& <Row className="mb-3">
      <Col md="4">
             <Form.Group  >
             <Form.Label>Parent Id</Form.Label>
               <Form.Control type="taxt" placeholder="Enter Parent Id" value={parentId}  onChange={(e)=>setParentId(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                Please provide a valid  parentId.
               </Form.Control.Feedback>
             </Form.Group>
          </Col>
      </Row>}
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
        </Row>
    </Form>
    <Form   validated={validated2} onSubmit={handleSubmit} className="mb-5">
      <Row>
        <Col>{dataArriveImg && <Alert  variant='success' dismissible>{message}</Alert>}</Col>
      </Row>
      <Row>
       <Col md="2"><Form.Label>Upload Image</Form.Label></Col>
        <Col md="8">
        <Form.Group  >
               <Form.Control type='file' onInput={handleImageValidation} onChange={(e) => setFile(e.target.files[0])} required/>
             </Form.Group>
             {validated2 &&<p className='text-danger'>
          Please provide a valid  Image.
            </p>}
        </Col>
        <Col>
        <Button variant="primary" onClick={handleFileUpload}>Upload</Button>
        </Col>
      </Row>
    </Form>
    </div>
  )
}

export default FormS
