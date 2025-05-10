// // "use client"
// // import React, { useEffect } from 'react'

// // const NotePad = ({content}:{content:string}) => {
// //   return (
// //     <div className='p-4'>{content}</div>
// //   )
// // }

// // export default NotePad
// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // Dynamic import for SSR compatibility
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// // import "react-quill/dist/quill.snow.css";



//  const NotePad=({ channelId }:{channelId:string}) => {
//   const [content, setContent] = useState("");
//   const queryClient = useQueryClient();
// // console.log(channelId,"============channelId");

//   const { data } = useQuery({
//     queryKey: ["notepad", channelId],
//     queryFn: async () => {
//       const {data}= await axios.get(`http://localhost:5004/api/notepad/getnotepad/${channelId}`);
//       setContent(data.data.content)
//       return data.data.content;
//     },
//     enabled: !!channelId,
    
//   });
  

//   // Update notepad content
//   const {mutate} = useMutation({
//     mutationFn: async (newContent: string) => {
//       await axios.put(`http://localhost:5004/api/notepad/updatenotepad/${channelId}`, {
//         content: newContent,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey:["notepad", channelId]});
//     },
//   });

//   const handleChange = (value: string) => {
//     setContent(value);
//    mutate(value);
//   };

//   return (
//     <div className="p-4">
//       <ReactQuill value={content} onChange={handleChange} />
//     </div>
//   );
// }

// export default  NotePad
