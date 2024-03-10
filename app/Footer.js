"use client"
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";


const footer = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <footer>
    </footer>
  )};

  export default footer