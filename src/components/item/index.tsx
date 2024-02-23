import { Edit2, Trash } from "iconsax-react";

interface ItemProps {
  id: string;
  completed: boolean;
  description: string;
  toggleComplete: () => void;
  editItem: () => void;
  deleteItem: () => void;
}

export default function Item({
  id,
  completed,
  description,
  toggleComplete,
  editItem,
  deleteItem
}: ItemProps) {

  return (
    <div className="w-full mb-2 p-2 bg-gray-900 rounded-lg" key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleComplete}
      />
      <div
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {description}
      </div>
      <div>
        <button
          onClick={editItem}
        >
          <Edit2 size="18" color="#FF8A65" />
        </button>
        <button
          onClick={deleteItem}
        >
          <Trash size="18" color="#FF8A65" />
        </button>
      </div>
    </div>
  );
}