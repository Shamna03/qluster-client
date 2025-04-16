"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { ClipboardList, House, LogOut, Settings } from "lucide-react";

type Task = {
  id: string;
  content: string;
};

type ColumnType = {
  title: string;
  items: Task[];
};

type Columns = {
  [key: string]: ColumnType;
};

const initialData: Columns = {
  todo: {
    title: "To Do",
    items: [
      { id: "task-1", content: "Design UI" },
      { id: "task-2", content: "Set up Firebase" },
    ],
  },
  inProgress: {
    title: "In Progress",
    items: [{ id: "task-3", content: "Build Navbar" }],
  },
  done: {
    title: "Done",
    items: [{ id: "task-4", content: "Initial Setup" }],
  },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Columns>(initialData);
  const [newTaskContent, setNewTaskContent] = useState<{
    [key: string]: string;
  }>({});

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  const handleAddTask = (columnId: string) => {
    const content = newTaskContent[columnId];
    if (!content || !content.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: content.trim(),
    };

    const updatedColumn = {
      ...columns[columnId],
      items: [...columns[columnId].items, newTask],
    };

    setColumns({
      ...columns,
      [columnId]: updatedColumn,
    });

    setNewTaskContent((prev) => ({ ...prev, [columnId]: "" }));
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 bg-card p-6 border-r border-border flex flex-col">
        <h2 className="text-2xl font-bold mb-8">qluster</h2>
        <nav className="flex flex-col gap-4 text-sm">
          <a href="#" className="hover:text-primary flex items-center gap-2">
            <House className="h-4 w-4" /> Dashboard
          </a>
          <a href="#" className="hover:text-primary flex items-center gap-2">
            <ClipboardList className="h-4 w-4" /> My Boards
          </a>
          <a href="#" className="hover:text-primary flex items-center gap-2">
            <Settings className="h-4 w-4" /> Settings
          </a>
          <a href="#" className="hover:text-primary flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-x-auto mt-14">
        <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {Object.entries(columns).map(([columnId, column]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-card rounded-2xl shadow-lg p-4 w-72 flex-shrink-0 border border-border"
                  >
                    <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">
                      {column.title}
                    </h2>

                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-muted p-4 mb-4 rounded-lg border border-border shadow-md hover:bg-muted/80 transition-all duration-200"
                          >
                            <p className="text-sm">{item.content}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {/* Add Task Input */}
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
                        className="w-full p-2 rounded bg-background text-foreground border border-border"
                      />
                      <button
                        onClick={() => handleAddTask(columnId)}
                        className="mt-2 w-full bg-primary text-primary-foreground py-1 rounded hover:bg-primary/90 transition"
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
    </div>
  );
};

export default KanbanBoard;
