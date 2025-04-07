import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { Todo, Filter } from '../types/type';
import '../css/TodoItem.css'
import '../css/TodoApp.css'

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState<Filter>('all');

    const addTodo = () => {
        if (inputValue.trim() === '') return;

        const newTodo: Todo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const toggleTodo = (id: number) => {
        setTodos(previousList => previousList.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number) => {
        setTodos(previousList => previousList.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'completed':
                return todo.completed;
            case 'active':
                return !todo.completed;
            default:
                return true;
        }
    });

    return (
        <div className={'list-container'}>
            <div className={'add-list'}>
                <div>
                    <h2>📝 To-Do List</h2>
                    <input
                        type="text"
                        placeholder="New objective"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                    <button className={'btn'} onClick={addTodo}>
                        ➕ Add
                    </button>
                </div>
                <div style={{ marginTop: '15px' }}>
                    <button className={'btn'} onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
                    <button className={'btn'} onClick={() => setFilter('active')} disabled={filter === 'active'} >Active</button>
                    <button className={'btn'} onClick={() => setFilter('completed')} disabled={filter === 'completed'} >Completed</button>
                </div>
            </div>

            <ul className={'todo-list'}>
                {filteredTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoApp