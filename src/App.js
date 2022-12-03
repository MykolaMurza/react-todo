// Libraries:
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
// Project files:
import {AddList, List, Tasks} from "./components/Component"
import listSvg from "./assets/img/list.svg";

function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeList, setActiveList] = useState(null);
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({data}) => {
            data = data.map(data => {
                return data;
            });
            setLists(data);
        });
        axios.get("http://localhost:3001/colors").then(({data}) => {
            setColors(data);
        });
    }, []);

    useEffect(() => {
        const listId = location.pathname.split("lists/")[1];
        if (lists) {
            const list = lists.find(list => list.id === Number(listId));
            setActiveList(list);
        }
    }, [lists, location.pathname])

    const onAddList = (list) => {
        list.tasks = [];
        const newList = [...lists, list];
        setLists(newList);
    }

    const onAddTask = (listId, task) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = [...list.tasks, task];
            }
            return list;
        });
        setLists(newList);
    }

    const onRemoveTask = (listId, taskId) => {
        if (window.confirm("Are you sure?")) {
            axios
                .delete("http://localhost:3001/tasks/" + taskId)
                .then(() => {
                    const newList = lists.map(list => {
                        if (list.id === listId) {
                            list.tasks = list.tasks.filter(task => task.id !== taskId);
                        }

                        return list;
                    })
                    setLists(newList);
                })
                .catch(reason => alert(reason.message));
        }
    }

    const onEditTask = (listId, oldTask) => {
        const newTaskText = window.prompt("New oldTask text", oldTask.text);

        if (newTaskText) {
            const newTask = {
                "listId": listId,
                "text": newTaskText,
                "completed": oldTask.completed,
                "id": oldTask.id
            }
            axios
                .patch("http://localhost:3001/tasks/" + oldTask.id, {text: newTaskText})
                .then(() => {
                    const newList = lists.map(list => {
                        if (list.id === listId) {
                            list.tasks = list.tasks.map(task => {
                                if (task.id === oldTask.id) task = newTask;
                                return task;
                            });
                        }
                        return list;
                    })
                    setLists(newList);
                })
                .catch(reason => alert(reason.message));
        }
    }

    const onCompleteTask = (listId, oldTask, completed) => {
        console.log(listId, oldTask, completed);

        const newTask = {
            "listId": listId,
            "text": oldTask.text,
            "completed": completed,
            "id": oldTask.id
        }
        axios
            .patch("http://localhost:3001/tasks/" + oldTask.id, {completed: completed})
            .then(() => {
                const newList = lists.map(list => {
                    if (list.id === listId) {
                        list.tasks = list.tasks.map(task => {
                            if (task.id === oldTask.id) task = newTask;
                            return task;
                        });
                    }
                    return list;
                })
                setLists(newList);
            })
            .catch(reason => alert(reason.message));
    }

    const onEditListTitle = (id, newTitle) => {
        const newList = lists.map(list => {
            if (list.id === id) {
                list.name = newTitle;
            }
            return list;
        })
        setLists(newList);
    }

    return (
        <div className={"todo"}>
            <div className={"todo__sidebar"}>
                <List items={[{
                    svg: <img src={listSvg} alt={"Category list"}/>, name: "Categories"
                }]} onCategoryClick={() => {
                    navigate("/");
                }}/>
                {lists ? (<List items={lists} onRemove={id => {
                    const newList = lists.filter(item => item.id !== id);
                    setLists(newList);
                }} onCategoryClick={(chosenList) => {
                    navigate(`/lists/${chosenList.id}`);
                }} activeList={activeList} isRemovable={true}/>) : ("Loading...")}
                <AddList onAddList={onAddList} colors={colors}/>
            </div>
            <div className="todo__tasks">
                <Routes>
                    <Route exact path={"/"} element={lists &&
                        lists.map(list =>
                            <Tasks key={list.id}
                                   list={list}
                                   onEditTitle={onEditListTitle}
                                   onAddTask={onAddTask}
                                   onRemoveTask={onRemoveTask}
                                   onEditTask={onEditTask}
                                   onCompleteTask={onCompleteTask}
                                   withoutEmpty/>
                        )
                    }/>
                    <Route path="/lists/:id" element={lists && activeList &&
                        <Tasks list={activeList}
                               onEditTitle={onEditListTitle}
                               onAddTask={onAddTask}
                               onRemoveTask={onRemoveTask}
                               onEditTask={onEditTask}
                               onCompleteTask={onCompleteTask}/>
                    }/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
