import React from "react";
import {
  Heading,
  SubHeading,
  InputBox,
  BottomWarning,
  Button,
} from "../components/Index";

import { useForm } from "react-hook-form";

function SignUp() {
  const { register, handleSubmit, reset } = useForm();

  const formData = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <>
      <div className="w-full h-screen bg-slate-300 flex justify-center">
        <div className="flex flex-col justify-center">
          <form action="" onSubmit={formData}>
            <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              <Heading label={`Sign up`}></Heading>
              <SubHeading
                lable={"Enter your infromation to create an account"}
              ></SubHeading>
              <InputBox
                register={register}
                placeholder={"First Name"}
                label={"First Name"}
                inputName={"firstname"}
              />
              <InputBox
                register={register}
                placeholder={"Last Name"}
                label={"Last Name"}
                inputName={"lastname"}
              />
              <InputBox
                register={register}
                placeholder={"Email"}
                label={"Email"}
                inputName={"email"}
              />
              <InputBox
                type="Password"
                register={register}
                placeholder={"**********"}
                label={"Password"}
                inputName={"password"}
              />
              <div className="mt-4">
                <Button type="Submit" label={"Sign up"} />
              </div>
              <BottomWarning
                label={"Don't have an account?"}
                buttonText={"Sign in"}
                to={"/signin"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
