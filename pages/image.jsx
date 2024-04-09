import React from 'react'
import { useEffect,useState } from 'react';
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
export default function image() {
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(secureLocalStorage.getItem("token"));
   
  
   
  
    

    const handleFileUpload = async () => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", 23);

        const response = await axios.post("http://localhost:8081/auth/upload", formData ,{
            headers: {
                Accept: "application/json",
                "Content-Type": "text/plain;charset=UTF-8",
                Authorization: "Bearer " + token,
              },
             
        });

        if (response.status === 200) {
            // Image uploaded successfully!
            console.log(response);
        } else {
            // There was an error uploading the image
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Upload Image</button>
        </div>
    );

  }
