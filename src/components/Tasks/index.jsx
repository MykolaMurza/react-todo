// Libraries:
import React from "react";
import axios from "axios";
// Project files:
import AddTask from "../AddTask"
import Task from "../Task";
import penSvg from "../../assets/img/pen.svg"
import "./Tasks.scss";

const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask, withoutEmpty}) => {
    const editTitle = () => {
        const newTitle = prompt("Enter new category title", list.name);
        if (newTitle) {
            axios
                .patch("http://localhost:3001/lists/" + list.id, {name: newTitle})
                .then(onEditTitle(list.id, newTitle))
                .catch(reason => alert(reason.message));
        }
    }

    return (
        <div className={"tasks"}>
            <h2 style={{color: list.color.hex}} className={"tasks__title"}> {list.name}
                <img onClick={editTitle} src={penSvg} alt={"Edit category name icon"}/>
            </h2>

            <div className={"tasks__items"}>
                {!withoutEmpty && !list.tasks.length && <h2>There is no tasks!</h2>}
                {list.tasks.map(task =>
                    <Task key={task.id}
                          listId={list.id}
                          task={task}
                          onRemove={onRemoveTask}
                          onEdit={onEditTask}
                          onComplete={onCompleteTask}/>
                )}
                <AddTask list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    );
}

export default Tasks;
