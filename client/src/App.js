
import React from "react";
import  Title from "./components/Title";
import GlobalGrid from "./components/GlobalGrid";


function App() {

  return (

      <div className="bg-gradient-to-r from-[#0e0327] to-[#3533cd] h-screen p-24 overflow-hidden flex flex-col justify-evenly">
        <Title />
        <GlobalGrid />
      </div>
  );
}

export default App;
