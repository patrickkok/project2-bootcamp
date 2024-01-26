// import React, { useEffect, useState } from "react";
// import { onValue, ref as databaseRef, remove } from "firebase/database";
// import { database } from "../firebase";
// import { Table } from "react-bootstrap";
// const WatchLists = () => {
//   const [watchData, setWatchlistData] = useState([]);

//   useEffect(() => {
//     const stockListRef = databaseRef(database, "stock");
//     const unsubscribe = onValue(stockListRef, (snapshot) => {
//       const stockArray = [];
//       snapshot.forEach((childSnapshot) => {
//         const stockItem = {
//           id: childSnapshot.key,
//           ...childSnapshot.val(),
//         };
//         stockArray.push(stockItem);
//       });
//       setWatchlistData(stockArray);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleDelete = (id) => {
//     const stockItemRef = databaseRef(database, `stock/${id}`);
//     remove(stockItemRef);
//   };

//   return (
//     <div>
//       <h2>Watchlist</h2>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>

//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {watchData?.map((stockItem) => (
//             <tr key={stockItem.id}>
//               <td>{stockItem.title}</td>
//               <td>{stockItem.description}</td>

//               <td>

//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="red"
//                   className="w-3 h-3"
//                   style={{
//                     width: "25px",
//                     height: "25px",
//                   }}
//                   onClick={() => handleDelete(stockItem.id)}
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                   />
//                 </svg>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default WatchLists;
// Import necessary libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const WatchLists = () => {
  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState(null);

  const getAlphaVantageData = async (symbol) => {
    const apiKey = "HYYWPKPI7YSU0TXJ"; // Replace with your Alpha Vantage API key

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      const monthlyData = data?.["Monthly Adjusted Time Series"];

      if (monthlyData) {
        // Extract relevant data for the table
        const latestMonth = Object.entries(monthlyData).slice(0, 1);
        const latestData = latestMonth[0]?.[1];

        const newData = {
          symbol,
          open: latestData["1. open"],
          high: latestData["2. high"],
          low: latestData["3. low"],
          close: latestData["4. close"],
          volume: latestData["6. volume"],
        };

        setCompanyData((prevData) => [...prevData, newData]);
      }
    } catch (error) {
      console.error(error);
      setError(`Failed to fetch data for ${symbol}`);
    }
  };

  useEffect(() => {
    // Call the API for each company
    getAlphaVantageData("AMZN");
    getAlphaVantageData("IBM");
    getAlphaVantageData("FB");
    getAlphaVantageData("INTC");
    getAlphaVantageData("NFLX");
    getAlphaVantageData("KO");
    getAlphaVantageData("PG");
    getAlphaVantageData("XOM");
    // Add more companies as needed
  }, []);

  return (
    <>
       <div className="mt-4 p-4 border rounded shadow bg-light">
        WatchList
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-bordered border-none table-responsive">
        <thead className="table-primary">
          <tr>
            <th>Company</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {companyData.map((row, index) => (
            <tr key={index}>
              <td className="text-start font-weight-bold">{row.symbol}</td>
              <td>{row.open}</td>
              <td>
                <span  className="bg-success text-white rounded p-1 d-flex justify-content-center align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                    />
                  </svg>
                  {row.high}
                </span>
              </td>
              <td>
                <span className="bg-danger text-white rounded p-1 d-flex justify-content-center align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                    />
                  </svg>
                  {row.low}
                </span>
              </td>
              <td>{row.close}</td>
              <td>{row.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default WatchLists;
