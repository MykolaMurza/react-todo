import React from 'react';
import './List.scss'

const List = (props) => {
    return <ul className={"list"}>
        {
            props.items.map(item =>
                <li className={item.active ? "active" : ""}>
                    <i>
                        {item.svg ? item.svg :
                            <i className={`badge badge--${item.color}`}></i>
                        }
                    </i>
                    <span>{item.name}</span>
                </li>)
        }
    </ul>
}

export default List;