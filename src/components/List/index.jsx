import React from "react";
import classNames from "classnames";
import Badge from "../Badge";
import trashSvg from "../../assets/img/trash.svg"
import "./List.scss";
import axios from "axios";

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
            {
                props.items.map((item, index) =>
                    <li key={index} className={classNames(item.className, {"active": item.active},)}>
                        <i>
                            {item.svg ? item.svg :
                                <Badge color={item.color}/>
                            }
                        </i>
                        <span>{item.name}</span>
                        {props.isRemovable && <img src={trashSvg} alt={"Remove icon"} className={"list__remove-icon"}
                                                   onClick={() => onRemoveList(item)}/>}
                    </li>)
            }
        </ul>
    );
}

export default List;