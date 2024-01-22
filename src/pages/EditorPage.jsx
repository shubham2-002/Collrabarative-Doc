import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { intiSocket } from "../socket";

import Logo from "../assets/logo";
import Users from "../Components/Users";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import toast from "react-hot-toast";
import Action from "../Action";

const EditorPage = () => {
  const dummyData = [
    { id: 1, username: "JohnDoe" },
    { id: 2, username: "AliceSmith" },
    { id: 3, username: "BobJohnson" },
    { id: 4, username: "EveWilshubham" },
    { id: 5, username: "EveWilshubham" },
    { id: 6, username: "EveWilshubham" },
    { id: 7, username: "EveWilshubham" },

    // Add more data as needed
  ];
  const [userList, SetuserList] = useState(dummyData);
  const [value, setValue] = useState("");

  const { roomid } = useParams();

  const socketRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handelerror = (error) => {
    console.log("Socket error ", error);
    toast.error("Connection Filed please try again later.");
    navigate("/");
  };

  useEffect(() => {
    const init = async () => {
      console.log(location.state);
      try {
        socketRef.current = await intiSocket();
        socketRef.current.on("connect_error", (err) => handelerror(err));
        socketRef.current.on("connect_failed", (err) => handelerror(err));

        socketRef.current.emit(Action.JOIN, {
          roomid,
          username: location.state,
        });
      } catch (error) {
        console.error("error in socket ", error);
      }

      socketRef.current.on(
        Action.JOINED,
        ({ clients, username, socketId }) => {
          if(username!==location.state.username){
            toast.success(`${username} joined the room`)
            console.log(`${username} joined`)
           
          }
        }
      );
    };

    init();
  }, []);

  const leaveRoom = () => {
    toast(`${location.state} leaved room`);
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-[#fafafa] grid grid-cols-[.5fr,2fr]">
      <div className=" border-r-2 border-b-[#e2e8f0] p-8">
        <div className="border-b-2 pb-4 border-b-slate-200 mb-4 ">
          <Logo />
        </div>
        <div className="">
          <h2 className="text-xl">Connected Users..</h2>
          <div className="grid grid-cols-3 gap-6 mt-4  ">
            {userList.map((user) => (
              <Users username={user.username} key={user.id} />
            ))}
          </div>
        </div>
        <div className="relative top-36">
          <button
            className="bg-emerald-600 w-full text-white m-2 p-2 rounded-md"
            onClick={() => console.log(roomid)}
          >
            Coppy Room ID
          </button>
          <button
            className="bg-red-600 w-full text-white m-2 p-2 rounded-md"
            onClick={() => leaveRoom()}
          >
            Leave
          </button>
        </div>
      </div>
      <div className="container">
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default EditorPage;
