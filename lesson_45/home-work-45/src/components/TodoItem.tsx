import React from 'react';
import { Todo } from '../types/type';
import '../css/TodoItem.css'
import {useDispatch} from "react-redux";
import {deleteTodo, toggleTodo} from "../redux/todos/todoSlice.ts";

interface Props {
    todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
    const dispatch = useDispatch();

    return (
        <li className={'todo-item'}
            onClick={() => dispatch(toggleTodo(todo.id))}
        >
          <div className={'check-box ' + (todo.completed ? 'checked' : 'not-checked')}></div>
          <span className={todo.completed ? 'completed' : 'not-completed'}>
            {todo.text}
          </span>
                <button className={'delete-btn'}
                    onClick={(event) => {
                        event.stopPropagation();
                        dispatch(deleteTodo(todo.id));
                }}>
                </button>
        </li>
    );
};

export default TodoItem