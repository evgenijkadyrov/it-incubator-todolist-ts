import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

type toDoListsType = {
    id: string, title: string, filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

let todoListsId1 = v1()
let todoListsId2 = v1()

function App() {
    let [todoLists, setTodoLists] = useState<Array<toDoListsType>>([
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todoListsId2, title: 'What to buy', filter: 'all'},

    ])

    let [tasks, setTasks] = useState({
            [todoListsId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoListsId2]: [
                {id: v1(), title: "milk", isDone: true},
                {id: v1(), title: "bred", isDone: true},
                {id: v1(), title: "button", isDone: false},
                {id: v1(), title: "sweet", isDone: false},
                {id: v1(), title: "coffee", isDone: false},
            ]
        }
    );

    /* let [filter, setFilter] = useState<FilterValuesType>("all");*/


    function removeTask(todoListsId: string, id: string) {
        setTasks({...tasks, [todoListsId]: tasks[todoListsId].filter(el => el.id !== id)})

        /*  let filteredTasks = tasks.filter(t => t.id != id);
          setTasks(filteredTasks);*/
    }

    function addTask(todoListsId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};

        setTasks({...tasks, [todoListsId]: [task, ...tasks[todoListsId]]})
        /*let newTasks = [task, ...tasks];
        setTasks(newTasks);*!/*/
    }

    function changeStatus(todoListsId: string, taskId: string, isDone: boolean) {
        /* let task = tasks.find(t => t.id === taskId);
         if (task) {
             task.isDone = isDone;
         }

         setTasks([...tasks]);*/
        setTasks({
            ...tasks, [todoListsId]: tasks[todoListsId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        })

    }

    function changeFilter(todoListsId: string, value: FilterValuesType) {

        setTodoLists(todoLists.map(el => el.id === todoListsId ? {...el, filter: value} : el))
    }

    function removeTodoList(todoListsId: string) {
        setTodoLists(todoLists.filter(el => el.id !== todoListsId))
        delete tasks[todoListsId]
    }

    return (
        <div className="App">

            {todoLists.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={el.id}
                        todoListsId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
