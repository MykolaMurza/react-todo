import React, {useState} from "react";
import List from "../List";
import Badge from "../Badge/Badge";
import openSvg from "../../assets/img/plus.svg";
import closeSvg from "../../assets/img/close.svg";
import "./AddList.scss";

const AddList = ({onAddList, colors}) => {
    const [visiblePopup, setVisiblePopupState] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState("");

    function onClose() {
        setVisiblePopupState(false);
        setInputValue("");
        selectColor(colors[0].id);
    }

    const addList = () => {
        if (!inputValue) {
            alert("Enter name for the category!");
            return;
        }

        const color = colors.find(color => color.id === selectedColor).name;
        onAddList({
            name: inputValue,
            colorId: selectedColor,
            id: Math.random() * 1000,
            color
        });

        onClose();
    }

    return (
        <div className={"add-list"}>
            <List items={[{
                className: "list__add-button",
                svg: <img src={openSvg} alt={"Create category icon"}/>,
                name: "Add category"
            }]}
                  onClick={() => setVisiblePopupState(!visiblePopup)}/>
            {visiblePopup && <div className={"add-list__popup"}>
                <img onClick={onClose} src={closeSvg} alt={"Close button"}
                     className={"add-list__popup-close-btn"}/>
                <input className={"field"} type={"text"} placeholder={"Category name..."} value={inputValue}
                       onChange={event => setInputValue(event.target.value)}/>
                <div className={"add-list__popup-colors"}>
                    {
                        colors.map(color => <Badge onClick={() => selectColor(color.id)} key={color.id}
                                                   color={color.name}
                                                   className={selectedColor === color.id && "active"}/>)
                    }
                </div>
                <button onClick={addList} className={"button"}>Add</button>
            </div>}
        </div>
    );
}

export default AddList;