import React, { useState, useRef, useEffect } from "react";
import "./DropDown.css";
import upArrow from './up-arrow-svgrepo-com.svg';


interface DropDownProps {
    options: string[];
    selectedItems?: number[];
    onSelectedItemsChange: (selectedItems: number[]) => void;
    multipleSelection: boolean;
}

export const DropDown: React.FC<DropDownProps> = ({ options = [], selectedItems = [], onSelectedItemsChange, multipleSelection }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const dropDownRef = useRef<HTMLDivElement>(null);

    const handleSelection = (index: number): void => {
        let newSelectedItems: number[];
        if (multipleSelection) {
            newSelectedItems = selectedItems.includes(index)
                ? selectedItems.filter((item) => item !== index)
                : [...selectedItems, index];
            setSelectAll(newSelectedItems.length === options.length);
        } else {
            newSelectedItems = [index];
            setOpen(false);
        }
        onSelectedItemsChange(newSelectedItems);
    };

    const handleSelectAll = (): void => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        onSelectedItemsChange(newSelectAll ? options.map((_, i) => i) : []);
    };

    useEffect(() => { // if single selection mode scroll to what the user selected previously
        if (open && !multipleSelection) {
            const selectedElement = dropDownRef.current?.querySelector<HTMLDivElement>(
                `[data-index="${selectedItems[0]}"]`
            );
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }
    }, [open, selectedItems, multipleSelection]);

    useEffect(() => { // closes dropdown when user clicks away
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="DropDown" ref={dropDownRef}>
            <div className="CurrentSelected" onClick={() => setOpen(!open)}>
                {multipleSelection
                    ? selectedItems.map((index) => options[index]).join(", ") || "Select..."
                    : options[selectedItems[0]] || "Select..."}
                <img className={"Icon " + (open ? "open" : "")} src={upArrow} alt="SVG Icon" />
            </div>
            {open && (
                <div className="DropDownOptions">
                    {multipleSelection && (
                        <DropDownElement
                            item={"Select All"}
                            handleClick={handleSelectAll}
                            selected={selectAll}
                            multiple={multipleSelection}
                        />
                    )}
                    {options.map((item, index) => (
                        <DropDownElement
                            index={index}
                            key={index}
                            item={item}
                            handleClick={handleSelection}
                            selected={selectedItems.includes(index)}
                            multiple={multipleSelection}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface DropDownElementProps {
    item: string;
    index?: number;
    selected: boolean;
    handleClick: (index: number) => void;
    multiple: boolean;
}

const DropDownElement: React.FC<DropDownElementProps> = ({ item, index = -1, selected, handleClick, multiple }) => {
    return (
        <div
            className={"DropDownElement " + (selected ? "selected" : "")}
            onClick={() => handleClick(index)}
            data-index={index}
        >
            {multiple && (
                <input
                    className="Box"
                    type="checkbox"
                    checked={selected}
                    readOnly
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick(index);
                    }}
                />
            )}
            {item}
        </div>
    );
};

export default DropDown;
