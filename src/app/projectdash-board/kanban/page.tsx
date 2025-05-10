// kanbanpage.tsx (React Component)
"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import axios from "axios";
import Kanbanaxiosinstance from "@/api/Kanbanaxioisinstance"
type Task = {
  _id: string;
  content: string;
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await Kanbanaxiosinstance.get("/tasks/getAllTask");
        const updatedColumns = { ...columnTitles };
        res.data.forEach((task: Task & { status: string }) => {
          updatedColumns[task.status].items.push({ _id: task._id, content: task.content });
        });
        setColumns(updatedColumns);
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
      await axios.put(`http://localhost:5000/api/tasks/${movedItem._id}`, {
        status: destination.droppableId,
      });
    }
  };

  const handleAddTask = async (columnId: string) => {
    const content = newTaskContent[columnId];
    if (!content || !content.trim()) return;

    const res = await Kanbanaxiosinstance.post("/createTask", {
      content: content.trim(),
      status: columnId,
    });

    const newTask: Task = res.data;
    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: [...columns[columnId].items, newTask] },
    });
    setNewTaskContent((prev) => ({ ...prev, [columnId]: "" }));
  };

  return (
    <div className="flex-1 p-6 overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white text-black">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="dark:bg-[#47214e] bg-[#e4e4e7] dark:text-white text-black rounded-xl shadow-lg p-4 w-72 flex-shrink-0"
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
                          className="dark:bg-[#37113c] bg-[#d1d5db] dark:text-white text-black p-4 mb-4 rounded-lg shadow-md dark:hover:bg-[#763c8e] hover:bg-gray-300 transition-all duration-200"
                        >
                          <p className="text-sm">{item.content}</p>
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
    </div>
  );
};

export default KanbanPage;
