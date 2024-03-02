import React, { useEffect, useState } from "react";
import "../../../assets/css/Login.css";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import { MdChevronRight } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../../assets/images/Images";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
// import nodemailer from "nodemailer";

const Signup1 = ({ setActiveView, userEmail }) => {
  const [formDataList, setFormDataList] = useState([]);
  // const {  } = useStateContext();
  console.log({ userEmail });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (formDataList.length > 0) {
      setActiveView("view2");
      console.log(formDataList);
    }
  }, [formDataList, setActiveView]);

  const onSubmit = async (data) => {
    const payload = {
      emailAddress: userEmail, // Assuming you want to use the userEmail from context
      fullName: data.fullName,
      accountName: data.accountName,
    };

    try {
      const response = await axios.post(
        "http://localhost:8888/api/user/signup",
        payload
      );
      setFormDataList((prevDataList) => [payload, ...prevDataList]);
      // reset({
      //   fullName: "",
      //   password: "",
      //   accountName: "",
      // });

      // // Assuming the API response contains a success flag or similar
      if (response.data.success) {
        localStorage.setItem("token", response.data.user.emailAddress);
        navigate("/success"); // Navigate to success page or handle accordingly
      } else {
        // Handle failure, show error message, etc.
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("Error calling signup API:", error.message);
    }
  };
  return (
    <div className="signup_form w-100">
      <div
        className="login_header flex align-items-center border-bottom px-3 mb-5 "
        style={{ height: "65px", backgroundColor: "#F7F7F7" }}
      >
        <img
          src={IMAGES.LEAF}
          className="align-self-center  me-2 "
          style={{ width: "30px" }}
          alt=""
        />
        <h2 style={{ fontWeight: "900", margin: "0", letterSpacing: "-2px" }}>
          Teams Leader
        </h2>
      </div>

      <div className="mx-auto " style={{ width: "530px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p
              className="mb-0 text-center"
              style={{ fontSize: "30px", marginTop: "24px" }}
            >
              Create your account
            </p>
          </div>

          <div className="mt-4">
            <span className="me-3 fs_14">Full name</span>
            <Controller
              name="fullName"
              defaultValue=""
              control={control}
              rules={{ required: "Enter your full name" }}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    className={`login_input mt-1 ${
                      errors.fullName ? "error_border" : ""
                    }`}
                    placeholder="Enter your full name"
                    {...field}
                  />
                  <div className="text-danger mb-4 fs_14">
                    {errors.fullName?.message}
                  </div>
                </>
              )}
            />

            <span className="me-3 fs_14">Password</span>
            <Controller
              name="password"
              defaultValue=""
              control={control}
              rules={{ required: "Create your password", minLength: 8 }}
              render={({ field }) => (
                <>
                  <input
                    type="password"
                    className={`login_input mt-1  ${
                      errors.password ? "error_border" : ""
                    }`}
                    placeholder="Create your password"
                    {...field}
                  />
                  <div className="text-danger mb-4 fs_14">
                    {errors.password?.message}
                  </div>
                </>
              )}
            />

            <span className="me-3 fs_14">Account name</span>
            <Controller
              name="accountName"
              defaultValue=""
              control={control}
              rules={{ required: "Name your account" }}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    className={`login_input mt-1  ${
                      errors.accountName ? "error_border" : ""
                    }`}
                    placeholder="For example company's or department's name"
                    {...field}
                  />
                  <div className="text-danger mb-4 fs_14">
                    {errors.accountName?.message}
                  </div>
                </>
              )}
            />
          </div>

          <div className="flex justify-content-center">
            <Button
              type="submit"
              className="rounded-1 d-flex mt-4 justify-content-end  align-items-center green_btn border-0"
              style={{ width: "126px" }}
            >
              Continue <MdChevronRight className="ms-2 fs-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup1;
