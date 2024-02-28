import React, { useEffect, useState } from "react";
import { Appbar, Balance, Users } from "../components/Index";
import Instance from "../utils/AxiosBaseUrl";
function Dashboard() {
  const [balance, setBalance] = useState(0);
  useEffect(() => async () => {
    try {
      const response = await Instance.get("/account/balance");
      const data = await response.data;
      // console.log(data.balance);
      setBalance(Math.round(data.balance, 2));
    } catch (error) {}
  });
  return (
    <>
      <div className=" max-w-screen-lg m-auto pt-10">
        <Appbar />
        <div className=" mt-2 mb-2  m-auto">
          <Balance value={balance} />
        </div>
        <div>
          <Users />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
