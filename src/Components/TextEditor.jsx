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

  
    init();
  }, []);
  return <div id="container" ref={wrappeRef}></div>;
};

export default TextEditor;
