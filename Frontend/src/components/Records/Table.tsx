import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import "./../../App.css";
import BookTable from "./BookTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
}

const Table = () => {
  const [viewDialog, setViewDialog] = useState(false);
  const [booknber, setBookNber] = useState("");
  const [books, setBook] = useState<Book>();
  const [username, setUsername] = useState("");
  const bookNumber = async () => {
    const response = await fetch("http://localhost:1500/books/total", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setBookNber(data.totalBooks);
    console.log("========>", booknber);
  };

  useEffect(() => {
    bookNumber();
  }, []);

  const userProfile = async () => {
    const response = await fetch("http://localhost:1500/users/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setUsername(data.user.firstName);
    console.log("========>", username);
  };

  useEffect(() => {
    userProfile();
  }, []);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:1500/books", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setBook(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBooks();
  }, []);

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="h-screen w-[100%] ">
      <ToastContainer />
      <div className="w-full h-[10%] flex xs:flex-col  sm:flex-col lg:flex-row justify-around bg-white border-x-4 border-[#f0f1f3]">
        <div className=" h-full flex flex-col text-lg justify-center text-[#0469a3c2] font-semibold">
          BOOK TABLE
        </div>
        <div className=" h-full text-sm flex flex-col justify-center">
          <div>
            <span>Hello there 👋,</span>{" "}
            <span className="text-gray-800 font-semibold">{username}</span>
          </div>
        </div>
      </div>
      <div className="py-3 px-2 h-[90%] text-[#48505E] flex flex-col ">
        <div className="bg-white h-44 lg:h-20 flex flex-col md:flex-row lg:flex-row justify-evenly lg:justify-around p-3 items-center">
          <input
            type="text"
            placeholder="Search book "
            className="border rounded-md p-3 focus:outline-none h-11 text-sm w-60"
            onChange={(e) => setInputValue(e.target.value)}
          />

          <h2 className=" font-medium text-[#444444] text-sm mt-1 lg:mt-0">
            <span className="text-[#000]">
              Total Books :{" "}
              <span className="text-[#0469a3c2] text-lg">{booknber}</span>
            </span>
          </h2>
        </div>
        <div className="w-full flex content-center justify-center">
          <div className="w-full">
            <BookTable bookData={books} inputValue={inputValue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
