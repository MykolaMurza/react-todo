import React, {useState} from "react";
import List from "./components/List";
import AddList from "./components/AddList";
import listSvg from "./assets/img/list.svg";
import DB from "./assets/db.json";

function App() {
    const [lists, setLists] = useState(
        DB.lists.map((item) => {
            item["color"] = DB.colors.filter(color => color.id === item["colorId"])[0].name;
            return item;
        })
    );

    const onAddList = (item) => {
        const newList = [...lists, item];
        setLists(newList);
    }

    return (
        <div className={"todo"}>
            <div className={"todo__sidebar"}>
                <List items={[{
                    svg: <img src={listSvg} alt={"Category list"}/>,
                    name: "Categories"
                }]}/>
                <List items={lists} onRemove={item => {
                    const newList = lists.filter(elem => elem.id !== item.id);
                    setLists(newList);
                }} isRemovable={true}/>
                <AddList onAddList={onAddList} colors={DB.colors}/>
            </div>
            <div className={"todo__tasks"}>

            </div>
        </div>
    );
}

export default App;
