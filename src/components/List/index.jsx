import React from "react";
import classNames from "classnames";
import Badge from "../Badge/Badge";
import "./List.scss";

const List = (props) => {
    return <ul onClick={props.onClick} className={"list"}>
        {
            props.items.map((item, index) =>
                <li key={index} className={classNames(item.className, {"active": item.active},)}>
                    <i>
                        {item.svg ? item.svg :
                            <Badge color={item.color}/>
                        }
                    </i>
                    <span>{item.name}</span>
                </li>)
        }
    </ul>
}

export default List;