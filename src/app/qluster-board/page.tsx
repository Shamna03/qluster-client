"use client"

import React, { useState } from 'react';
import { Trash2, Plus, MoreHorizontal } from 'lucide-react';

// Define types for our data structures
interface Task {
  id: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const QlusterBoard: React.FC = () => {
  // Sample initial data
  const initialColumns: Column[] = [
    {
      id: 'column-1',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Research user needs', priority: 'high' },
        { id: 'task-2', content: 'Create wireframes', priority: 'medium' }
      ]
    },
    {
      id: 'column-2',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', content: 'Develop prototype', priority: 'high' },
      ]
    },
    {
      id: 'column-3',
      title: 'Done',
      tasks: [
        { id: 'task-4', content: 'Project setup', priority: 'low' },
        { id: 'task-5', content: 'Team meeting', priority: 'medium' }
      ]
    }
  ];

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [addingToColumn, setAddingToColumn] = useState<string | null>(null);

  const handleAddTask = (columnId: string): void => {
    if (newTaskText.trim() === '') return;
    
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [
            ...column.tasks,
            { id: `task-${Date.now()}`, content: newTaskText, priority: 'medium' }
          ]
        };
      }
      return column;
    }));
    
    setNewTaskText('');
    setAddingToColumn(null);
  };

  const handleDeleteTask = (columnId: string, taskId: string): void => {
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    }));
  };

  const getPriorityColor = (priority: Task['priority']): string => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-800 to-purple-600 h-screen p-4 overflow-hidden">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-white text-3xl font-bold">Qluster Board</h1>
          <p className="text-purple-200">Organize your projects efficiently</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-lg transition-all">
            Add Column
          </button>
          <button className="bg-purple-900 hover:bg-purple-950 text-white px-4 py-2 rounded-lg transition-all">
            Save Board
          </button>
        </div>
      </header>
      
      <div className="flex space-x-4 overflow-x-auto pb-4 h-5/6">
        {columns.map(column => (
          <div 
            key={column.id} 
            className="bg-gray-100 rounded-lg shadow-lg flex-shrink-0 w-72 flex flex-col max-h-full"
          >
            <div className="p-3 bg-gray-200 rounded-t-lg border-b border-gray-300 flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">{column.title}</h3>
              <span className="bg-gray-300 text-gray-600 rounded-full px-2 py-1 text-xs">
                {column.tasks.length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {column.tasks.map(task => (
                <div 
                  key={task.id} 
                  className="bg-white rounded-md p-3 mb-2 shadow hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`w-2 h-2 rounded-full mt-1 ${getPriorityColor(task.priority)}`} />
                    <button 
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteTask(column.id, task.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-gray-800">{task.content}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">ID: {task.id.split('-')[1]}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {addingToColumn === column.id ? (
              <div className="p-2 border-t border-gray-200">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded resize-none text-sm"
                  rows={2}
                  placeholder="Enter task description..."
                  value={newTaskText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTaskText(e.target.value)}
                ></textarea>
                <div className="flex justify-end space-x-2 mt-2">
                  <button 
                    className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => setAddingToColumn(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-3 py-1 text-xs bg-purple-700 hover:bg-purple-800 text-white rounded"
                    onClick={() => handleAddTask(column.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <button 
                className="m-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded flex items-center justify-center transition-colors"
                onClick={() => setAddingToColumn(column.id)}
              >
                <Plus size={20} className="mr-1" /> Add Task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QlusterBoard;



// import React from 'react'

// interface Column {
//   title:string;
//   id:string;
// }

// const QlusterBoard:React.FC = () => {
//   const Columns: Column[] = [
//     {
//       title: "To-Do",
//       id:"1"
//     },
//     {
//       title: "In-Progress",
//       id:"2"
//     },
//     {
//       title: "Completed",
//       id:"3"
//     },
//   ];



//   return (
//     <div className="bg-gradient-to-r from-[#611f69] to-[#9c3d99] h-screen overflow-hidden">
//        <p className='text-white text-3xl m-0 font-bold'>Qluster Board...</p>
//        <p className='text-white'>Organize your project efficiently..</p>

//        {/* cards */}

//        <div className='w-3/4 mt-10 mx-auto flex flex-row gap-6'>
//       {Columns.map((column) => (
//       <div key={column.id} className='w-full bg-gray-300 p-4 rounded-lg shadow-md'>
//         <h2 className="text-xl font-bold text-center text-gray-800">{column.title}</h2>
//       </div>
//   ))}
// </div>
//     </div>

    
//   )
// }

// export default QlusterBoard


