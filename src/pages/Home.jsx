import React from "react";

const Home = () => {
  return (
    <div className="p-6 grid place-content-center bg-[#fafafa]">
      <div className="text-center mt-16">
        <h1 className="text-4xl font-extrabold">
          <span className="block">Collabrative Document Editor</span>
          <span className="block text-emerald-500"> CDS</span>
        </h1>
        <div
          className="mt-16 flex flex-col gap-8
         shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          <h4>Paste invitation Room ID</h4>
          <div className="flex flex-col gap-4">
            <input
              className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 border-2 "
              placeholder="ROOM ID"
            />
            <input
              className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 border-2 "
              placeholder="Username"
            />
            <button className="bg-emerald-600 text-white m-2 p-2 rounded-md w-1/5">
              Join
            </button>
            <p>
              If your don't have invite create{" "}
              <a className=" text-emerald-500">new room</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
