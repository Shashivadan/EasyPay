import React from "react";
import { Dashboard, SendMoney, SignIn, SignUp } from "../pages/Index";
import { Route, Routes } from "react-router-dom";
function Routing() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </>
  );
}

export default Routing;
