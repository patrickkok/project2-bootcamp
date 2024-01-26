import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ref as databaseRef, get, child, onValue } from "firebase/database";
import { database } from "../firebase";
import { off } from "firebase/database";

const PieChart = () => {
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

  // Initialize chartData inside useEffect
  const [chartData, setChartData] = useState({ series1: [], options: {} });

  useEffect(() => {
    // Convert string values to numbers
    const amountInvested = parseFloat(accountData?.amountInvested) || 0;
    const cash = parseFloat(accountData?.cash) || 0;
    const portfolioValue = parseFloat(accountData?.portfolioValue) || 0;

    // Set chart data after fetching account data
    setChartData({
      series1: [amountInvested, cash, portfolioValue],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Investment", "Cash", "Portfolio"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    });
  }, [accountData]);


  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series1}
        className="mt-4 p-3 border rounded shadow bg-light mx-2"
        type="pie"
        width={480}
      />
    </div>
  );
};

export default PieChart;
