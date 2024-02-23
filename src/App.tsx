import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { addTodo, editTodo, removeTodo, setTodoStatus } from "./redux/todoSlice";
import { NoteAdd, ReceiptEdit } from "iconsax-react";
import Item from "./components/item";
import { toast } from "react-toastify";

function App() {
  const [todoDescription, setTodoDescription] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<boolean | ''>('')

  const checkAction = () => {
    setTodoDescription("");
    setEditId("");
  }
  const addTaskHandler = () => {
    dispatch(addTodo(todoDescription));
    checkAction();
  }

  const editTaskHandler = () => {
    dispatch(editTodo({ description: todoDescription, id: editId }));
    checkAction();
  }
  const todoHandler = () => {
    if (todoDescription === '') {
      toast.warning('please wirte a leter')
      return;
    }
    if (editId !== '') editTaskHandler()
    else addTaskHandler()
  }
  const editActionBtn = (description: string, id: string) => {
    setEditId(id);
    setTodoDescription(description);
  }

  const filters = todoList?.filter(item => filter === '' ? item.id : item.completed === filter)
  console.log(filters);


  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-gray-900 h-screen">
      <div className="max-w-full p-4 mb-3 bg-gray-800 rounded-lg shadow-lg w-2/3 text-gray-200">
        <div className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
          <input
            placeholder="write task"
            className="w-full bg-transparent h-full outline-0	border-none text-lg"
            onChange={(e) => setTodoDescription(e.target.value)}
            value={todoDescription}
          />
          <button
            onClick={todoHandler}
          >
            {
              editId ?
                <ReceiptEdit size="24" color="#FF8A65" /> :
                <NoteAdd size="24" color="#FF8A65" />
            }
          </button>
          <select name="" id="" onChange={(event) => setFilter(event.target.value === 'done' ? true: false)}>
            <option value="backlog">BackLog</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
      <div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg w-2/3 text-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-full">
            {todoList?.filter(item => filter === '' ? item.id : item.completed === filter)?.map((todo) => (
              <Item
                key={todo.id}
                id={todo.id}
                description={todo.description}
                completed={todo.completed}
                deleteItem={() => {
                  dispatch(removeTodo(todo.id));
                  checkAction();
                }}
                editItem={() => {
                  editActionBtn(todo.description, todo.id)
                }}
                toggleComplete={() => {
                  dispatch(
                    setTodoStatus({ completed: !todo.completed, id: todo.id })
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;