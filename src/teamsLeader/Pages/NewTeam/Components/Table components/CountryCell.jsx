import React, { useState, useEffect } from "react";
import { Input, Popover, Spin } from "antd";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Form } from "react-bootstrap";

const CountrySearch = ({ rowId, setRows, rows }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Fetch countries from an API
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const fetchFlag = (countryCode) => {
    try {
      return `https://flagcdn.com/h120/${countryCode.toLowerCase()}.png`;
    } catch (error) {
      console.error("Error fetching flag:", error);
      return null;
    }
  };

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  const handleCountryClick = (country) => {
    const flag = fetchFlag(country.cca2);
    setSelectedCountry({ ...country, flag });
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? { ...row, country: { name: country.name.common, flag: flag } }
          : row
      )
    );
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCountry(null); // Clear the selected country when input changes
  };
  const clearCell = (rowId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, country: { name: "", flag: "" } } : row
      )
    );
  };
  const content = (
    <div>
      {loading ? (
        <Spin size="small" />
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: "12px 0px",
            margin: 0,
            maxHeight: "150px",
            overflow: "hidden",
            width: "177px",
          }}
        >
          {filteredCountries.map((country) => (
            <li
              key={country.cca2}
              onClick={() => handleCountryClick(country)}
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  const handleOpenChange = (newOpen) => {
    setOpen({ ...open, [rowId]: newOpen });
  };
  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottom"
      open={open[rowId]}
      onOpenChange={(newOpen) => handleOpenChange(newOpen, rowId)}
    >
      <div
        className={`w-100 h-100  flex  justify-content-center ${
          !isHovered ? "margin1px" : "border"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          style={{ height: "25px", width: "100%" }}
          className=" flex align-items-center justify-content-center ps-2"
        >
          {selectedCountry &&
            rows.find((row) => row.id === rowId)?.country?.flag && (
              <img
                src={rows.find((row) => row.id === rowId)?.country?.flag}
                alt={`${selectedCountry.name.common} Flag`}
                style={{ height: "20px", width: "25px", marginRight: "5px" }}
              />
            )}
          <Form.Control
            style={{
              width: "75px",
              height: "25px",
            }}
            className="rounded-1 py-1 px-0 shadow-none border-0 transparent_bg fs_14"
            value={
              selectedCountry
                ? rows.find((row) => row.id === rowId)?.country?.name
                : searchTerm
            }
            onChange={handleInputChange}
            placeholder=""
            type="text"
          />
          <span style={{ width: "14px", marginLeft: "3px" }}>
            {rows.find((row) => row.id === rowId)?.country?.name &&
              isHovered && (
                <button
                  className="px-0 py-0  file_deleteBtn flex  close-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    clearCell(rowId);
                  }}
                >
                  <RxCross2
                    className=""
                    style={{
                      width: "14px",
                      height: "auto",
                    }}
                  />
                </button>
              )}
          </span>
        </span>
      </div>
    </Popover>
  );
};

export default CountrySearch;
