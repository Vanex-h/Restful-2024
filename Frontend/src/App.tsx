import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Records from "./components/Records/Records";
import SessionWrapper from "./components/SessionWrapper";
// import ChatApp from "./components/Records/tab";
function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route
            path="home"
            element={
              <div className="flex flex-col justify-center h-screen text-3xl">
                {" "}
                Hello there 👋🏽
              </div>
            }
          ></Route>
          <Route path="login" element={token ? <Navigate to={"/records"} />:<Login />}></Route>
          {/* <Route path="" element={token ? <Navigate to={"/login"} />:<Login />}></Route> */}
          <Route path ='' element={<Login />}></Route>
          <Route path="signup" element={token ? <Navigate to={"/records"} />: <Signup />}></Route>
          <Route
            path="records"
            element={
              <SessionWrapper>
                <Records />
              </SessionWrapper>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
