import {useState, useEffect, useRef} from "react";

import {ITodo} from "../../types/data";

import TodoList from "../todoList";

const App: React.FC = () => {
    const [isValue, setValue] = useState('')
    const [isTodos, setTodos] = useState<ITodo[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    const onAddTodo = () => {
        if (isValue) {
            setTodos(
                [
                    ...isTodos,
                    {
                        id: Date.now(),
                        title: isValue,
                        complete: false,
                    }
                ]
            )

            setValue('')
        }
    }

    const removeTodo = (id: number): void => {
        setTodos(isTodos.filter(item => item.id !== id))
    }

    const toggleTodo = (id: number): void => {
        setTodos(
            isTodos.map(item => {
                if (item.id !== id) return item

                return {
                    ...item,
                    complete: !item.complete
                }
            })
            // 2й вариант решения
            // isTodos.map(item => {
            //     if (item.id === id) {
            //         item.complete = !item.complete
            //         return item
            //     } else return item
            // })
        )
    }

    // Особенности TS при работе с EVENT
    const onKeyAddTodo:  React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') onAddTodo()
    }

    // Особенности TS при работе с EVENT
    // event: React.ChangeEvent<HTMLInputElement>
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    // componentDidMount
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])

    return(
        <div>
            <div>
                <input
                    type="text"
                    value={isValue}
                    onChange={event => handleChange(event)}
                    onKeyDown={event => onKeyAddTodo(event)}
                    ref={inputRef}
                />

                <button
                    onClick={onAddTodo}
                >Add todo</button>
            </div>

            <TodoList
                isTodos={isTodos}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}

export default App