import React from "react";
import {
  Heading,
  SubHeading,
  InputBox,
  BottomWarning,
  Button,
} from "../components/Index";
import axios from "../utils/AxiosBaseUrl";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const formData = handleSubmit(async (data) => {
    try {
      console.log(data);
      const response = await axios.post("/user/signin", data);
      const responseData = await response.data;
      localStorage.setItem("token", responseData.token);
      if (responseData.token) {
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error("Wrong email or password");
    }
  });

  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <form onSubmit={formData}>
              <Heading label={"Sign in"} />
              <SubHeading
                label={"Enter your credentials to access your account"}
              />
              <InputBox
                placeholder="harkirat@gmail.com"
                label={"Email"}
                register={register}
                inputName={"username"}
              />
              <InputBox
                placeholder="123456"
                label={"Password"}
                register={register}
                inputName={"password"}
                type="Password"
              />
              <div className="pt-4">
                <Button label={"Sign in"} type="Submit" />
              </div>
              <BottomWarning
                label={"Don't have an account?"}
                buttonText={"Sign up"}
                to={"/signup"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
