// import React, { useState } from "react";
// import { push, ref as databaseRef, set } from "firebase/database";
// import { database } from "../firebase";
// import StockList from "../components/StockList";

// const AddStock = ({ loggedInUser }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Save the post in Firebase
//     const stockListRef = databaseRef(database, "stock");
//     const newStockRef = push(stockListRef);

//     // Set stock data in the database
//     set(newStockRef, {
//       title: title,
//       description: description,
//       // authorEmail: loggedInUser?.email,
//     });

//     // Reset input fields after submitting
//     setTitle("");
//     setDescription("");
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <p>{loggedInUser ? loggedInUser.email : null}</p>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </label>
//         <br />
//         <input
//           type="submit"
//           value="Create Stock"
//           // Disable button when either title or description is empty
//           disabled={!title || !description}
//         />
//       </form>
//       <StockList />
//     </>
//   );
// };

// export default AddStock;
