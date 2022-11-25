import React, {useState} from "react";
import List from "../List";
import Badge from "../Badge/Badge";
import openSvg from "../../assets/img/plus.svg";
import closeSvg from "../../assets/img/close.svg";
import "./AddList.scss";

const AddList = ({colors}) => {
    const [visiblePopup, setVisiblePopupState] = useState(false);
    const [selectedColor, selectColor] = useState(null);

    return (<div className={"add-list"}>
        <List items={[{
            className: "list__add-button",
            svg: <img src={openSvg} alt={"Create category icon"}/>,
            name: "Add category"
        }]}
              onClick={() => setVisiblePopupState(!visiblePopup)}/>
        {visiblePopup && <div className={"add-list__popup"}>
            <img onClick={() => setVisiblePopupState(false)} src={closeSvg} alt={"Close button"}
                 className={"add-list__popup-close-btn"}/>
            <input className={"field"} type={"text"} placeholder={"Category name..."}/>
            <div className={"add-list__popup-colors"}>
                {
                    colors.map(color => <Badge onClick={() => selectColor(color.id)} key={color.id} color={color.name}
                                               className={selectedColor === color.id && "active"}/>)
                }
            </div>
            <button className={"button"}>Add</button>
        </div>}
    </div>);
}

export default AddList;