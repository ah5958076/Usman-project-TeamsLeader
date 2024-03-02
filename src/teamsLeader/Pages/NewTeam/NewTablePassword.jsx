import React, { useEffect, useRef, useState } from "react";
import OfCanvasPassword from "./Components/OfCanvasPassword";
import {
  Table,
  Form,
  Button,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRoundedAdd, BiChevronDown } from "react-icons/bi";
import AddColumnModal from "./Components/addColumnModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useStateContext } from "../../../contexts/ContextProvider";
import { MdContentCopy } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";

const NewTablePassword = ({
  selectAll,
  handleSelectAll,
  handleShow,
  hoveredRow,
  handleMouseEnter,
  handleMouseLeave,
  rowOptionMenu,
  handleDeleteRow,
  moveRowToTop,
  duplicateRow,
  editedItemId,
  editedItemValue,
  setEditedItemValue,
  handleItemEditEnd,
  handleItemEditStart,
  newItemInput,
  setNewItemInput,
  handleKeyPress,
  show,
  handleClose,
  setSelectedButton,
  addColumn,
  rows,
  passColumns,
}) => {
  const { rowsPassword, setRowsPassword } = useStateContext();

  const [tableHiddenPassword, setTableHiddenPassword] = useState(true);
  const [iconRotationPassword, setIconRotationPassword] = useState(0);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  const closeCanvasPassword = () => setShowCanvasPassword(false);
  const toggleCanvasPassword = () => setShowCanvasPassword((s) => !s);

  const labelModalRef = useRef();

  const [tablePasswordData, setTablePasswordData] = useState([
    {
      item: "Project1",
      person: 30,
      status: "Services",
      date: "",
      id: "1",
      selected: false,
    },
    {
      item: "Project2",
      person: 30,
      status: "Soft",
      date: "",
      id: "2",
      selected: false,
    },
    {
      item: "Project3",
      person: 30,
      status: "Projects",
      date: "",
      id: "3",
      selected: false,
    },
  ]);

  const handleToggleTablePassword = () => {
    setTableHiddenPassword(!tableHiddenPassword);
    setIconRotationPassword(iconRotationPassword === 0 ? 270 : 0);
  };

  const togglePassword = (id) => {
    setRowsPassword((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, showPassword: !row.showPassword } : row
      )
    );
  };

  const copyPassword = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log("Password copied to clipboard");
        setPasswordCopied(true);

        // Reset the copied status after a few seconds
        setTimeout(() => {
          setPasswordCopied(false);
        }, 1000); // Adjust the duration as needed
      })
      .catch((err) => {
        console.error("Unable to copy password", err);
      });
  };
  const iconStylePassword = {
    transform: `rotate(${iconRotationPassword}deg)`,
  };

  const handleRowSelectPassword = (id) => {
    const updatedTableData = rowsPassword.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setRowsPassword(updatedTableData);
  };
  return (
    <>
      {tableHiddenPassword && (
        <div className="flex ms-2 ps-4">
          <h6
            onClick={handleToggleTablePassword}
            className="fw-bold"
            style={{ color: "rgb(87, 155, 252)", cursor: "pointer" }}
          >
            <BiChevronDown style={iconStylePassword} className="fs-4" />{" "}
            Passwords
          </h6>
        </div>
      )}
      <div>
        {!tableHiddenPassword && (
          <div className="px-4">
            <Table responsive bordered hover className="">
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th className="text-center px-1">
                    <div className="text-start ms-2">
                      <h6
                        onClick={handleToggleTablePassword}
                        className="fw-bold m-0"
                        style={{
                          color: "rgb(87, 155, 252)",
                          cursor: "pointer",
                        }}
                      >
                        <BiChevronDown
                          style={iconStylePassword}
                          className="fs-4"
                        />
                        Passwords
                      </h6>
                      <p className="m-0 ps-4 ms-2 secondary_clr fs_14">
                        {tablePasswordData.length} Project
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
            </Table>
          </div>
        )}
        {tableHiddenPassword && (
          <div className="px-4 position-relative ">
            <Table responsive bordered hover className="border-bottom-0">
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th colSpan={2}>Project</th>

                  {passColumns.slice(3).map((column) => (
                    <th key={column.id}>{column.name}</th>
                  ))}
                  <th className="text-center ">
                    <Button
                      className="px-1 py-0 workspace_menuBtn bgHover  text-center mx-1"
                      style={{
                        width: "25px",
                        height: "25px",
                        verticalAlign: "middle",
                      }}
                      onClick={handleShow}
                    >
                      <FiPlus className=" fs-6 mt-1 " />
                    </Button>
                  </th>
                </tr>
              </thead>

              <tbody className="rounded-end rounded-2 overflow-hidden">
                {rowsPassword.map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => handleMouseEnter(row.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className="text-center " key={passColumns[0].id}>
                      <span className="position-absolute tr_optionBtn p-2 ">
                        <Dropdown>
                          <Dropdown.Toggle
                            className={` ${
                              hoveredRow === row.id ? "" : "disply_none"
                            } px-1 py-0 workspace_menuBtn bgHover  text-center mx-1 focusClass`}
                            style={{
                              width: "25px",
                              height: "25px",
                              verticalAlign: "middle",
                            }}
                          >
                            <BsThreeDots className=" fs-6 align-middle " />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="tr_optionDropdown">
                            {rowOptionMenu.map((item, index) => (
                              <Dropdown.Item key={index} href="#" className="">
                                <Button
                                  onClick={() => {
                                    if (item.option === "Delete") {
                                      handleDeleteRow(hoveredRow);
                                    } else if (item.option === "Move to top") {
                                      moveRowToTop(hoveredRow);
                                    } else if (item.option === "Duplicate") {
                                      duplicateRow(hoveredRow);
                                    }
                                    handleMouseLeave();
                                  }}
                                  className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                                  style={{
                                    height: "34px",
                                  }}
                                >
                                  <span>
                                    {item.icon}
                                    {item.option}
                                  </span>
                                </Button>
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </span>
                      <Form.Check
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleRowSelectPassword(row.id)}
                      />
                    </td>
                    <td key={passColumns[1].id} className="text-center">
                      {editedItemId === row.id ? (
                        <div style={{ marginLeft: "11px" }}>
                          <Form.Control
                            type="text"
                            value={editedItemValue}
                            onChange={(e) => setEditedItemValue(e.target.value)}
                            onBlur={handleItemEditEnd}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleItemEditEnd();
                              }
                            }}
                            className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 w-100 text-center"
                          />
                        </div>
                      ) : (
                        <div
                          onMouseEnter={() =>
                            handleItemEditStart(row.id, row.task)
                          }
                          className="editable-item ps-4 pt-1 text-center"
                        >
                          {row.task}
                        </div>
                      )}
                    </td>
                    <td key={passColumns[2].id}>
                      <BiMessageRoundedAdd
                        onClick={toggleCanvasPassword}
                        className="align-bottom"
                      />
                    </td>

                    {/* =======================Password Column======================== */}
                    <td key={passColumns[3].id} style={{ width: "50%" }}>
                      <div
                        key={row.id}
                        className="password-wrapper"
                        style={{ width: "50%" }}
                      >
                        <Form.Control
                          type={row.showPassword ? "text" : "password"}
                          value={row.password}
                          readOnly
                          className="password-input"
                          style={{
                            border: "none !important",
                            outline: "none !important",
                          }}
                        />
                        <div className="password-icon-wrappper">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`eye-tooltip-${row.id}`}>
                                Toggle Password
                              </Tooltip>
                            }
                          >
                            <span
                              className="password-icon"
                              onClick={() => togglePassword(row.id)}
                            >
                              {row.showPassword ? (
                                <FaEyeSlash className="passIcon" />
                              ) : (
                                <FaEye className="passIcon" />
                              )}
                            </span>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`copy-tooltip-${row.id}`}>
                                {passwordCopied
                                  ? "Password Copied!"
                                  : "Copy Password"}
                              </Tooltip>
                            }
                          >
                            <span
                              className="password-icon"
                              onClick={() => copyPassword(row.password)}
                            >
                              <MdContentCopy className="passIcon" />
                            </span>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </td>

                    <td key={passColumns[3].id}>
                      <div key={row.id} className="password_url w-100">
                        <a href={row.url.link} target="_blank" className="">
                          {/* {row.url.text} */}
                          <LuExternalLink className="password_link" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className="text-center">
                    <Form.Check type="checkbox" disabled />
                  </td>
                  <td colSpan="40" className=" py-1">
                    <Form.Control
                      type="text"
                      value={newItemInput}
                      onChange={(e) => setNewItemInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="+ Add Project"
                      className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 "
                    />
                  </td>
                </tr>
                <tr className="border-bottom-0 action_tr">
                  <td className="transparent_border"></td>
                  <td className="transparent_border"></td>
                  <td className="transparent_border border-end"></td>
                  {passColumns.slice(2).map((column) => (
                    <td
                      key={column.id}
                      className="border"
                      style={{ height: "36px" }}
                    >
                      {column.name === "Vote" ? (
                        <p className="m-0 fw-bold">
                          Total votes:{" "}
                          {rows.filter((row) => row.vote === true).length}
                        </p>
                      ) : (
                        ""
                      )}
                    </td>
                  ))}
                  <td className="border"></td>
                </tr>
              </tbody>
            </Table>
            {show && (
              <AddColumnModal
                handleClose={handleClose}
                setSelectedButton={setSelectedButton}
                show={show}
                addColumn={addColumn}
              />
            )}
          </div>
        )}
      </div>
      <OfCanvasPassword
        show={showCanvasPassword}
        handleClose={closeCanvasPassword}
      />
    </>
  );
};

export default NewTablePassword;
