// import React from "react";

// interface Props {
//   caller: string;
//   onAccept: () => void;
//   onReject: () => void;
// }

// const CallModal: React.FC<Props> = ({ caller, onAccept, onReject }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg text-black space-y-4 shadow-xl">
//         <h2 className="text-xl font-semibold">Incoming Call</h2>
//         <p>{caller} is calling...</p>
//         <div className="flex justify-around mt-4">
//           <button onClick={onAccept} className="bg-green-500 px-4 py-2 rounded text-white">
//             Accept
//           </button>
//           <button onClick={onReject} className="bg-red-500 px-4 py-2 rounded text-white">
//             Reject
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallModal;




import React from "react";

interface Props {
  caller: string;
  onAccept: () => void;
  onReject: () => void;
}

const CallModal: React.FC<Props> = ({ caller, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-black space-y-4 shadow-xl">
        <h2 className="text-xl font-semibold">Incoming Call</h2>
        <p>{caller} is calling...</p>
        <div className="flex justify-around mt-4">
          <button
            onClick={onAccept}
            className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
