// Libraries:
import React, {useState} from "react";
import axios from "axios";
// Project files:
import plusSvg from "../../assets/img/plus.svg";
import "./AddTask.scss";

const AddTask = ({list, onAddTask}) => {
    const [formVisible, setFormVisibility] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isSubmittingNewTask, setSubmittingNewTaskStatus] = useState(false);

    const toggleFormVisible = () => {
        setFormVisibility(!formVisible);
        setInputValue("");
    }

    const addTask = () => {
        if (inputValue) {
            setSubmittingNewTaskStatus(true);
            const task = {
                "listId": list.id,
                "text": inputValue,
                "completed": false
            }
            axios
                .post("http://localhost:3001/tasks", task)
                .then(({data}) => {
                    onAddTask(list.id, data);
                    toggleFormVisible()
                })
                .catch(reason => alert(reason.message))
                .finally(() => setSubmittingNewTaskStatus(false));
        }
    }

    return (
        <div className={"tasks__form"}>
            {!formVisible ?
                <div className={"tasks__form-new"} onClick={toggleFormVisible}>
                    <img src={plusSvg} alt={"Add new task"}/>
                    <span>New task</span>
                </div>
                :
                <div className={"tasks__form-block"}>
                    <input value={inputValue} className={"field"} type={"text"}
                           placeholder={"Your awesome task..."}
                           onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button disabled={isSubmittingNewTask} className={"button"} onClick={addTask}>
                        {isSubmittingNewTask ? "Wait..." : "Add task"}
                    </button>
                    <button className={"button button-cancel"} onClick={toggleFormVisible}>Cancel</button>
                </div>
            }
        </div>
    );
}

export default AddTask;
