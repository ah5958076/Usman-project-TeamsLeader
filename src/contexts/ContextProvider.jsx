import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../assets/images/Images";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
const StateContext = createContext();
export const ContextProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const renderFileIcon = (file) => {
    if (!file) {
      return null; // Return null if the file doesn't exist
    }
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return (
        <img src={file.url} alt="Uploaded file" style={{ maxWidth: "100%" }} />
      );
    } else if (fileType.startsWith("video/")) {
      return (
        <video autoPlay style={{ maxWidth: "100%" }}>
          <source src={file.url} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (
      fileType === "text/plain" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      return (
        <span
          className="justify-content-center centerIt"
          style={{ backgroundColor: "#2368C4", color: "white" }}
        >
          W
        </span>
      );
    } else if (
      fileType === "application/vnd.ms-excel" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return (
        <span
          className="justify-content-center centerIt"
          style={{ backgroundColor: "#237F4C", color: "white" }}
        >
          X
        </span>
      );
    } else if (fileType === "application/pdf") {
      return (
        <embed
          onClick={() => setModalShow({ modalActive: true, file })}
          src={file.url}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{
            height: "-webkit-fill-available",
          }}
        />

        // <DocViewer
        //   className="mx-4"
        //   pluginRenderers={DocViewerRenderers}
        //   documents={documents}
        // />
      );
    } else if (
      fileType === "application/zip " ||
      "application/x-rar-compressed"
    ) {
      const documents = [{ uri: file.url }];
      return (
        <span
          className="justify-content-center centerIt"
          style={{ backgroundColor: "#FFCC00", color: "white" }}
        >
          ZIP
          {/* <GiZipper className="fs-1 " /> */}
        </span>
      );
    } else {
      return (
        <span
          className="justify-content-center centerIt"
          style={{ backgroundColor: "#5559DF", color: "white" }}
        >
          <AiOutlineFile className="fs-1 " />
        </span>
      );
    }
  };
  const FileAltIcons = (file) => {
    const fileType = file?.type;

    if (fileType?.startsWith("image/")) {
      return <img src={IMAGES.IMAGE} alt="Uploaded file" />;
    } else if (fileType?.startsWith("video/")) {
      return <img src={IMAGES.VIDEO} alt="Uploaded file" />;
    } else if (
      fileType === "text/plain" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      return <img src={IMAGES.WORD} alt="Uploaded file" />;
    } else if (
      fileType === "application/vnd.ms-excel" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <img src={IMAGES.EXCEL} alt="Uploaded file" />;
    } else if (fileType === "application/pdf") {
      return <img src={IMAGES.PDF} alt="Uploaded file" />;
    } else if (
      fileType === "application/zip " ||
      "application/x-rar-compressed"
    ) {
      return <img src={IMAGES.ZIP} alt="Uploaded file" />;
    }
    // else {
    //   return <img src={IMAGES.UNKNOWN} alt="Uploaded file" />;
    // }
  };
  const breakpoint = [
    true,
    "sm-down",
    "md-down",
    "lg-down",
    "xl-down",
    "xxl-down",
  ];
  const [fullscreen, setFullscreen] = useState(true);
  const [labels, setLabels] = useState([
    { text: "Label 1", backgroundColor: "#ACA8C3", id: uuidv4() },
    { text: "Label 2", backgroundColor: "#CDCDCD", id: uuidv4() },
    { text: "Label 3", backgroundColor: "#A9B9C7", id: uuidv4() },
    { text: "Label 3", backgroundColor: "#49A7D1", id: uuidv4() },
  ]);
  const uniqueId = uuidv4();
  const [theme, setTheme] = useState("light_theme");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [fileView, setFileView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [currentlyUploadedFiles, setCurrentlyUploadedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [modalShow, setModalShow] = React.useState({
    modalActive: false,
    file: {},
  });
  const [replyFilePreview, setReplyFilePreview] = useState({
    replyModalActive: false,
  });
  const defaultState = {
    replyText: "",
    replyGif: "",
    fileData: {},
    id: uniqueId,
  };
  const [replyInput, setReplyInput] = useState(defaultState);
  const [labelModalVisible, setLabelModalVisible] = useState(false);
  const [managingOption, setManagingOption] = useState(null);
  const [modalDataCalendar, setModalDataCalendar] = useState(null);
  const [clickedCellInfo, setClickedCellInfo] = useState(null);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedTableData = rows.map((item) => {
      return { ...item, selected: !selectAll };
    });
    setRows(updatedTableData);
  };
  const setModalInfo = (data) => {
    setModalDataCalendar(data);
  };
  const handleSaveNewPassword = (newRow) => {
    setRowsPassword((prevRows) => [...prevRows, newRow]);
  };
  const handleSaveNewCard = (newRow) => {
    setRowsCard((prevRows) => [...prevRows, newRow]);
  };

  const [passColumns, setPassColumns] = useState([
    {
      id: uuidv4(),
      name: (
        <Form.Check
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    { id: uuidv4(), name: "Item" },
    {
      id: uuidv4(),
      name: "People",
    },
    {
      id: uuidv4(),
      name: "Password",
    },
    {
      id: uuidv4(),
      name: "URL",
    },
  ]);
  const [cardColumns, setCardColumns] = useState([
    {
      id: uuidv4(),
      name: (
        <Form.Check
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    {
      id: uuidv4(),
      name: "People",
    },
    {
      id: uuidv4(),
      name: "Full Name",
    },
    {
      id: uuidv4(),
      name: "Card Number",
    },
    {
      id: uuidv4(),
      name: "CVV",
    },
    {
      id: uuidv4(),
      name: "Expiry Date",
    },
    // {
    //   id: uuidv4(),
    //   name: "Tags",
    // },
  ]);
  const [columns, setColumns] = useState([
    {
      id: uuidv4(),
      name: (
        <Form.Check
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    { id: uuidv4(), name: "Item" },
    {
      id: uuidv4(),
      name: "Person",
    },

    {
      id: uuidv4(),
      name: "Status",
    },
    {
      id: uuidv4(),
      name: "Date",
    },
  ]);
  const [rows, setRows] = useState([
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      status: { text: "Working on it", backgroundColor: "#fdab3d" },
      task: "Task 1",
      data: {
        // [columns[1].id]: "Item 1",
      },
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      status: { text: "Stuck", backgroundColor: "#e2445c" },
      task: "Task 2",
      data: {
        // [columns[1].id]: "Item 2",
      },
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      status: { text: "Done", backgroundColor: "#00c875" },
      task: "Task 3",
      data: {
        // [columns[1].id]: "Item 2",
      },
    },
    {
      id: "123456789",
      selected: false,
      status: {
        text: "Working on it",
        backgroundColor: "#fdab3d",
      },
      task: "Task 4",
      data: {},
    },
    {
      id: "987654321",
      selected: false,
      status: {
        text: "Stuck",
        backgroundColor: "#e2445c",
      },
      task: "Task 5",
      data: {},
    },
    {
      id: "111222333",
      selected: false,
      status: {
        text: "Done",
        backgroundColor: "#00c875",
      },
      task: "Task 6",
      data: {},
    },
  ]);
  const [rowsPassword, setRowsPassword] = useState([
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,

      task: "Dream Media",

      password: "password123",
      showPassword: false,
      url: { text: "Dream Media", link: "https://dream-media.net/" },
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      task: "Olympia",

      password: "usman123445",
      showPassword: false,
      url: { text: "Olympia", link: "https://olympia4fb.com/" },
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,

      task: "Teams",
      userName: "mujtaba867",

      password: "ali43453",
      showPassword: false,
      url: { text: "Olympia4fb", link: "https://olympia4fb.com/" },
    },

    // ... other rows
  ]);
  const [rowsCard, setRowsCard] = useState([
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      fullName: "Usman Yousaf",
      expDate: "02/27",
      cvvCode: "345",
      cardNumber: "1234567891234567",

      showCard: false,
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      fullName: "Falak Sher",
      expDate: "03/29",
      cardNumber: "1234567891234765",
      cvvCode: "453",

      showCard: false,
    },
    {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,   
      fullName: "Mujtaba Haider",
      expDate: "12/25",
      cvvCode: "455",
      cardNumber: "1234567891234856",
      showCard: false,
    },

    // ... other rows
  ]);
  const [teamName, setTeamName] = useState("");
  const [showDocSidebar, setShowDocSidebar] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  // const setClickedCell = (info) => {
  //   setClickedCellInfo(info);
  // };
  return (
    <StateContext.Provider
      value={{
        clickedCellInfo,
        setClickedCellInfo,
        modalDataCalendar,
        setModalInfo,
        setShowEventModal,
        showEventModal,
        monthIndex,
        setMonthIndex,
        handleSaveNewPassword,
        cardColumns,
        setCardColumns,
        setRowsCard,
        rowsCard,
        rowsPassword,
        setRowsPassword,
        passColumns,
        setPassColumns,
        theme,
        setTheme,
        isSidebarVisible,
        setIsSidebarVisible,
        fileView,
        setFileView,
        searchQuery,
        setSearchQuery,
        uploading,
        setUploading,
        uploadCount,
        setUploadCount,
        currentlyUploadedFiles,
        setCurrentlyUploadedFiles,
        uploadedFiles,
        setUploadedFiles,
        modalShow,
        setModalShow,
        replyFilePreview,
        setReplyFilePreview,
        replyInput,
        setReplyInput,
        defaultState,
        renderFileIcon,
        breakpoint,
        fullscreen,
        setFullscreen,
        FileAltIcons,
        labels,
        setLabels,
        labelModalVisible,
        setLabelModalVisible,
        managingOption,
        setManagingOption,
        rows,
        setRows,
        columns,
        setColumns,
        handleSelectAll,
        selectAll,
        setSelectAll,
        teamName,
        setTeamName,
        handleSaveNewCard,
        showDocSidebar,
        setShowDocSidebar,
        isEmailVerified,
        setIsEmailVerified,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
