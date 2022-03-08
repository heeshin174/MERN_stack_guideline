import { useState } from "react";
import Link from "next/link";
import { LockClosedIcon, UserAddIcon } from "@heroicons/react/solid";

type UserData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const register = () => {
  const [formData, setformData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e: React.FormEvent) => {
    setformData((prevState) => ({
      ...prevState,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      console.log("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
    }
  };

  return (
    <div className="min-h-full flex-col items-center justify-center py-12 px-20%">
      <div>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          <UserAddIcon className="inline mx-auto h-12 w-auto pr-2 text-indigo-500" />
          Register
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create new account
        </p>
      </div>
      <form className="mt-8 space-y-6" action="" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter Your Full Name <John Smith>"
            id="name"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your Email <example@email.com>"
            id="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            id="password"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Enter confirm Password"
            id="confirmPassword"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default register;
