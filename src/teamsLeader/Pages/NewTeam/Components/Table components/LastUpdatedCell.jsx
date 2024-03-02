import React, { useEffect, useState } from "react";

const LastUpdatedCell = ({ rowId, setRows, rows }) => {
  const [lastUpdated, setLastUpdated] = useState("");

  // Calculate lastUpdated effect
  useEffect(() => {
    const calculateLastUpdated = () => {
      const now = new Date();
      const updatedTime = new Date(
        rows.find((row) => row.id === rowId)?.lastUpdated || now
      ); // Initialize to now if lastUpdated is not available

      const differenceInSeconds = Math.floor((now - updatedTime) / 1000);

      if (differenceInSeconds < 60) {
        setLastUpdated("Just now");
      } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        setLastUpdated(
          `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
        );
      } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        setLastUpdated(`${hours} ${hours === 1 ? "hour" : "hours"} ago`);
      } else {
        const days = Math.floor(differenceInSeconds / 86400);
        setLastUpdated(`${days} ${days === 1 ? "day" : "days"} ago`);
      }
    };

    calculateLastUpdated();
  }, [rows, rowId]);

  // Initialize lastUpdated in the row when mounting the component
  useEffect(() => {
    // Check if lastUpdated is already set before updating
    if (!rows.find((row) => row.id === rowId)?.lastUpdated) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === rowId
            ? {
                ...row,
                lastUpdated: new Date(),
              }
            : row
        )
      );
    }
  }, [rowId, setRows, rows]);

  return <div>{lastUpdated}</div>;
};

export default LastUpdatedCell;
