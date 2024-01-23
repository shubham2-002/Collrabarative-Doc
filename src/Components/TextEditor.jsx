import React, { useEffect, useRef, useState } from "react";
import { Quill } from "react-quill";
import "../App.css";

const TextEditor = ({ socketRef, roomid }) => {
  const wrappeRef = useRef();
  const [quill, SetQuill] = useState();
  const  quilRef = useRef(null)

  useEffect(() => {
    let q;
    async function init() {
      const editor = document.createElement("div");
      wrappeRef.current.append(editor);
      const q = new Quill(editor, { theme: "snow" });
     quilRef.current=q;

      const handler = (delta, oldDelta, source) => {
        if (source !== "user") return;
        socketRef.current.emit("send-changes", { delta, roomid });
      };

      q.on("text-change", handler);
      return () => {
        wrappeRef.innerHTML = "";
        quill.off("text-change", handler);
      
      };
    }

    init();
  }, []);


  useEffect(()=>{
    if(socketRef.current){
      socketRef.current.on('receive-changes',({delta})=>{
        console.log('received changes',delta)
        quilRef.current.updateContents(delta)
      })
    }
  },[socketRef.current])
  return <div id="container" ref={wrappeRef}></div>;
};

export default TextEditor;
