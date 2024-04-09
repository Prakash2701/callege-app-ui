import 'bootstrap/dist/css/bootstrap.min.css';

import "../styles/global.css"
import React, {useState,useEffect} from "react";
import secureLocalStorage from "react-secure-storage";
import "bootstrap-icons/font/bootstrap-icons.css";
export default function App({ Component, pageProps }) {
  const [mode,setMode] =useState(false);
  useEffect(() => {
    setMode(secureLocalStorage.getItem("mode"));
    
  },[]);
    return (
    <div data-bs-theme={mode?"dark":"light"} className={`${mode?"dark-c":"light-c"}`}>
    <Component {...pageProps} />
    </div>
    );
  }