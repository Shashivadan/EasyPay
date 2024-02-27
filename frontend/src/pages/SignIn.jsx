import React from "react";
import {
  Heading,
  SubHeading,
  InputBox,
  BottomWarning,
  Button,
} from "../components/Index";

import { useForm } from "react-hook-form";
function SignIn() {
  const { register, handleSubmit } = useForm();

  const formData = handleSubmit((data) => console.log(data));

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
                inputName={"email"}
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
