import React, {useEffect, useState} from "react";
import axios from "axios";
import List from "../List";
import Badge from "../Badge";
import openSvg from "../../assets/img/plus.svg";
import closeSvg from "../../assets/img/close.svg";
import "./AddList.scss";

const AddList = ({onAddList, colors}) => {
    const [visiblePopup, setVisiblePopupState] = useState(false);
    const [selectedColor, selectColor] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (Array.isArray(colors))
            selectColor(colors[0].id);
    }, [colors]);

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

        setLoading(true);
        axios.post("http://localhost:3001/lists", {
            name: inputValue,
            colorId: selectedColor
        }).then(({data}) => {
            const color = colors.find(color => color.id === selectedColor).name;
            const newList = {...data, color}
            onAddList(newList);
            onClose();
        }).finally(() => {
            setLoading(false);
        });
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
                       onChange={event => setInputValue(event.target.value)} onKeyDown={(e) => {
                    if (e.key === "Enter") addList()
                }}/>
                <div className={"add-list__popup-colors"}>
                    {colors.map(color => <Badge onClick={() => selectColor(color.id)} key={color.id}
                                                color={color.name}
                                                className={selectedColor === color.id && "active"}/>)}
                </div>
                <button onClick={addList} className={"button"}>
                    {isLoading ? "Adding..." : "Create"}
                </button>
            </div>}
        </div>
    );
}

export default AddList;