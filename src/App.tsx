import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = { id: string, title: string, filter: FilterValuesType }

function App() {

   /* let [tasksObj, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);*/

    function removeTask(id: string,toDoListId:string) {
        let tasks=tasksObj[toDoListId]
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[toDoListId]=filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, toDoListId:string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks=tasksObj[toDoListId]
        let newTasks=[newTask,...tasks]
        tasksObj[toDoListId]=newTasks
        setTasks({...tasksObj})
    }

    /* let [filter, setFilter] = useState<FilterValuesType>("all");*/


    function changeFilter(value: FilterValuesType, toDoListId: string) {
       let newTodoList= todoList.find(el=>(toDoListId===el.id))
        if(newTodoList)
            newTodoList.filter=value
        setTodoList([...todoList])
    }

    const changeStatus = (tasksID: string, checked: boolean, toDoListId:string) => {
        let tasksNew=tasksObj[toDoListId]
          let task = tasksNew.find(el => el.id === tasksID)
          if (task) { task.isDone = checked
              setTasks({...tasksObj})
          }



    }
    let toDoTaskId1=v1()
    let toDoTaskId2=v1()
    let [todoList,setTodoList ]=useState<Array<TodoListType>>( [
        {id: toDoTaskId1, title: 'What to learn', filter: 'active'},
        {id: toDoTaskId2, title: 'What to buy', filter: 'completed'},
    ]
    )
    let[tasksObj,setTasks]=useState({
        [toDoTaskId1]:[ {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},],
    [toDoTaskId2]:[
        {id: v1(), title: "milk", isDone: true},
        {id: v1(), title: "bread", isDone: true},
        {id: v1(), title: "maslo", isDone: false},
        {id: v1(), title: "fruit", isDone: false},

    ]
    })
    return (
        <div className="App">
            {
                todoList.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        changeStatus={changeStatus}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={tl.filter}
                    />
                })
            }


        </div>
    );

}

export default App;
