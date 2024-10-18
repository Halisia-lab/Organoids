
import React from "react";
import  Title from "./components/Title";
import GlobalGrid from "./components/GlobalGrid";


function App() {

  return (
<div className="h-screen ">
<div className=" min-h-full bg-gradient-to-r from-[#0e0327] to-[#3533cd] p-10 flex flex-col ">
        <Title />
        <GlobalGrid />
      </div>
</div>
      
  );
}

export default App;
