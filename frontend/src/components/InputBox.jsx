import React from "react";

function InputBox({ placeholder, label, register, inputName, type = "text" }) {
  return (
    <>
      <div>
        <h3 className="text-sm font-medium text-left py-2">{label}</h3>
        <input
          className="w-full px-2 py-1 border rounded border-slate-200"
          type={type}
          placeholder={placeholder}
          name={inputName}
          id={inputName}
          {...register(inputName, { required: true })}
        />
      </div>
    </>
  );
}

export default InputBox;
