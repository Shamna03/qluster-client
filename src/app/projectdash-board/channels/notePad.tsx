"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { debounce } from "lodash";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-t p-2 bg-gray-100  dark:bg-[#4d1954] dark:text-white dark:border-[#611f69] text-sm">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn( "px-2 py-1 rounded ml-1", editor.isActive("heading", { level: 1 }) ? "bg-[#611f69] text-white dark:border dark:border-gray-800" : "bg-white dark:bg-[#37113c] dark:text-white" )}
        >
        Heading 1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 ${editor.isActive("bold") ? "bg-[#611f69] text-white dark:border dark:border-gray-800"  : "bg-white"} rounded ml-2 dark:bg-[#37113c] dark:text-white dark:border-[#611f69]`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 ${editor.isActive("italic") ? "bg-[#611f69] text-white dark:border dark:border-gray-800"  : "bg-white"} rounded ml-2 dark:bg-[#37113c] dark:text-white dark:border-[#611f69]`}
      >
        Italic
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn( "px-2 py-1 rounded ml-2", editor.isActive("bulletList") ? "bg-[#611f69] text-white dark:border dark:border-gray-800" : "bg-white dark:bg-[#37113c] dark:text-white" )}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn( "px-2 py-1 rounded ml-2", editor.isActive("orderedList") ? "bg-[#611f69] text-white dark:border dark:border-gray-800" : "bg-white dark:bg-[#37113c] dark:text-white" )}
      >
        Numbered List
      </button>
    </div>
  );
};


const NotePad = ({ channelId }:{channelId:string}) => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      debouncedMutate(html); 
    },
  });

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notepad", channelId],
    queryFn: async () => {
      console.log("Fetching notepad for channelId:", channelId); 
      const {data} = await axios.get(`http://localhost:5004/api/notepad/getnotepad/${channelId}`);
      return data.data.content; 
    },
    enabled: !!channelId,
  });

  useEffect(() => {
    if (isSuccess && data && editor) {
      setContent(data);
      editor.commands.setContent(data); 
    }
  }, [isSuccess, data, editor]);

  // // Handle error
  // useEffect(() => {
  //   if (isError && error) {
  //     console.error("Query error:", error); // Debug
  //   }
  // }, [isError, error]);

  const { mutate, isError: mutateError, error: mutateErrorObj } = useMutation({
    mutationFn: async (newContent: string) => {
      const {data} = await axios.put(`http://localhost:5004/api/notepad/updatenote/${channelId}`, {
        content: newContent,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notepad", channelId] });
    },
    onError: (error: any) => {
      console.error("Mutation error:", error.response?.data || error.message); 
    },
  });

  // Debounce mutations
  const debouncedMutate = useMemo(() => debounce(mutate, 500), [mutate]);

  console.log("Query status:", { isLoading, isError, error, isSuccess, data });
  console.log("Mutation status:", { mutateError, mutateErrorObj });

  if (isLoading) return (
        <div className="flex justify-center items-center h-screen w-full">
          <LoaderCircle className="text-purple-900 animate-spin" />
        </div>
      )
  if (isError) return (
    <div className="p-4">
      <p>Error: {(error as any).message}</p>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => queryClient.invalidateQueries({queryKey:["notepad", channelId]})}
      > Retry
      </button>
    </div>
  );

  return (
    <div className="p-4">
      <Toolbar editor={editor}  />
      <EditorContent editor={editor} className="editor-content border border-gray-300 rounded-b p-4 h-[800px] bg-white overflow-auto dark:bg-[#200a23] dark:text-white dark:border-0 " />
    </div>
  );
};

export default NotePad;