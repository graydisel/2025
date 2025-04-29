import React, { useState } from 'react';
import TodoItem from './TodoItem';
import '../css/TodoItem.css'
import '../css/TodoApp.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {addTodo, setFilter} from "../redux/todos/todoSlice.ts";
import {Todo} from "../types/type.ts";

const TodoApp: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { todos, filter } = useSelector((state: RootState) => state.todo);

    const filteredTodos = todos.filter((todo: Todo) => {
        switch (filter) {
            case 'completed':
                return todo.completed;
            case 'active':
                return !todo.completed;
            default:
                return true;
        }
    });

    const handleAdd = () => {
        if (inputValue.trim()) {
            dispatch(addTodo(inputValue));
            setInputValue('');
        }
    };

    return (
        <div className="list-container">
            <div className="add-list">
                <h2>📝 To-Do List</h2>
                <input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="New objective"
                />
                <button className="btn" onClick={handleAdd}>➕ Add</button>
                <div style={{ marginTop: '15px' }}>
                    <button className="btn" onClick={() => dispatch(setFilter('all'))} disabled={filter === 'all'}>All</button>
                    <button className="btn" onClick={() => dispatch(setFilter('active'))} disabled={filter === 'active'}>Active</button>
                    <button className="btn" onClick={() => dispatch(setFilter('completed'))} disabled={filter === 'completed'}>Completed</button>
                </div>
            </div>
            <ul className="todo-list">
                {filteredTodos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoApp