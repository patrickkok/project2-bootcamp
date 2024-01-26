import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ref as databaseRef, get, child, onValue } from "firebase/database";
import { database } from "../firebase";
import { off } from "firebase/database";

const Accountsummary = () => {
  const [accountData, setAccountData] = useState({
    amountInvested: 0,
    cash: 0,
    portfolioValue: 0,
  });

  useEffect(() => {
    // Fetch account data from Firebase
    const accountDataRef = databaseRef(database, "accountData");

    const fetchData = async () => {
      try {
        const snapshot = await get(child(accountDataRef, "latest"));
        if (snapshot.exists()) {
          setAccountData(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error getting account data:", error);
      }
    };

    fetchData();

    // Listen for changes and update the state accordingly
    const onDataChange = (snapshot) => {
      if (snapshot.exists()) {
        setAccountData(snapshot.val());
      } else {
        console.log("No data available");
      }
    };

    const dataRef = child(accountDataRef, "latest");
    onValue(dataRef, onDataChange);

    return () => {
      // Cleanup the event listener when the component unmounts
      off(dataRef, onDataChange);
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <Container className="mt-4">
      <Row className="gx-1">
        <Col>
          <div className="d-flex align-items-center p-3 bg-primary text-white">
            <span className="me-2 fw-bold">Amount Invested:</span>
            <span>{accountData.amountInvested}</span>
          </div>
        </Col>
        <Col>
          <div className="d-flex align-items-center p-3 bg-success text-white">
            <span className="me-2 fw-bold">Cash:</span>
            <span>{accountData.cash}</span>
          </div>
        </Col>
        <Col>
          <div className="d-flex align-items-center p-3 bg-danger text-white">
            <span className="me-2 fw-bold">Portfolio Value:</span>
            <span>{accountData.portfolioValue}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Accountsummary;