// Libraries:
import React from "react";
// Project files:
import trashSvg from "../../assets/img/trash.svg"
import penSvg from "../../assets/img/pen.svg"
import "./Task.scss";

const Task = ({listId, task, onRemove, onEdit, onComplete}) => {
    const onChangeCheckbox = (e) => {
        onComplete(listId, task, e.target.checked);
    }

    return (
        <div className={"tasks__items-row"}>
            <div className={"checkbox"}>
                <input onChange={onChangeCheckbox} type={"checkbox"} id={`task-${task.id}`} checked={task.completed}/>
                <label htmlFor={`task-${task.id}`}>
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000"
                              strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
            </div>
            <p>{task.text}</p>
            <div className={"tasks__items-row-actions"}>
                <div>
                    <img onClick={() => onEdit(listId, task)} src={penSvg} alt={"Edit task icon"}/>
                </div>
                <div>
                    <img onClick={() => onRemove(listId, task.id)} src={trashSvg} alt={"Remove icon"}/>
                </div>
            </div>
        </div>
    );
}

export default Task;
