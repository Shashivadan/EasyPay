import { useEffect, useState } from "react";
import Button from "./Button";
import instance from "../utils/AxiosBaseUrl";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(
    () => async () => {
      try {
        const response = await instance.post("/user/bluk?filter=" + filter);
        setUsers(response.data.users);
        console.log(filter);
        console.log(users);
      } catch (err) {
        console.log(err);
      }
    },
    [filter]
  );
  const handleOnChange = (e) => {
    return setFilter(e.target.value);
  };

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={handleOnChange}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstname} {user.lastname}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={() =>
            navigate(`/send?id=${user._id}&name=${user.firstname}`)
          }
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
