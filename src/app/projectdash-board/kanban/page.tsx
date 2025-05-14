// kanbanpage.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Kanbanaxiosinstance from "@/api/Kanbanaxioisinstance";

type Task = {
  _id: string;
  title: string;
};

type ColumnType = {
  title: string;
  items: Task[];
};

type Columns = {
  [key: string]: ColumnType;
};

const columnTitles: Columns = {
  todo: { title: "To Do", items: [] },
  inProgress: { title: "In Progress", items: [] },
  done: { title: "Done", items: [] },
};

const KanbanPage = () => {
  const [columns, setColumns] = useState<Columns>(columnTitles);
  const [newTaskContent, setNewTaskContent] = useState<{ [key: string]: string }>({});

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await Kanbanaxiosinstance.get("/task/getAllTask");

      
      const freshColumns: Columns = {
        todo: { title: "To Do", items: [] },
        inProgress: { title: "In Progress", items: [] },
        done: { title: "Done", items: [] },
      };

      res.data.forEach((task: any) => {
        const column = task.columnId;
        if (freshColumns[column]) {
          freshColumns[column].items.push({
            _id: task._id,
            title: task.title,
          });
        }
      });

      setColumns(freshColumns); // ✅ Set fresh, non-duplicated data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  fetchTasks();
}, []);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });

      await Kanbanaxiosinstance.put(`/task/updateTask/${movedItem._id}`, {
        columnId: destination.droppableId,
      });
    }
  };

  const handleAddTask = async (columnId: string) => {
    const title = newTaskContent[columnId];
    if (!title?.trim()) return;

    try {
      const res = await Kanbanaxiosinstance.post("/task/createTask", {
        title: title.trim(),
        description: "Default task description",
        projectId: "663d65eb65eb9c15ffdd3e22", // Placeholder
        assignedTo: "663d65eb65eb9c15ffdd3e99", // Placeholder
        columnId,
        priority: "Medium",
        comments: [],
      });

      const newTask: Task = res.data;

      setColumns((prev) => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          items: [...prev[columnId].items, newTask],
        },
      }));

      setNewTaskContent((prev) => ({ ...prev, [columnId]: "" }));
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white text-black">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4 items-start flex-wrap md:flex-nowrap">
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="dark:bg-[#47214e] bg-[#e4e4e7] dark:text-white text-black rounded-xl shadow-lg p-4  w-full sm:w-[300px] flex-shrink-0 "
                >
                  <h2 className="text-xl font-semibold mb-4 border-b border-[#611f69] dark:border-gray-400 pb-2">
                    {column.title}
                  </h2>

                  {column.items.map((item, index) => (
                    <Draggable key={item._id} draggableId={item._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => {
                            setSelectedTask(item);
                            setIsModalOpen(true);
                          }}
                          className="dark:bg-[#37113c] bg-[#d1d5db] dark:text-white text-black p-4 mb-4 rounded-lg shadow-md dark:hover:bg-[#763c8e] hover:bg-gray-300 transition-all duration-200"
                        >
                          <p className="text-sm">{item.title}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  <div className="mt-4">
                    <input
                      type="text"
                      value={newTaskContent[columnId] || ""}
                      onChange={(e) =>
                        setNewTaskContent((prev) => ({
                          ...prev,
                          [columnId]: e.target.value,
                        }))
                      }
                      placeholder="New task"
                      className="w-full p-2 rounded dark:bg-[#311435] bg-white dark:text-white text-black"
                    />
                    <button
                      onClick={() => handleAddTask(columnId)}
                      className="mt-2 w-full dark:bg-[#611f69] bg-[#611f69] text-white py-1 rounded hover:bg-[#d3a6fd] dark:hover:bg-[#6b21a8] transition"
                    >
                      Add Task
                    </button>
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && selectedTask && (
  <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-[#1e1e2f] text-black dark:text-white rounded-xl p-6 w-[400px] relative shadow-2xl animate-fade-in">
      
      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-red-500"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4">Task Details</h2>

      {/* Editable Title */}
      <label className="block text-sm font-medium mb-1">Title</label>
      <input
        className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-[#2a2a3d] text-black dark:text-white mb-4"
        value={selectedTask.title}
        onChange={(e) =>
          setSelectedTask((prev) => prev ? { ...prev, title: e.target.value } : null)
        }
      />

      {/* Description */}
      <label className="block text-sm font-medium mb-1">Description</label>
      <textarea
        className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-[#2a2a3d] text-black dark:text-white mb-4"
        placeholder="Enter task description..."
        rows={3}
      />

      {/* Assigned To */}
      <label className="block text-sm font-medium mb-1">Assign To</label>
      <select
        className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-[#2a2a3d] text-black dark:text-white mb-4"
        defaultValue="663d65eb65eb9c15ffdd3e99" // sample user id
      >
        <option value="663d65eb65eb9c15ffdd3e99">User A</option>
        <option value="663d65eb65eb9c15ffdd3e88">User B</option>
        <option value="663d65eb65eb9c15ffdd3e77">User C</option>
      </select>

      {/* Buttons */}
      <div className="flex justify-between mt-6 gap-2">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          onClick={async () => {
            try {
              await Kanbanaxiosinstance.put(`/task/updateTask/${selectedTask._id}`, {
                title: selectedTask.title,
                // add description, assignedTo if needed
              });

              setColumns((prev) => {
                const updated = { ...prev };
                for (const key in updated) {
                  updated[key].items = updated[key].items.map((task) =>
                    task._id === selectedTask._id ? { ...task, title: selectedTask.title } : task
                  );
                }
                return updated;
              });

              setIsModalOpen(false);
            } catch (error) {
              console.error("Edit error:", error);
            }
          }}
        >
          Save Changes
        </button>

        <button
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              try {
                await Kanbanaxiosinstance.delete(`/task/deleteTask/${selectedTask._id}`);
                setColumns((prev) => {
                  const newColumns = { ...prev };
                  for (const key in newColumns) {
                    newColumns[key].items = newColumns[key].items.filter((task) => task._id !== selectedTask._id);
                  }
                  return newColumns;
                });
                setIsModalOpen(false);
              } catch (error) {
                console.error("Delete error:", error);
              }
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default KanbanPage;
