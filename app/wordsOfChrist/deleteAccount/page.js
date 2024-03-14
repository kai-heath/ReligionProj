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
import { output } from "../../../next.config";
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
 
  const token = searchParams.get('token')
  return (
    <div className="center">
      <h1>Welcome to Words of Christ!</h1>
      <div>
        the number: {token} has successfully been removed from our database!
      </div>
    </div>
  );
}
