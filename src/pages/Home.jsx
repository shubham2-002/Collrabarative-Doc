import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [RoomId, SetRoomId] = useState("");
  const [username, Setusername] = useState("");

  const navigate = useNavigate();
  
  const createNewRoom = () => {
    const Id = uuidv4();
    SetRoomId(Id);
    console.log(RoomId);
    toast.success("Room Created Succesfully");
  };

  const joinRoom = () => {
    if (!RoomId || !username) {
      toast.error("Required Username and Room Id");
      return;
    }
    navigate(`editor/${RoomId}`,{
        state:username
    })
  };

  return (
    <div className="p-6 grid place-content-center bg-[#fafafa] w-screen h-screen">
      <div className="text-center mt-16">
        <h1 className="text-4xl font-extrabold">
          <span className="block">Collabrative Document Editor</span>
          <span className="block text-emerald-500"> CDE</span>
        </h1>
        <div
          className="mt-16 flex flex-col gap-8
         shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          <h4>Paste invitation Room ID</h4>
          <div className="flex flex-col gap-4">
            <input
              className="rounded w-full py-2 px-3  focus:outline-none focus:border-green-600 border-2 "
              placeholder="ROOM ID"
              onChange={(e) => SetRoomId(e.target.value)}
              value={RoomId}
            />
            <input
              className="rounded w-full py-2 px-3  focus:outline-none focus:border-green-600 border-2 "
              placeholder="Username"
            
              onChange={(e) => Setusername(e.target.value) }
            />
            <button
              className="bg-emerald-600 text-white m-2 p-2 rounded-md w-1/5"
                onClick={() => joinRoom()}
            >
              Join
            </button>
            <p>
              If your don't have invite create{" "}
              <a
                onClick={() => createNewRoom()}
                className=" text-emerald-500 cursor-pointer hover:underline"
              >
                new room
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
