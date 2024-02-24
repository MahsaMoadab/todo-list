import React from 'react'
import { FilterSearch } from 'iconsax-react';
import { filterValue } from '../../type';

interface FilterProps {
    removeFilterHandler: () => void;
    backlogFilterHandler: () => void;
    doneFilterHandler: () => void;
    filter: string | boolean;
}

export default function Filter ({
    removeFilterHandler,
    backlogFilterHandler,
    doneFilterHandler,
    filter }
    : FilterProps) {
    return (
        <>
            <div className="flex items-center gap-5 ml-auto">
                <div className="relative mb-3 bg-gray-800 mt-5 rounded-2xl shadow-lg text-gray-200 ml-auto">
                    <span className="text-green-400 absolute top-[-.3rem] right-1 bg-gray-800 rounded-full shadow-lg">
                        <FilterSearch
                            size="20"
                        />
                    </span>
                    <button
                        onClick={removeFilterHandler}
                        className={`px-4 py-3 rounded-2xl transition-colors ease-linear delay-150 ${filter === filterValue['all'] ? 'bg-green-400 text-gray-950' : ''}`}>All</button>
                    <button
                        onClick={backlogFilterHandler}
                        className={`px-4 py-3 rounded-2xl transition-colors ease-linear delay-150 ${filter === filterValue['backlog'] ? 'bg-green-400 text-gray-950' : ''}`}>Backlog</button>
                    <button
                        onClick={doneFilterHandler}
                        className={`px-4 py-3 rounded-2xl transition-colors ease-linear delay-150 ${filter === filterValue['done'] ? 'bg-green-400 text-gray-950' : ''}`}>Done</button>
                </div>
            </div>
        </>
    )
}
