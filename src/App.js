import React, {useEffect, useState} from "react";
import axios from "axios";
import {AddList, List, Tasks} from "./components/Component"
import listSvg from "./assets/img/list.svg";

function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeList, setActiveList] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({data}) => {
            data = data.map(data => {
                data["color"] = data.color.name;
                return data;
            });
            setLists(data);
        });
        axios.get("http://localhost:3001/colors").then(({data}) => {
            setColors(data);
        });
    }, []);

    const onAddList = (item) => {
        item.tasks = [];
        const newList = [...lists, item];
        setLists(newList);
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
                }]}/>
                {lists ? (<List items={lists} onRemove={id => {
                    const newList = lists.filter(item => item.id !== id);
                    setLists(newList);
                }} onCategoryClick={(chosenList) => {
                    setActiveList(chosenList);
                }} activeList={activeList} isRemovable={true}/>) : ("Loading...")}
                <AddList onAddList={onAddList} colors={colors}/>
            </div>
            <div className={"todo__tasks"}>
                {lists && activeList && <Tasks list={activeList} onEditTitle={onEditListTitle}/>}
            </div>
        </div>
    );
}

export default App;
