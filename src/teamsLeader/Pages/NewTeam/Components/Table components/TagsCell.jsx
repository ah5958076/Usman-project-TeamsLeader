import { Button, Popover } from "antd";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineHashtag } from "react-icons/hi";

const TagsCell = ({ rowId, setRows, rows }) => {
  const [inputText, setInputText] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Check if the value already starts with #
    if (!value.startsWith("#")) {
      value = `#${value}`;
    }

    setInputText(value);
  };

  const handleFocus = () => {
    setIsInputActive(true);
    const row = rows.find((row) => row.id === rowId);
    if (row) {
      setInputText(row?.tag?.text || "");
    }
    setIsInputActive(true);
  };

  const handleSaveClick = () => {
    const randomColor = getRandomColor();
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? { ...row, tag: { text: inputText, color: randomColor } }
          : row
      )
    );
    setIsInputActive(false);
  };

  return (
    <>
      <div style={{ maxWidth: "100%" }} className="flex justify-content-center">
        <InputGroup
          style={{ height: "27px", justifyContent: "center", display: "flex" }}
        >
          <input
            style={{
              color: rows.find((row) => row.id === rowId)?.tag?.color,
              width: "130px",
            }}
            value={inputText}
            onChange={handleInputChange}
            onFocus={handleFocus}
            // onBlur={() => setIsInputActive(false)}
            placeholder=" "
            className={`py-1 border shadow-none workspace_searchInput text-center tag_input transparent_bg h-100 rounded-start-2 fw-normal ${
              isInputActive ? "border" : "border-0"
            }`}
          />

          {isInputActive && (
            <InputGroup.Text
              onClick={() => handleSaveClick()}
              style={{
                height: "27px",
                backgroundColor: "#00854d",
                padding: "8px 8px 9px",
                color: "white",
                border: "1px solid #00854d",
                cursor: "pointer",
              }}
              className=""
            >
              +
            </InputGroup.Text>
          )}
        </InputGroup>
      </div>
    </>
  );
};

export default TagsCell;

{
  /* {rows.find((row) => row.id === rowId)?.tag && (
          <p style={{ color: "#0086C0", cursor: "pointer", margin: 0 }}>
            {rows.find((row) => row.id === rowId)?.tag}
          </p>
        )} */
}

{
  /* <p className="mt-3 mb-0 fw-bold">Tags</p>
      {tags.map((tag) => (
        <Button
          onClick={() => handleSelectTag(tag.text)}
          style={{ color: "#0086C0" }}
          className="fs_14 ps-2  border-0 w-100 tagBtn text-start removeFocus"
        >
          {tag.text}
        </Button>
      ))} */
}

// setDisplayText(updatedText);
// const newTag = { text: updatedText, id: uuidv4() };
// setTags([...tags, newTag]);

// setInputText("");

// const [tags, setTags] = useState([
//   { text: "#task", id: uuidv4() },
//   { text: "#new", id: uuidv4() },
//   { text: "#abc", id: uuidv4() },
// ]);
// const [open, setOpen] = useState(false);

// const handleOpenChange = (newOpen) => {
//   setOpen({ ...open, [rowId]: newOpen });
// };
// const handleSelectTag = (tagText) => {
//   setRows((prevRows) =>
//     prevRows.map((row) => (row.id === rowId ? { ...row, tag: tagText } : row))
//   );
//   setOpen(false);
// };
{
  /* <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex align-items-center justify-content-center "
        style={{ height: "25px" }}
      >
        {!rows.find((row) => row.id === rowId)?.tag && (
          <span
            className="flex align-items-center "
            style={{
              width: "39px",
              maxWidth: "100%",
            }}
          >
            {isHovered && (
              <>
                <button
                  className="px-0 py-0  file_deleteBtn file_addBtn  "
                  style={{}}
                >
                  <AiOutlinePlus
                    className="mb-1"
                    style={{
                      width: "14px",
                      height: "auto",
                    }}
                  />
                </button>
                <HiOutlineHashtag className="text-secondary fs-5" />
              </>
            )}
          </span>
        )}
      </div> */
}
