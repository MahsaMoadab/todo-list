import { AddCircle, Edit2 } from 'iconsax-react'

interface AddItemProps {
  todoHandler: () => void;
  onchangeDescription: (e: any) => void;
  handleKeyboardEvent: (e: React.KeyboardEvent<Element>) => void;
  todoDescription: string;
  editId: string;
}

export default function AddItem({
  todoDescription,
  handleKeyboardEvent,
  onchangeDescription,
  todoHandler,
  editId
}: AddItemProps) {
  return (
    <div className="sticky top-0 z-10 p-4 mb-3 bg-gray-800 mt-5 rounded-lg shadow-lg w-full text-gray-200">
      <div className="flex items-center relative w-full pb-2 px-2 mt-2 text-sm font-medium rounded">
        <input
          placeholder="write todo"
          className="w-full bg-transparent h-full outline-0	border-none text-lg"
          onChange={onchangeDescription}
          value={todoDescription}
          onKeyDown={handleKeyboardEvent}
        />
        <button
          onClick={todoHandler}
          className="text-green-400 absolute bottom-[-1.5rem] right-0 bg-gray-800 rounded-full shadow-lg"
        >
          {
            editId ?
              <Edit2 size="32" /> :
              <AddCircle size="32" />
          }
        </button>
      </div>
    </div>
  )
}
