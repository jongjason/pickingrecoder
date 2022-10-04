import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Main from "./components/main/main";
import { AuthContext, authService } from "./provider/authprovider";
import Record from "./components/records/record";

function App() {
  return (
    <div className="app">
      <AuthContext.Provider value={authService}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/main/history" element={<Record />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
