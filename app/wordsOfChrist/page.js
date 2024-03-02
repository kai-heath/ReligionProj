'use client'
import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Row, Col, Form } from "react-bootstrap";
import styles from './page.css'
import { output } from '../../next.config';


export default function Page() {
  const [emailInput, setInput] = useState('')
  const [returnVal, setReturnVal] = useState('')
  const URL = 'http://localhost:3001/api/'

  function addEmail() {
    setReturnVal('Adding email...')
    emailAddRequest(emailInput)
        .then((response) => setReturnVal(response))
    setInput('')
}

async function emailAddRequest(emailAddress) {
  const request = await fetch('/api/addEmail', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({email: emailAddress}),
})
  return await request.text()
}

  return (
    <div className = "center">
      <h1>Welcome to Words of Christ!</h1>
      <div>
        <label>
          <Form.Control value = {emailInput} onInput = {(e) => setInput(e.target.value)} type = 'email' placeholder = 'Enter your email here!'/>
        </label>
        <button onClick={()=> addEmail()}>press to add your Email!</button>
        <p id = 'emailResult'>{returnVal}</p>
    </div>
    <div>
        <button type = 'button' onClick = {() => console.log(emailInput)}>press to send the emails!</button>
    </div>
    </div>
  )
}