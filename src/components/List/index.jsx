import React from "react";
import axios from "axios";
import classNames from "classnames";
import Badge from "../Badge";
import trashSvg from "../../assets/img/trash.svg"
import "./List.scss";

const List = (props) => {
    const onRemoveList = (item) => {
        if (window.confirm("Are you sure?")) {
            axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
                props.onRemove(item.id)
            });
        }
    }

    return (
        <ul onClick={props.onClick} className={"list"}>
            {props.items.map((item, index) =>
                <li key={index} className={classNames(item.className,
                    {active: props.activeList && props.activeList.id === item.id})}
                    onClick={props.onCategoryClick ? () => props.onCategoryClick(item) : null}>
                    <i>{item.svg ? item.svg : <Badge color={item.color.name}/>}</i>
                    <span>
                            {item.name}
                        {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}
                        </span>
                    {props.isRemovable && <img src={trashSvg} alt={"Remove icon"} className={"list__remove-icon"}
                                               onClick={() => onRemoveList(item)}/>}
                </li>)}
        </ul>
    );
}

export default List;
