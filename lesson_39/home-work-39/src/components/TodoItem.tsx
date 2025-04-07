import React from 'react';
import { Todo } from '../types/type';
import '../css/TodoItem.css'

interface Props {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
    return (
        <li className={'todo-item'}
            onClick={() => onToggle(todo.id)}
        >
          <div className={'check-box ' + (todo.completed ? 'checked' : 'not-checked')}></div>
          <span className={todo.completed ? 'completed' : 'not-completed'}>
            {todo.text}
          </span>
                <button className={'delete-btn'}
                    onClick={() => onDelete(todo.id)}>
                </button>
        </li>
    );
};

export default TodoItem