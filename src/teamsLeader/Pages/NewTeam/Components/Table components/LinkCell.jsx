import { Popover } from "antd";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";

const LinkCell = ({ rowId, setRows, rows }) => {
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
            ? { ...row, link: { link: linkValue, text: alternativeText } }
            : row
        )
      );
    }
  };
  const removeLink = (rowId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, link: { link: "", text: "" } } : row
      )
    );
  };
  const handleAnchorClick = (event) => {
    event.preventDefault();
    const websiteLink = rows.find((row) => row.id === rowId)?.link?.link;

    if (websiteLink) {
      // Check if the URL starts with a protocol, if not, prepend "http://"
      const formattedLink = websiteLink.startsWith("http")
        ? websiteLink
        : `http://${websiteLink}`;

      window.open(formattedLink, "_blank");
    }
  };
  return (
    <Popover
      content={
        <div className="px-4 py-3" style={{ width: "265px" }}>
          <h5 className="m-2">Link</h5>
          <p className="m-1">Write or paste a link</p>
          <Form.Control
            className="rounded-1 py-2 mb-4 shadow-none workspace_searchInput transparent_bg"
            value={linkValue || ""}
            onChange={(e) => linkChange(e)}
            placeholder="www.example.com"
            type="text"
          />
          <p className="m-1">Text to display </p>
          <Form.Control
            className="rounded-1 py-2 mb-4 shadow-none workspace_searchInput transparent_bg h-100"
            onChange={(e) => alternativeTextChange(e)}
            type="text"
            value={alternativeText || ""}
            placeholder="Example text"
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
          {rows.find((row) => row.id === rowId)?.link?.text
            ? rows.find((row) => row.id === rowId)?.link?.text
            : rows.find((row) => row.id === rowId)?.link?.link}
        </a>

        {(rows.find((row) => row.id === rowId)?.link?.text ||
          rows.find((row) => row.id === rowId)?.link?.link) &&
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

export default LinkCell;
