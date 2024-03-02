// import React, { useState } from "react";
// import { Form } from "react-bootstrap";
// import { HiCheck } from "react-icons/hi";

// const TableWithProgressBar = () => {
//   const [data, setData] = useState([
//     { id: 1, isChecked: false },
//     { id: 2, isChecked: false },
//     { id: 3, isChecked: false },
//     // Add more rows as needed
//   ]);

//   const handleCheckboxChange = (id) => {
//     const updatedData = data.map((row) =>
//       row.id === id ? { ...row, isChecked: !row.isChecked } : row
//     );

//     setData(updatedData);
//   };

//   const calculateProgress = () => {
//     const checkedCount = data.filter((row) => row.isChecked).length;
//     const totalCount = data.length;

//     return checkedCount > 0 ? 100 / checkedCount : 0;
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Checkbox & Progress</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr key={row.id}>
//               <td>{row.id}</td>
//               <td >
//                 {/* <Form.Check
//                   type="checkbox"
//                   id={`checkbox-${row.id}`}
//                   className="round-checkbox rounded-" // Apply additional styles if needed
//                   checked={row.isChecked}
//                   onChange={() => handleCheckboxChange(row.id)}
//                 /> */}
//                 <div className="flex">

//                 <span
//                   className="rounded-circle vote_check"
//                   style={{
//                     width: "24px",
//                     height: "24px",
//                     backgroundColor: "",
//                   }}
//                   onClick={() => handleCheckboxChange(row.id)}
//                 >
// <HiCheck className={` ${}`} />

//                 </span>

//                 <span
//                   style={{
//                     display: "block",
//                     width: `${calculateProgress()}%`,
//                     height: "10px",
//                     backgroundColor: "green",
//                   }}
//                 >
//                   {" "}
//                 </span>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableWithProgressBar;

import React from "react";
import { HiCheck } from "react-icons/hi";

const VoteCell = ({ rowId, setRows, rows }) => {
  const handleCheckboxClick = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, vote: !row.vote } : row
      )
    );
  };
  const calculateProgress = () => {
    if (rows && rows.length > 0) {
      const checkedVotes = rows.filter((row) => row.vote).length;
      return checkedVotes > 0 ? 100 / checkedVotes : 0;
    }
    return 0;
  };

  return (
    <div className="flex">
      <span
        className="rounded-circle vote_check me-2 flex align-items-center text-white"
        style={{
          minWidth: "24px",
          height: "24px",
          border: rows?.find((row) => row.id === rowId)?.vote
            ? "2px solid #0086c0"
            : "2px solid #c4e0ec",
          backgroundColor: rows?.find((row) => row.id === rowId)?.vote
            ? "#0086c0"
            : "",
        }}
        onClick={handleCheckboxClick}
      >
        <HiCheck
          className={`fs-5 ${
            rows?.find((row) => row.id === rowId)?.vote ? "" : "d-none"
          }`}
        />
      </span>

      <div
        className=""
        style={{
          backgroundColor: "#c4e0ec",
          minWidth: "120px",
          height: "26px",
        }}
      >
        <span
          style={{
            display: "block",
            width: `${calculateProgress()}%`,
            height: "26px",
            backgroundColor: rows?.find((row) => row.id === rowId)?.vote
              ? "#0086c0"
              : "",
            transition: "width 0.2s ease-in-out",
          }}
        ></span>
      </div>
    </div>
  );
};

export default VoteCell;
