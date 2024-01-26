import React, { useState, useEffect } from "react";
import { ref as databaseRef, set, get, child } from "firebase/database";
import { database } from "../firebase";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const UpdateAccountData = ({ loggedInUser }) => {
  const [existingData, setExistingData] = useState({
    amountInvested: "",
    cash: "",
    portfolioValue: "",
  });
  const navigate=useNavigate()

  useEffect(() => {
    // Fetch existing account data from Firebase when the component mounts
  const accountDataRef = child(databaseRef(database, "accountData"), "latest");

    get(accountDataRef)
      .then((snapshot) => {
        if (snapshot?.exists()) {
          const data = snapshot?.val();
          setExistingData({
            amountInvested: data?.amountInvested || "",
            cash: data?.cash || "",
            portfolioValue: data?.portfolioValue || "",
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error getting account data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const accountDataRef = child(databaseRef(database, "accountData"), "latest");
  
    set(accountDataRef, {
      amountInvested: existingData?.amountInvested,
      cash: existingData?.cash,
      portfolioValue: existingData?.portfolioValue,
      // authorEmail: loggedInUser?.email,
    });
    
   navigate("/dash");
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExistingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
    <Navbar />
    <div className="container mt-5 pt-5">
      <form onSubmit={handleSubmit}>
        <p>{loggedInUser ? loggedInUser.email : null}</p>
        <div className="mb-3 row">
          <label htmlFor="amountInvested" className="col-sm-3 col-form-label">
            Amount Invested:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="amountInvested"
              name="amountInvested"
              value={existingData.amountInvested}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="cash" className="col-sm-3 col-form-label">
            Cash:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="cash"
              name="cash"
              value={existingData.cash}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="portfolioValue" className="col-sm-3 col-form-label">
            Portfolio Value:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="portfolioValue"
              name="portfolioValue"
              value={existingData.portfolioValue}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Account Data
        </button>
      </form>
    </div>
  </>
  );
};

export default UpdateAccountData;
