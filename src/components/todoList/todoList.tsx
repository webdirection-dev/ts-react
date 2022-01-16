import {ITodo} from "../../types/data";

import TodoItem from "../todoItem";

interface ITodoListProps {
    isTodos: ITodo[];
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
    const {
        isTodos,
        removeTodo,
        toggleTodo
    } = props

    return(
        <div>
            {
                isTodos.map(
                    item => <TodoItem
                        key={item.id}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                        {...item}
                    />
                )
            }
        </div>
    )
}

export default TodoList