import React from "react";
import { Appbar, Balance, Users } from "../components/Index";

function Dashboard() {
  return (
    <>
      <div className=" max-w-screen-lg m-auto pt-10">
        <Appbar />
        <div className=" mt-2 mb-2  m-auto">
          <Balance />
        </div>
        <div>
          <Users />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
