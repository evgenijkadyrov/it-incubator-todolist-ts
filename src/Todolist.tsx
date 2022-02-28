import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import styles from './TodoList.module.css'
import CheckBox from "./components/CheckBox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListId:string) => void
     changeFilter: (value: FilterValuesType, todoListId:string, ) => void
    addTask: (title: string, toDoListId:string) => void
    changeStatus: (id: string, checked: boolean, toDoListId:string) => void
    filter:FilterValuesType

}

export function Todolist(props: PropsType) {

   /* let [filter, setFilter] = useState<FilterValuesType>("all");*/

   /* let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }*/

   /* function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }*/


    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onClickAddTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Enter your name')
        }
    }
    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }
     /*const onClickFilterAllHandler = () => {
         props.changeFilter("all")
     }
     const onClickFilterActiveHandler = () => {
         props.changeFilter("active")
     }
     const onClickFilterCompletedHandler = () => {
         props.changeFilter("completed")}*/

    const onClickChangeFilterHandler = (value: FilterValuesType, todoListId:string) => {
        props.changeFilter(value,todoListId)

    }
    const onClickButtonRemoveHandler = (tid: string) => {
        props.removeTask(tid, props.id)
    }
    const onChangeStatusHandler = (tId: string, checked: boolean) => {
        props.changeStatus(tId, checked,props.id)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeInputHandler} onKeyPress={onKeyPressEnterHandler}
                   className={error ? styles.error : ''}/>
            <button onClick={onClickAddTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    /*  const onChangeStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                          props.changeStatus(t.id, e.currentTarget.checked)
                      }*/
                    return (<li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <CheckBox isDone={t.isDone} callBack={(checked: boolean) => {
                            onChangeStatusHandler(t.id, checked)
                        }}/>
                        {/* <input type="checkbox" checked={t.isDone}
                               onChange={(e) => onChangeStatusHandler(t.id, e.currentTarget.checked)}/>*/}
                        <span>{t.title}</span>
                        <button onClick={() => onClickButtonRemoveHandler(t.id)}>x</button>

                    </li>)
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? styles.activeFilter : ''}
                    onClick={() => onClickChangeFilterHandler('all', props.id)}>All
            </button>
            <button className={props.filter === 'active' ? styles.activeFilter : ''}
                    onClick={() => onClickChangeFilterHandler('active', props.id)}>Active
            </button>
            <button className={props.filter === 'completed' ? styles.activeFilter : ''}
                    onClick={() => onClickChangeFilterHandler('completed', props.id)}>Completed
            </button>

            {/*<button onClick={() => {props.changeFilter("active")}}>Active
                </button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed
                </button>*/}
        </div>
    </div>
}
