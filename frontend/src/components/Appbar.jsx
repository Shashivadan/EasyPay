import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.setItem("token", "");
    navigate("/signin");
  };
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        EasyPay App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className=" flex justify-center items-center">
          <button
            onClick={handleOnClick}
            className=" bg-blue-950 px-3 py-2  rounded-lg text-white"
          >
            log out
          </button>
        </div>
      </div>
    </div>
  );
};
