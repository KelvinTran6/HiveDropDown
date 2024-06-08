import "./App.css";
import React, { useState } from "react";
import { DropDown } from "./components/DropDown/DropDown.tsx"

export default function App() {
  const data = {
    options: [
      "John",
      "Emily",
      "Michael",
      "Sarah",
      "David",
      "Emma",
      "Matthew",
      "Olivia",
      "Daniel",
      "Sophia",
      "Christopher",
      "Ava",
      "William",
      "Isabella",
      "Joseph",
      "Mia",
      "James",
      "Charlotte",
    ]
  };

  const [selectedValues, setSelectedValues] = useState([]);
  const [selected, setSelected] = useState([]);

  return (
    <div className="App">
      <div className="title">
        <h1>Dropdown Examples</h1>
      </div>
      <div className="DropDownContainer">
        <DropDown
            className="DropDown"
            options={data.options}
            selectedItems={selectedValues}
            onSelectedItemsChange={setSelectedValues}
            multipleSelection={true}
            placeHolder="Select many..."
        />
        <DropDown
            className="DropDown"
            options={data.options}
            selectedItems={selected}
            onSelectedItemsChange={setSelected}
            multipleSelection={false}
            placeHolder="Select one..."
        />
      </div>
      <button className="button" onClick={() => console.log("Multi-select:", selectedValues, "| Single-selected:", selected)}>print to console</button>
    </div>
  );
}
