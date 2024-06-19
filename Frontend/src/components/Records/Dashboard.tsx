import { useEffect, useState } from "react";
import { FiLogOut, FiHome } from "react-icons/fi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const userProfile = async () => {
    const response = await fetch("http://localhost:1500/users/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setUsername(data.user.email);
    console.log("========>", username);
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div
        className={`fixed inset-0 z-30 md:relative h-full flex flex-col bg-white shadow-lg rounded p-2 md:w-1/4 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full w-full justify-center ">
          <div className="flex justify-between w-full md:hidden">
            <span className="text-[#0469a3c2] font-extrabold">
              RCA Library Management System
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-[#0469a3c2] md:hidden"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          <div className="h-[50%] flex flex-col justify-center gap-y-12 mt-4 md:mt-0">
            <span className="hidden md:block text-[#0469a3c2] font-extrabold  text-xl">
            RCA Library Management System
            </span>
            <button
              className="w-full h-10 flex flex-row bg-[#0469a3c2] text-white items-center justify-start px-4 rounded"
              onClick={() => navigate("/records")}
            >
              <FiHome />
              <h1 className="cursor-pointer px-2 text-sm">Dashboard</h1>
            </button>
          </div>
          <div className="w-full flex items-end h-[50%]">
            <button
              className="px-4 flex flex-row items-center w-full text-[#0469a3c2]"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
                window.location.reload();
              }}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
        <div className="h-[20%]"></div>
      </div>
      <div className="flex-grow md:w-3/4">
        <div className="md:hidden flex justify-between p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#0469a3c2]"
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
        <div className="h-[90%] w-full border-x-4 border-[#f0f1f3]">
          <Table />
        </div>
      </div>
      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
