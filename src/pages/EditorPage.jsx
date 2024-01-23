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
import TextEditor from "../Components/TextEditor";

const EditorPage = () => {
 
  const [userList, SetuserList] = useState([]);
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

      try {
        socketRef.current.on(
          Action.JOINED,
          ({ clients, username, socketId }) => {
            if (username !== location.state) {
              toast.success(`${username} joined the room`);
              // console.log(`${username} joined`)
            }
            SetuserList(clients);
            console.log(userList, "clinet jpied");
          }
        );
      } catch (error) {
        console.log(error);
      }

      socketRef.current.on(Action.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        SetuserList((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    return ()=>{
      socketRef.current.disconnect();
      socketRef.current.off(Action.JOIN);
      socketRef.current.off(Action.DISCONNECTED);
    }
  }, []);

  const leaveRoom = () => {
    navigate("/");
  };

  const copyRoomId= async()=>{
    try{
      await navigator.clipboard.writeText(roomid)
      toast.success('Copied to Clipboard')
    }catch(error){
      console.log(error)
      toast.error('Failed to Copy Room ID')
    }
  }

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
              <Users username={user.username} key={user.socketId} />
            ))}
          </div>
        </div>
        <div className="relative top-80">
          <button
            className="bg-emerald-600 w-full text-white m-2 p-2 rounded-md"
            onClick={() => copyRoomId()}
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
       <TextEditor socketRef={socketRef} roomid={roomid}/>
      </div>
    </div>
  );
};

export default EditorPage;
