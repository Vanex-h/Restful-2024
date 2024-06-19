import React, { FormEvent, useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginRight = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1500/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully ");
      setTimeout(() => {
        navigate("/records");
      }, 1000);
    } else {
      seterror("Invalid credentials");
      setTimeout(() => {
        seterror("");
      }, 1000);
      toast.error("Failed to login");
      setTimeout(() => {
      }, 500);
    }
  };

  return (
    <div className="bg-white w-[60%] lg:h-full p-8">
      <ToastContainer />
      <div className="leading-6 mx-auto w-[85%] ">
        <h1 className="text-[#0469a3c2] text-2xl lg:font-bold py-4 ">
         
          Login <span className="text-[#0469a3c2]"></span>
        </h1>
      </div>
      <div className="mx-auto w-[85%] pt-3 flex flex-col justify-evenly h-[40%] gap-4">
        <form className="h-fit flex flex-col justify-evenly" onSubmit={login}>
          <div className="">
            <input
              className="outline-none p-3 bg-[#F6F6F6] mb-6 w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2"
              type="text"
              placeholder="Email Address"
              required
              name="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="">
            <div className="h-fit relative flex items-center justify-end">
              <input
                className="outline-none p-3 bg-[#F6F6F6] w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required
                name="password"
                onChange={(e) => setpassword(e.target.value)}
              />
              {passwordVisible ? (
                <FiEyeOff
                  className="w-5 h-5 text-gray-500 absolute self-center top-5 right-7"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                />
              ) : (
                <FiEye
                  className="w-5 h-5 text-gray-500 absolute self-center top-5 right-7"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                />
              )}
            </div>
          </div>
          <div className="text-red-400">{error}</div>
          <div className="w-[85%] pl-4 text-[#0469a3c2] m-3 cursor-pointer">
           
          </div>
          <button
            className="cursor-pointer focus:outline-none p-3 bg-[#0469a3c2] text-[white] text-center border-0 rounded-none font-bold"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-[85%] mx-auto flex justify-center inset-x-0 h-[80%]">
        <div className="w-full flex justify-end">
          <section className="w-[85%] self-center bg-transparent">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#0469a3c2]">
              Sign up
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginRight;
