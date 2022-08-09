import React from "react";
import mern from "../../images/mern.png";

const App = () => {
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "15vh",
        }}
      >
        About Book-Mania Shop
      </h1>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Since the start of the COVID pandemic people have turned to indoor
        activities that would fill their free time. One of those activities is
        reading.
      </h2>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        With the temporarily closure of phisical book shops, readers shifted
        their attention on the online.
      </h2>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Here they can buy, discuss and recommend books in a world wide
        community.
      </h2>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Book-Mania Shop was created to deliver just that.
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={mern} alt="icon" height="100px" />
      </div>
      <h4
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Designed and developed using MERN stack by Alexandru Neculaes | NCI Final
        Project
      </h4>
    </div>
  );
};

export default App;
