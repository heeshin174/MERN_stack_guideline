import { useState, useEffect } from "react";
import Link from "next/link";
import { LockClosedIcon, LoginIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../app/hooks";
import { toast } from "react-toastify";
import { loginUser, reset } from "../features/auth/authSlice";
import { useRootState } from "../app/hooks";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";

type UserLogin = {
  email: string;
  password: string;
};

const login = () => {
  const [formData, setformData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess, message } = useRootState(
    (state) => state.auth
  );

  // user, isLoading, isError, isSuccess, message 변경 시 useEffect fires off
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      // navigate to 'pages/index.tsx' page
      router.push("/");
    }

    dispatch(reset);
  }, [user, isLoading, isError, isSuccess, message]);

  const onChange = (e: React.FormEvent) => {
    setformData((prevState) => ({
      ...prevState,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(loginUser(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-full flex-col items-center justify-center py-12 px-20%">
      <div>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          <LoginIcon className="inline mx-auto h-12 w-auto pr-2 text-indigo-500" />
          Login
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Login your account
        </p>
      </div>
      <form className="mt-8 space-y-6" action="" onSubmit={onSubmit}>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link href="/password/reset">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </Link>
          </div>
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
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
