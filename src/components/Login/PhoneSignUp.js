import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { Alert, Button, TextField } from "@mui/material";
import "react-phone-number-input/style.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PhoneSignUp = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const { setUpRecaptcha } = useAuth();
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState("");
  const navigate = useNavigate();
  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
  };
  const verifyOpt = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp === "" || otp === null) return;
    try {
      setError("");
      await confirmObj.confirm(otp);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="App ">
      <h1>Phone number Authentication</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
        <PhoneInput
          placeholder="Enter phone number"
          defaultCountry="BD"
          value={number}
          onChange={setNumber}
          style={{ width: "250px", margin: "auto", height: "122px" }}
        />
        <div style={{ margin: "auto" }} id="recaptcha-container" />
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          send otp
        </Button>
      </form>
      <div>---------------------------==--------</div>
      <form onSubmit={verifyOpt} style={{ display: flag ? "block" : "none" }}>
        <TextField
          sx={{ width: "75%", m: 1 }}
          id="standard-basic"
          label="Your opt"
          name="text"
          type="text"
          onChange={(e) => setOtp(e.target.value)}
          variant="standard"
        />
        <div style={{ margin: "auto" }} id="recaptcha-container" />
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          verify
        </Button>
      </form>
    </div>
  );
};

export default PhoneSignUp;
