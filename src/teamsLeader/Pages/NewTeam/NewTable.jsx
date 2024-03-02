import React, { useEffect, useRef, useState } from "react";

import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRoundedAdd, BiChevronDown } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Popover } from "antd";
import LabelSelectionModal from "./Components/LabelSelectionModal";
import AddColumnModal from "./Components/addColumnModal";

const NewTable = ({
  tableHidden,
  handleToggleTable,
  tableData,
  columns,
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
  handleRowSelect,
  editedItemId,
  editedItemValue,
  setEditedItemValue,
  handleItemEditEnd,
  handleItemEditStart,
  toggleCanvas,
  status,
  setStatus,
  statusModal,
  handleOpenChange,
  renderComponentForColumn,
  newItemInput,
  setNewItemInput,
  handleKeyPress,
  show,
  handleClose,
  setSelectedButton,
  addColumn,
  iconStyle,
  rows,
  setTableData,
  handleStatusSelection,
}) => {
  // Add your existing table code here, replacing the existing rows and logic with props.
  const labelModalRef = useRef();
  return (
    <>
      {tableHidden && (
        <div className="flex ms-2 ps-4">
          <h6
            onClick={handleToggleTable}
            className="fw-bold"
            style={{
              color: "rgb(87, 155, 252)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BiChevronDown style={iconStyle} className="fs-4" /> Group Title
          </h6>
        </div>
      )}
      <div>
        {!tableHidden && (
          <div className="px-4">
            <Table responsive bordered hover className="">
              <thead className="rounded-top rounded-2 overflow-hidden">
                <tr>
                  <th className="text-center px-1">
                    <div
                      className="text-start ms-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h6
                        onClick={handleToggleTable}
                        className="fw-bold m-0 "
                        style={{
                          color: "rgb(87, 155, 252)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BiChevronDown style={iconStyle} className="fs-4" />{" "}
                        Group Title
                      </h6>
                      <p className="m-0 ps-4 ms-2 secondary_clr fs_14">
                        {tableData.length} Items
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
            </Table>
          </div>
        )}
        {tableHidden && (
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
                  <th
                    colSpan={2}
                    // style={{ maxWidth: "360px", position: "sticky", left: 0 }}
                  >
                    Items
                  </th>
                  {columns.slice(2).map((column) => (
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
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => handleMouseEnter(row.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className="text-center " key={columns[0].id}>
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
                        onChange={() => handleRowSelect(row.id)}
                      />
                    </td>
                    <td key={columns[1].id} className="text-start">
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
                            className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 "
                          />
                        </div>
                      ) : (
                        <div
                          onMouseEnter={() =>
                            handleItemEditStart(row.id, row.task)
                          }
                          className="editable-item ps-4 pt-1"
                        >
                          {row.task}
                        </div>
                      )}
                    </td>
                    <td key={columns[2].id}>
                      <BiMessageRoundedAdd
                        onClick={toggleCanvas}
                        className="align-bottom"
                      />
                    </td>

                    <td key={columns[3].id}>
                      <RxAvatar className="align-bottom" />
                    </td>
                    <Popover
                      key={row.id}
                      content={
                        <LabelSelectionModal
                          labels={status}
                          setLabels={setStatus}
                          labelModalRef={labelModalRef}
                          handleSelection={handleStatusSelection}
                        />
                      }
                      trigger="click"
                      open={statusModal[row.id]}
                      onOpenChange={(newOpen) =>
                        handleOpenChange(row.id, columns[4].id, newOpen)
                      }
                    >
                      <td key={columns[4].id} className="text-center p-0 flex">
                        <span
                          className="statusSpan w-100"
                          style={{
                            backgroundColor: row.status.backgroundColor,
                          }}
                        >
                          {row.status.text}
                        </span>
                      </td>
                    </Popover>
                    <td key={columns[5]?.id}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker />
                      </LocalizationProvider>
                    </td>

                    {columns.slice(5).map((column) => (
                      <td
                        key={column.id}
                        className={`${
                          column.name === "Priority" ||
                          column.name === "Label" ||
                          column.name === "Link" ||
                          column.name === "Email" ||
                          column.name === "World Clock"
                            ? "p-0"
                            : ""
                        }    `}
                      >
                        {renderComponentForColumn(column.id, row.id)}
                      </td>
                    ))}
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
                      placeholder="+ Add item"
                      className=" py-0 shadow-none workspace_searchInput add_itemInput transparent_bg h-100 "
                    />
                  </td>
                </tr>
                <tr className="border-bottom-0 action_tr">
                  <td className="transparent_border"></td>
                  <td className="transparent_border"></td>
                  <td className="transparent_border border-end"></td>
                  {columns.slice(2).map((column) => (
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
    </>
  );
};

export default NewTable;
