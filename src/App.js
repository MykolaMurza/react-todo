import React from 'react';
import List from './components/List'

function App() {
    return (
        <div className={"todo"}>
            <div className={"todo__sidebar"}>
                <List items={[
                    {
                        svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>,
                        name: "Categories"
                    }
                ]}/>
                <List items={[
                    {
                        color: "green",
                        name: "Work"
                    },
                    {
                        color: "blue",
                        name: "Education",
                        active: true
                    },
                    {
                        color: "pink",
                        name: "Ideas"
                    },
                    {
                        color: "lightgreen",
                        name: "Books"
                    }
                ]}/>
            </div>
            <div className={"todo__tasks"}>

            </div>
        </div>
    );
}

export default App;
