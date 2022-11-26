import React from "react";
import "./Tasks.scss";
import penSvg from "../../assets/img/pen.svg"

const Tasks = () => {
    return (
        <div className={"tasks"}>
            <h2 className={"tasks__title"}>Hello, Category
                <img src={penSvg} alt={"Edit category name icon"}/>
            </h2>

            <div className={"tasks__items"}>
                <div className={"tasks__items-row"}>
                    <div className={"checkbox"}>
                        <input type={"checkbox"} id={"check"}/>
                        <label htmlFor={"check"}>
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000"
                                      strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                    </div>
                    <p>Learn something new, please!</p>
                </div>
            </div>
        </div>
    );
}

export default Tasks;