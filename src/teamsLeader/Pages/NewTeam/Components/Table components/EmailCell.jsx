import { Popover } from "antd";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";

const EmailCell = ({ rowId, setRows, rows }) => {
  const [open, setOpen] = useState({});
  const [alternativeText, setAlternativeText] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const linkChange = (e) => {
    setLinkValue(e.target.value);
    if (!open[rowId] && alternativeText === "") {
      setAlternativeText(e.target.value);
    }
  };

  const alternativeTextChange = (e) => {
    setAlternativeText(e.target.value);
  };

  const handleOpenChange = (newOpen, rowId) => {
    setOpen({ ...open, [rowId]: newOpen });

    if (!newOpen) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === rowId
            ? { ...row, email: { email: linkValue, text: alternativeText } }
            : row
        )
      );
    }
  };
  const removeLink = (rowId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, email: { email: "", text: "" } } : row
      )
    );
  };
  const handleAnchorClick = (event) => {
    event.preventDefault();
    const emailAddress = rows.find((row) => row.id === rowId)?.email?.email;

    if (emailAddress) {
      const mailtoLink = `mailto:${emailAddress}`;

      window.open(mailtoLink);
    }
  };

  return (
    <Popover
      content={
        <div className="px-4 py-3" style={{ width: "265px" }}>
          <p className="m-1">Add email address</p>
          <Form.Control
            className="rounded-1 py-2 mb-4 shadow-none workspace_searchInput transparent_bg"
            value={linkValue || ""}
            onChange={(e) => linkChange(e)}
            placeholder="user@example.com"
            type="text"
          />
          <p className="m-1">Add text to display </p>
          <Form.Control
            className="rounded-1 py-2 mb-4 shadow-none workspace_searchInput transparent_bg h-100"
            onChange={(e) => alternativeTextChange(e)}
            type="text"
            value={alternativeText || ""}
            placeholder="(Optional)"
          />
        </div>
      }
      trigger="click"
      placement="bottom"
      open={open[rowId]}
      onOpenChange={(newOpen) => handleOpenChange(newOpen, rowId)}
    >
      <span
        className="flex align-items-center  justify-content-center w-100"
        style={{ height: "43px", padding: "10px 0px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          className="px-3"
          style={{ color: "#0086c0", marginRight: !isHovered ? "14px" : "0px" }}
          onClick={(event) => {
            event.stopPropagation();
            handleAnchorClick(event);
          }}
        >
          {rows.find((row) => row.id === rowId)?.email?.text
            ? rows.find((row) => row.id === rowId)?.email?.text
            : rows.find((row) => row.id === rowId)?.email?.email}
        </a>

        {(rows.find((row) => row.id === rowId)?.email?.text ||
          rows.find((row) => row.id === rowId)?.email?.email) &&
          isHovered && (
            <button
              className="px-0 py-0 file_deleteBtn flex  close-icon"
              onClick={(event) => {
                event.stopPropagation();
                removeLink(rowId);
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
    </Popover>
  );
};

export default EmailCell;
