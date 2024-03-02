import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from "@mui/material/Tooltip";
import { v4 as uuidv4 } from "uuid";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import TimelineCell from "../Table components/TimelineCell";
import ViewTimelineOutlinedIcon from "@mui/icons-material/ViewTimelineOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import PeopleCell from "../Table components/PeopleCell";
import { RxAvatar, RxMagnifyingGlass } from "react-icons/rx";
 import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useStateContext } from "../../../../../contexts/ContextProvider";

const convertData = (inputData) => {
  const initialData = {
    tasks: {},
    columns: {},
    columnOrder: [],
  };

  inputData.forEach((row) => {
    const taskId = `task-${row.id}`;
    const columnId = row.status.text.toLowerCase();

    // Update tasks object
    initialData.tasks[taskId] = { id: taskId, title: row.task };

    // Update columns object
    if (!initialData.columns[columnId]) {
      initialData.columns[columnId] = {
        id: columnId,
        title: row.status.text,
        taskIds: [],
        backgroundColor: row.status.backgroundColor,
      };
      initialData.columnOrder.push(columnId);
    }

    initialData.columns[columnId].taskIds.push(taskId);
  });

  return initialData;
};



const initialData = {
  tasks: {
    "task-1": { id: "task-1", title: "Task 1" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "No Started",
      taskIds: ["task-1"],
      backgroundColor: "lightgray",
    },
  },
  columnOrder: ["column-1"],
};
const colorsArray = [
  { id: 1, color: "#FF0000" },
  { id: 2, color: "#00FF00" },
  { id: 3, color: "#0000FF" },
  { id: 4, color: "#FFFF00" },
  { id: 5, color: "#FF00FF" },
  { id: 6, color: "#00FFFF" },
  { id: 7, color: "#FFA500" },
  { id: 8, color: "#800080" },
  { id: 9, color: "#008000" },
  { id: 10, color: "#800000" },
  { id: 11, color: "#008080" },
  { id: 12, color: "#808000" },
  { id: 13, color: "#C0C0C0" },
  { id: 14, color: "#FFD700" },
  { id: 15, color: "#A52A2A" },
  { id: 16, color: "#32CD32" },
  { id: 17, color: "#FA8072" },
  { id: 18, color: "#4682B4" },
  { id: 19, color: "#87CEEB" },
  { id: 20, color: "#F08080" },
  { id: 21, color: "#00CED1" },
  { id: 22, color: "#FF6347" },
  { id: 23, color: "#8B4513" },
  { id: 24, color: "#6A5ACD" },
  { id: 25, color: "#2E8B57" },
];
const Main = ({ toggleCanvas }) => {
  const {rows} = useStateContext()
  const [data, setData] = useState(convertData(rows));
  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState("");
  const [colorPopoverAnchorEl, setColorPopoverAnchorEl] = useState(null);
  const [taskPopoverAnchorEl, setTaskPopoverAnchorEl] = useState(null);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      // Move within the same column
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
    } else {
      // Move to a different column
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      };

      setData(newData);
    }
  };

  const addNewColumn = () => {
    const newColumnId = `column-${uuidv4()}`;

    const newColumn = {
      id: newColumnId,
      title: "New Kanban",
      taskIds: [],
      backgroundColor: "lightgray",
    };

    const newColumns = {
      ...data.columns,
      [newColumnId]: newColumn,
    };

    const newColumnOrder = [...data.columnOrder, newColumnId];

    setData({
      ...data,
      columns: newColumns,
      columnOrder: newColumnOrder,
    });
  };
  const deleteColumn = () => {
    const columnId = targetColumnId;
    const { [columnId]: deletedColumn, ...remainingColumns } = data.columns;
    const newColumnOrder = data.columnOrder.filter((id) => id !== columnId);

    // Remove tasks associated with the deleted column
    const taskIdsToRemove = data.columns[columnId].taskIds;
    const { [columnId]: deletedTasksColumn, ...remainingTasks } = data.tasks;
    taskIdsToRemove.forEach((taskId) => {
      delete remainingTasks[taskId];
    });

    setData({
      ...data,
      columns: remainingColumns,
      tasks: remainingTasks,
      columnOrder: newColumnOrder,
    });
    setOpen(false);
  };

  const addNewTask = (columnId) => {
    const newTaskId = uuidv4(); // Generate a unique ID using uuid
    const defaultTaskName = "New Task";

    const newTask = { id: newTaskId, title: defaultTaskName };

    const newTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const newColumn = {
      ...data.columns[columnId],
      taskIds: [...data.columns[columnId].taskIds, newTaskId],
    };

    const newColumns = {
      ...data.columns,
      [columnId]: newColumn,
    };

    setData({
      ...data,
      tasks: newTasks,
      columns: newColumns,
    });
  };

  const handleClick = (event, columnId) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    setTargetColumnId(columnId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleColorClick = (event) => {
    setOpen(false);
    setColorPopoverAnchorEl(event.currentTarget);
    setColorPopoverOpen(true);
  };

  const handleColorClose = () => {
    setColorPopoverAnchorEl(null);
    setColorPopoverOpen(false);
  };
  const changeColor = (newColor) => {
    console.log({ newColor });
    const updatedColumn = {
      ...data.columns[targetColumnId],
      backgroundColor: newColor,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [targetColumnId]: updatedColumn,
      },
    };

    setData(newData);
    setColorPopoverOpen(false);
  };
  const handleTitleChange = (event, columnId) => {
    const updatedColumn = {
      ...data.columns[columnId],
      title: event.target.value,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [columnId]: updatedColumn,
      },
    };

    setData(newData);
  };
  const handleTaskTitleChange = (event, columnId, taskId) => {
    const newTaskTitle = event.target.value;

    // Update the task title in the state
    setData((prevData) => {
      const newTasks = {
        ...prevData.tasks,
        [taskId]: {
          ...prevData.tasks[taskId],
          title: newTaskTitle,
        },
      };

      const newColumns = {
        ...prevData.columns,
        [columnId]: {
          ...prevData.columns[columnId],
          taskIds: prevData.columns[columnId].taskIds.map((id) =>
            id === taskId ? taskId : id
          ),
        },
      };

      return {
        ...prevData,
        tasks: newTasks,
        columns: newColumns,
      };
    });
  };
  const handleTaskClick = (event, taskId) => {
    console.log({
      taskId,
    });
    setTaskPopoverAnchorEl(event.currentTarget);
    setCurrentTaskId(taskId);
    setTaskOpen(true);
  };

  // Function to close the task popover
  const handleCloseTaskPopover = () => {
    setTaskOpen(false);
    setCurrentTaskId("");
  };

  const deleteTask = () => {
    const taskId = currentTaskId;
    // Update the state to remove the task
    setData((prevData) => {
      // Copy the tasks object without the deleted task
      const newTasks = { ...prevData.tasks };
      delete newTasks[taskId];

      // Update the columns object to remove the task from taskIds
      const newColumns = { ...prevData.columns };
      Object.keys(newColumns).forEach((columnId) => {
        newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(
          (id) => id !== taskId
        );
      });

      return {
        ...prevData,
        tasks: newTasks,
        columns: newColumns,
      };
    });

    // Close the task popover
    setTaskPopoverAnchorEl(null);
    setTaskOpen(false);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [buttonRef, setButtonRef] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false); // Close the date picker after selecting a date
  };

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleButtonClick = (event) => {
    setButtonRef(event.currentTarget);
    handleOpenDatePicker();
  };
  const handleClearDate = () => {
    setSelectedDate(null);
  };
  const popperPlacement = {
    placement: "bottom-center", // Adjust placement as needed
  };
  console.log({ selectedDate });
  return (
    <>
      <div className="flex items-center my-3">
        <button
          className="workspace_addBtn text-white rounded border-0 text-sm outline-none p-2"
          onClick={addNewColumn}
        >
          Add New Section
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-3 flex-wrap ">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            // Generate a unique ID for the MoreHorizIcon
            const moreIconId = `more-icon-${column.id}`;

            return (
              <Droppable
                key={column.id}
                droppableId={column.id}
                className="kanban__section"
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0 h-[450px] w-72 rounded-lg bg-slate-100 hover:bg-slate-200 hover:shadow-lg flex flex-col"
                  >
                    <div
                      className="h-10 flex items-center justify-between gap-4 p-2 text-sm font-semibold m-0 rounded-tr-lg rounded-tl-lg"
                      style={{ background: column.backgroundColor }}
                    >
                      <input
                        tpye="text"
                        value={column.title}
                        className="hover:border border-black w-full rounded bg-transparent outline-none text-white"
                        onChange={(event) =>
                          handleTitleChange(event, column.id)
                        }
                      />

                      <span className="flex gap-2 items-center">
                        <Tooltip placement="top" title="New Task" arrow>
                          <span
                            className="flex items-center justify-center w-[25px] h-[25px] hover:bg-white rounded cursor-pointer text-white kanbanIcon"
                            onClick={() => addNewTask(column.id)}
                          >
                            <AddCircleOutlineIcon
                              className="text-white"
                              style={{
                                height: "18px",
                              }}
                            />
                          </span>
                        </Tooltip>
                        <Tooltip placement="top" title="More" arrow>
                          <span
                            className="flex items-center justify-center w-[25px] h-[25px] hover:bg-white rounded cursor-pointer text-white kanbanIcon"
                            aria-describedby={moreIconId}
                            onClick={(event) => handleClick(event, column.id)}
                          >
                            <MoreHorizIcon
                              className="text-white"
                              style={{ height: "18px" }}
                            />
                          </span>
                        </Tooltip>
                        <Popover
                          id={moreIconId}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          PaperProps={{
                            style: {
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Customize the shadow as needed
                              marginTop: "10px",
                            },
                          }}
                        >
                          <Typography className="p-1 w-40">
                            <div
                              className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer flex items-center gap-1 text-gray-500"
                              onClick={handleColorClick}
                              aria-describedby="color-popover"
                            >
                              <ColorLensOutlinedIcon fontSize="small" />
                              <span>Change Color</span>
                            </div>
                            <div
                              className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer flex items-center gap-1 text-gray-500"
                              onClick={deleteColumn}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                              <span>Delete</span>
                            </div>
                          </Typography>
                        </Popover>

                        <Popover
                          id="color-popover"
                          open={colorPopoverOpen}
                          anchorEl={colorPopoverAnchorEl}
                          onClose={handleColorClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          PaperProps={{
                            style: {
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1) ", // Customize the shadow as needed
                              marginTop: "-4px",
                            },
                          }}
                        >
                          <Typography className="p-1 w-40">
                            <div className="text-sm flex flex-wrap items-center justify-center gap-2 px-2 rounded py-2 cursor-pointer">
                              {colorsArray?.map((color) => {
                                return (
                                  <CircleIcon
                                    key={color.id}
                                    style={{ color: color.color }}
                                    onClick={() => changeColor(color.color)}
                                  />
                                );
                              })}
                            </div>
                          </Typography>
                        </Popover>
                      </span>
                    </div>

                    <div className="py-3 pl-3 pr-2 h-full flex-1 kanban__section__bottom">
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="bg-white mb-2 rounded border h-fit p-2 text-xs text-gray-500 flex flex-col gap-2"
                            >
                              <div className="h-10 flex items-center justify-between gap-4   font-semibold m-0">
                                <input
                                  tpye="text"
                                  value={task.title}
                                  className="hover:border border-black w-full rounded bg-transparent outline-none text-gray-500 "
                                  onChange={(event) =>
                                    handleTaskTitleChange(
                                      event,
                                      column.id,
                                      task.id
                                    )
                                  }
                                />

                                <span className="flex gap-2 items-center">
                                  <Tooltip
                                    placement="top"
                                    title="Start Conversation"
                                    arrow
                                  >
                                    <span className="flex items-center justify-center w-[25px] h-[25px]  rounded cursor-pointer text-gray-500 kanbanTaskIcon">
                                      <MapsUgcOutlinedIcon
                                        className="text-gray-500"
                                        style={{
                                          height: "18px",
                                        }}
                                        onClick={toggleCanvas}
                                      />
                                    </span>
                                  </Tooltip>
                                  <Tooltip placement="top" title="More" arrow>
                                    <span
                                      className="flex items-center justify-center w-[25px] h-[25px] hover:bg-gray-300 rounded cursor-pointer text-gray-500"
                                      aria-describedby={`task-more-icon-${task.id}`}
                                      onClick={(event) =>
                                        handleTaskClick(event, task.id)
                                      }
                                    >
                                      <MoreHorizIcon
                                        className="text-gray-500"
                                        style={{ height: "18px" }}
                                      />
                                    </span>
                                  </Tooltip>
                                  <Popover
                                    id={`task-more-icon-${task.id}`}
                                    open={taskOpen}
                                    anchorEl={taskPopoverAnchorEl}
                                    onClose={handleCloseTaskPopover}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                    PaperProps={{
                                      style: {
                                        boxShadow:
                                          "0px 4px 8px rgba(0, 0, 0, 0.1)", // Customize the shadow as needed
                                        marginTop: "10px",
                                      },
                                    }}
                                  >
                                    <Typography className="p-1 w-40">
                                      <div
                                        className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer flex items-center gap-2 text-gray-500"
                                        onClick={() => {
                                          toggleCanvas();
                                          handleCloseTaskPopover();
                                        }}
                                      >
                                        <OpenInFullOutlinedIcon
                                          style={{ fontSize: "18px" }}
                                        />

                                        <span>Open Task</span>
                                      </div>
                                      <div
                                        className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer flex items-center gap-2 text-gray-500"
                                        onClick={() => deleteTask()}
                                      >
                                        <DeleteOutlineIcon
                                          style={{ fontSize: "18px" }}
                                        />
                                        <span>Delete</span>
                                      </div>
                                    </Typography>
                                  </Popover>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 flex gap-2 items-center">
                                  <CalendarTodayOutlinedIcon />
                                  <span>Due Date</span>
                                </div>
                                <span className="rounded due-date-box bg-gray-100 flex-1 h-8  flex items-center  ">
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <div className="flex items-center w-full justify-center ">
                                      {selectedDate ? (
                                        <div className="selected-date flex items-center w-full justify-between p-1 border  text-xs m-1">
                                          <span>
                                            {selectedDate.format(
                                              "DD MMMM, YYYY"
                                            )}
                                          </span>
                                          <ClearIcon
                                            className="cursor-pointer "
                                            onClick={handleClearDate}
                                            style={{ height: "18px" }}
                                          />
                                        </div>
                                      ) : (
                                        <div
                                          className="w-full flex items-center justify-center gap-1 icons-due-date m-1 p-1 cursor-pointer hover:border"
                                          onClick={handleButtonClick}
                                        >
                                          <AddCircleIcon
                                            style={{ fontSize: "16px" }}
                                            className="text-blue-500"
                                          />
                                          <CalendarTodayOutlinedIcon
                                            style={{ fontSize: "16px" }}
                                          />
                                        </div>
                                      )}

                                      {isDatePickerOpen && (
                                        <div className="custom-date-picker-container">
                                          <DatePicker
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            format="DD MMMM, YYYY"
                                            open={isDatePickerOpen}
                                            onOpen={() =>
                                              setIsDatePickerOpen(true)
                                            }
                                            onClose={() =>
                                              setIsDatePickerOpen(false)
                                            }
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </LocalizationProvider>
                                  {/* <div
                                    className="w-full flex items-center justify-center gap-1 icons-due-date hidden m-1 p-1"
                                    onClick={handleButtonClick}
                                    ref={setButtonRef}
                                  >
                                    <AddCircleIcon
                                      style={{ fontSize: "16px" }}
                                      className="text-blue-500"
                                    />
                                    <CalendarTodayOutlinedIcon
                                      style={{ fontSize: "16px" }}
                                    />
                                  </div> */}
                                </span>
                                {/* <TimelineCell/> */}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 flex gap-2 items-center">
                                  <ViewTimelineOutlinedIcon />
                                  <span>Timeline</span>
                                </div>
                                <span className="rounded bg-gray-100 flex-1 h-8  flex items-center justify-center  ">
                                  <TimelineCell />
                                </span>
                              </div>
                              {/* <div className="flex items-center gap-2">
                                <div className="w-20 flex gap-2 items-center">
                                 
                                  <MenuOutlinedIcon className="text-xl" />
                                  <span>Status</span>
                                </div>
                                <span className="rounded bg-gray-100 flex-1 h-8  flex items-center justify-center">
                                  <PeopleCell />
                                </span>
                              </div> */}
                              <div className="flex items-center gap-2">
                                <div className="w-20 flex gap-2 items-center">
                                  <RxAvatar className="text-xl" />
                                  <span>Owner</span>
                                </div>
                                <span className="rounded bg-gray-100 flex-1 h-8  flex items-center justify-center">
                                  <PeopleCell />
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}

          {/* {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0 h-96 w-60 rounded-lg bg-slate-100 hover:bg-slate-200 hover:shadow-lg"
                  >
                    <h3
                      className="h-10 flex items-center justify-between p-2 text-sm font-semibold m-0 rounded-tr-lg rounded-tl-lg"
                      style={{ background: column.backgroundColor }}
                    >
                      <span>{column.title}</span>

                      <span className="flex gap-2 items-center">
                        <Tooltip placement="top" title="New Task" arrow>
                          <AddCircleOutlineIcon
                            className="w-fit h-fit rounded-lg cursor-pointer text-white"
                            onClick={() => addNewTask(column.id)}
                          />
                        </Tooltip>
                        <Tooltip placement="top" title="More" arrow>
                          <MoreHorizIcon
                            className="w-fit h-fit rounded-lg cursor-pointer text-white"
                            aria-describedby={column.id}
                            onClick={handleClick}
                          />
                        </Tooltip>
                        <Popover
                          id={column.id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          PaperProps={{
                            style: {
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Customize the shadow as needed
                            },
                          }}
                        >
                          <Typography className="p-1 w-40">
                            <div
                              className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer"
                              onClick={() => deleteColumn(column.id)}
                            >
                              Delete
                            </div>
                          </Typography>
                        </Popover>
                      </span>
                    </h3>

                    <div className="p-4 h-full">
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="bg-white p-2 mb-2 rounded border"
                            >
                              {task.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })} */}
          {/* <Tooltip placement="top" title="New Kanban" arrow>
            <AddCircleOutlineIcon
              className="w-fit h-fit rounded-lg cursor-pointer"
              sx={{ fontSize: "25px" }}
              // fontSize="large"
            />
          </Tooltip> */}
        </div>
      </DragDropContext>
    </>
  );
};

export default Main;
