import { KeyboardEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addTodo, editTodo, removeTodo, setTodoStatus } from "./redux/todoSlice";
import { ClipboardClose } from "iconsax-react";
import Item from "./components/item";
import Filter from "./components/filter";
import { toast } from "react-toastify";
import { filterValue } from "./type";
import AddItem from "./components/addItem";


function App() {
  const [todoDescription, setTodoDescription] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<boolean | string>('')

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
      toast.warning('Please write a letter')
      return;
    }
    if (editId !== '') editTaskHandler()
    else addTaskHandler()
  }
  const editActionBtn = (description: string, id: string) => {
    setEditId(id);
    setTodoDescription(description);
  }

  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e?.keyCode === 13) {
      todoHandler();
    }
  };

  const changeFilterHandler = (filter: string | boolean) => {
    setFilter(filter)
  }

  const items = useMemo(() => todoList?.filter(item => filter === '' ? item.id : item.completed === filter), [filter, todoList])

  return (
    <div className="flex flex-grow flex-col items-center px-8 bg-gray-900 h-screen overflow-y-auto">
      <AddItem
        editId={editId}
        handleKeyboardEvent={handleKeyboardEvent}
        onchangeDescription={(e) => setTodoDescription(e.target.value)}
        todoDescription={todoDescription}
        todoHandler={todoHandler}
      />
      <Filter
        filter={filter}
        backlogFilterHandler={() => changeFilterHandler(filterValue['backlog'])}
        doneFilterHandler={() => changeFilterHandler(filterValue['done'])}
        removeFilterHandler={() => changeFilterHandler(filterValue['all'])}
      />
      <div className="max-w-full w-full p-3 text-gray-200">
        <div className="flex items-center mb-10">
          <div className="w-full">
            {items?.map((todo) => (
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
            {
              items.length <= 0 &&
              <div className="flex justify-center animate-bounce mt-6 text-gray-400">
                <ClipboardClose size="70" />
              </div>
            }
          </div>
        </div>
      </div>

      <span className="absolute bg-gray-800 px-3 py-2 rounded-md bottom-4 font-medium break-words tracking-wide leading-none text-gray-100">
        coded by Mahsa Moadab
      </span>
    </div>
  );
}

export default App;