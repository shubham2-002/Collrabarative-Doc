import React, { useEffect, useRef, useState } from "react";
import { Quill } from "react-quill";
import "../App.css";

const TextEditor = ({ socketRef,roomid }) => {
  const wrappeRef = useRef();
  const [quill, SetQuill] = useState();

  useEffect(() => {
    async function init() {
      const editor = document.createElement("div");
      wrappeRef.current.append(editor);
      const q = new Quill(editor, { theme: "snow" });
      SetQuill(q);
      return () => {
        wrappeRef.innerHTML = "";
      };
    }

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socketRef.current.emit("send-changes", {delta,roomid});
    };
    quill.on("text-change", handler);

    return()=>{
      quill.off('text-change',handler)
    }

    init();
  }, []);
  return <div id="container" ref={wrappeRef}></div>;
};

export default TextEditor;
