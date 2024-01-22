import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={true}></Toaster>
      </div>
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomid" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
