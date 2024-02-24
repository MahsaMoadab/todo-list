import { Edit2, TickCircle, Trash } from "iconsax-react";

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
    <div key={id} className="flex flex-col p-4 mb-2 bg-gray-800 border-gray-800 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
      <div className="flex items-center justify-between break-all">
        <div className="flex ">
          <div className="inline-flex">
            <div className={`${completed ? "text-green-400 hover:text-red-400" : ""} relative object-cover rounded-2xlflex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-green-400 transition ease-in duration-300 mr-2`}>
              <TickCircle onClick={toggleComplete} />
            </div>
          </div>
          <div
            style={{
              textDecoration: completed ? "line-through" : "none",
            }}
            onClick={toggleComplete}
            className="font-medium break-words tracking-wide leading-none text-gray-100">
            {description}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-2">
        <span className="flex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-yellow-400 transition ease-in duration-300">
          <Edit2 onClick={editItem} size="18" />
        </span>
        <span className="flex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-red-400 transition ease-in duration-300 ml-2">
          <Trash onClick={deleteItem} size="18" />
        </span>
      </div>
    </div>
  );
}