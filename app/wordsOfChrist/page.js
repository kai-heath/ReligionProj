"use client";
import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import styles from "./page.css";
import { output } from "../../next.config";

export default function Page() {
  const [emailInput, setInput] = useState("");
  const [returnVal, setReturnVal] = useState("");
  const [carrier, setCarrier] = useState("");

  function addPhoneNumber() {
    setReturnVal("Adding email...");
    console.log(emailInput + carrier);
    PhoneNumberAddRequest(emailInput + carrier)
    setInput("");
  }

  async function PhoneNumberAddRequest(emailAddress) {
    const request = await fetch("/api/addEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailAddress }),
    });
    setReturnVal(await request.text());
  }

  return (
    <div className="center">
      <h1>Welcome to Words of Christ!</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPhoneNumber();
          }}
        >
          <label>
            <input  value={emailInput} onInput={(e) => setInput(e.target.value)} type="tel" pattern="[0-9]{10}" placeholder="Enter your phone number here!" />
          </label>
          <select onChange={(e) => setCarrier(e.target.value)} className="form-select">
            <option value = "">Select Your Carrier</option>
            <option value="@Vtext.com">Verizon</option>
            <option value="@txt.att.net">AT&T</option>
            <option value="@tmomail.net">T-Mobile</option>
          </select>
          <button className="btn btn-primary" type="submit">
            press to add your phone number!
          </button>
        </form>
        <p id="emailResult">{returnVal}</p>
      </div>
    </div>
  );
}
