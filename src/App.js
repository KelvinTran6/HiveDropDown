import "./App.css";
import React, { useState } from "react";
import { DropDown } from "./components/DropDown.tsx"

export default function App() {
  const data = {
    options: [
      "test2",
      "meow",
      "123",
      "more",
      "kelvin",
      "smelvin",
      "tom",
      "psyduck",
      "kelvin",
      "smelvin",
      "tom",
      "kelvin",
      "smelvin",
      "tom",
      "psyduck",
      "kelvin",
      "smelvin",
      "tom",
      "psyduck",
      "kelvin",
      "smelvin",
      "tom",
      "psyduck",
    ],
  };

  const [selected, setSelected] = useState([]);

  const multiple = true; // Change to false for single selection mode

  return (
    <div className="App">
      <DropDown
          options={data.options}
          selectedItems={selected}
          onSelectedItemsChange={setSelected}
          multipleSelection={multiple}
      />
      <button onClick={() => console.log(selected)}>submit</button>
    </div>
  );
}
