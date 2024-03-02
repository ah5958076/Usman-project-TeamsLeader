import React, { useRef } from "react";
import { FiX, FiUpload } from "react-icons/fi"; // Import the necessary icons
import { useStateContext } from "../../../../contexts/ContextProvider";
import { Button } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import UploadedFileModal from "./UploadedFileModal";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFileOn } from "react-icons/ci";

const TableFileUploader = ({ files, onFileUpload, onFileDelete }) => {
  const { FileAltIcons, setReplyFilePreview, replyFilePreview, setModalShow } =
    useStateContext();
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    onFileUpload(e.target.files[0]);
    // Clear the file input after uploading
    fileInputRef.current.value = null;
  };
  const toggleModal = () => {
    setModalShow({ modalActive: true, file: files });
    setReplyFilePreview({
      replyModalActive: true,
      file: files,
    });
    console.log(files, replyFilePreview);
  };
  const handleFileAddClick = () => {
    // Programmatically trigger the file input when the "AiOutlinePlus" button is clicked
    fileInputRef.current.click();
  };
  return (
    <div>
      {files ? (
        <div>
          <a onClick={toggleModal}>{FileAltIcons(files)}</a>
          <UploadedFileModal replyFilePreview={replyFilePreview} />
          {/* <img
            src={files.url}
            alt="File"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          /> */}
          {/* <button onClick={onFileDelete}>
            <FiX />
          </button> */}
          <button
            className="px-0 py-0  file_deleteBtn flex ms-3"
            onClick={onFileDelete}
          >
            <RxCross2
              className=""
              style={{
                width: "14px",
                height: "auto",
              }}
            />
          </button>
        </div>
      ) : (
        <div>
          <button
            className="px-0 py-0  file_deleteBtn file_addBtn ms-3"
            onClick={handleFileAddClick}
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
          <CiFileOn className="" />
          <input
            id="fileInput"
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default TableFileUploader;
