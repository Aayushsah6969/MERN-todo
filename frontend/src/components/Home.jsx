import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [todos, settodos] = useState([]);
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(false);
    const [newTodo, setnewTodo] = useState('');

const navigate = useNavigate();


    useEffect(() => {

        const fetchtodos = async () => {
            try {
                setloading(true);
                const response = await axios.get("http://localhost:4001/todo/fetch", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                console.log(response.data.todos);
                settodos(response.data.todos);
                seterror(null);
            } catch (error) {
                seterror("Failled to Fetchtodos", error);
            } finally {
                setloading(false);
            }
        }

        fetchtodos();
    }, [])

    const todoCreate = async () => {
        if (!newTodo) return;
        try {
            const response = await axios.post("http://localhost:4001/todo/create", {
                text: newTodo,
                completed: false,
            }, {
                withCredentials: true,
            })
            settodos([...todos, response.data]);
            setnewTodo('');
        } catch (error) {
            console.log(error);
            seterror("Failled to create todo");
        }
    }

    const todoStatus = async (id) => {
        const todo = todos.find((t) => t._id === id)
        try {
            const response = await axios.put(`http://localhost:4001/todo/update/${id}`, {
                ...todo,
                completed: !todo.completed,
            }, {
                withCredentials: true,
            })
            console.log(response.data.todo);
            settodos(todos.map((t) => t._id === id ? response.data.todo : t));
        } catch (error) {
            console.log(error);
            seterror("Failled to update todo status");
        }
    }

    const todoDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
                withCredentials: true,
            });
            settodos(todos.filter((t) => t._id !== id));
        } catch (error) {
            console.log(error);
            seterror("Failled to delete todo");
        }
    }

const remaining = todos.filter((todo)=>!todo.completed).length;

const logOut = async()=>{
    try {
        await axios.get('http://localhost:4001/user/logout');
        alert("Logged Out Successfully");
        navigate('/login');
        localStorage.removeItem('jwt');
    } catch (error) {
        console.log(error);
    }
}
    return (
        <div className="bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Todo App</h1>

            <div className="flex mb-4">
                <input  
                value={newTodo}
                onChange={(e)=>setnewTodo(e.target.value)} type="text" 
                placeholder="Add a new todo" className="flex-grow p-2 border rounded-l-md focus:outline-none" />
                <button className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300" 
                onClick={todoCreate}
                >Add</button>
            </div>

            <ul className="space-y-2">
                {todos.map((todo, index) => (
                    <li key={todo._id || index} className="flex justify-between items-center">
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2" checked={todo.completed} onChange={()=>todoStatus(todo._id)} />
                            <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>

                        </div>
                        <button className="text-red-600 hover:underline" onClick={()=>todoDelete(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>


            <div className="mt-4 flex justify-between items-center">
                <p>{remaining} todos remaining</p>
                <button 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 duration-300"
                onClick={()=>logOut()}
                >
                    Logout
                    </button>
            </div>
        </div>

    )
}
