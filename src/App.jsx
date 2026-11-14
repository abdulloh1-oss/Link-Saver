import { useState } from "react";
import LinkForm from "./Components/LinkForm";
import LinkList from "./Components/LinkList";

function App() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-center text-[40px] mb-4 tracking-[6px]  uppercase">
        Link Saver
      </h1>
      <LinkForm />
      <LinkList />
    </div>
  );
}

export default App;
