import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const LineGraph = () => {
  const [options] = useState({
    // your existing options
  });

  const [series, setSeries] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("TSLA"); // Default selected company

  const getAlphaVantageData = async () => {
    const apiKey = "HYYWPKPI7YSU0TXJ"; // Replace with your Alpha Vantage API key

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${selectedCompany}&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      console.log(response?.data);

      const monthlyData = response?.data?.["Monthly Adjusted Time Series"];

      // Extract relevant data for the graph
      const extractedData = Object.entries(monthlyData)
        .slice(0, 6) // Get only the last six months
        .map(([date, item]) => ({
          x: new Date(date).toLocaleDateString("en-US", { month: "long" }), // Format month name
          y: parseFloat(item["5. adjusted close"]), // Adjusted close price as a floating-point number
        }));

      setSeries([
        {
          name: "Adjusted Close Price",
          data: extractedData,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  useEffect(() => {
    getAlphaVantageData();
  }, [selectedCompany]); // Trigger the effect when the selectedCompany changes

  return (
    <div>
     <div className="mt-4 p-3 border rounded shadow bg-light">
      <div className="d-flex align-items-center">
        <label htmlFor="companySelect" className="fw-bold me-2">
          Select Company:
        </label>
        <select
          id="companySelect"
          value={selectedCompany}
          onChange={handleCompanyChange}
          className="form-select"
        >
          <option value="TSLA">Tesla (TSLA)</option>
          <option value="AAPL">Apple (AAPL)</option>
          <option value="MSFT">Microsoft (MSFT)</option>
        </select>
      </div>
      <div className="fw-bold ">Performance over the past 6 months</div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
          // className="mt-4 p-3 border rounded shadow bg-light "
        />
      </div>
    </div>
    </div>
  );
};

export default LineGraph;
