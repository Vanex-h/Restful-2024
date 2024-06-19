import React, { FormEvent, useEffect, useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const SignupLeft = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errr, setError] = useState("");
  const navigate = useNavigate();

  const signUp = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1500/users/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      toast.success("Signed Up successfully ");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    else if(response.status === 400){
      setError("Email already exists");
      setTimeout(() => {
        setError("");
      }, 3000);

    } else {
      setError("Could not create user");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="bg-white w-[60%] lg:h-full p-8">
      <div className="leading-6 mx-auto w-[85%] ">
        <h1 className="text-[#0469a3c2] text-2xl lg:font-bold py-4 ">
          Sign Up <span className="text-[#0469a3c2]"></span>
        </h1>
      </div>
      <div className="mx-auto w-[85%] pt-3 flex flex-col justify-evenly h-[40%] gap-4">
        <form className="h-[60%] flex flex-col justify-evenly" method="POST">
          <div className="">
                
              <input
                className="outline-none p-3 bg-[#F6F6F6] mb-6 w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2"
                type="text"
                placeholder="First Name"
                required
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
               
              />
            </div>
          <div className="">
            <input
              className="outline-none p-3 bg-[#F6F6F6] mb-6 w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2"
              type="text"
              placeholder="Last Name"
              required
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="">
                
                <input
                className="outline-none p-3 bg-[#F6F6F6] mb-6 w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2"
                type="text"
                placeholder="Email Address"
                required
                name="email"
                onChange={(e) => setEmail(e.target.value)}
               
              />
            </div>

          <div className="">
            <div className=" h-fit relative flex items-center justify-end">
              <input
                className="outline-none p-3 bg-[#F6F6F6] w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required
                name="password"
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="text-red-400">{errr}</div>
          <button
            className="h-[70px] mt-3 focus:outline-none p-3 bg-[#0469a3c2] text-[white] text-center border-0 rounded-none font-bold"
            onClick={signUp}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="w-[85%] mx-auto flex justify-center inset-x-0 h-[80%]">
        <div className="w-full flex justify-end">
          <section className="w-[85%] self-center bg-transparent">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0469a3c2]">
              {" "}
              Log in
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
export default SignupLeft;

