
"use client";

import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Video, VideoOff, Mic, MicOff, Phone, User, Users } from "lucide-react";

interface UserType {
  id: string;
  name: string;
}

const VideoCallPage = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [inCall, setInCall] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [myName, setMyName] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [currentCallUser, setCurrentCallUser] = useState<UserType | null>(null);
  const [isIncomingCall, setIsIncomingCall] = useState<boolean>(false);
  const [incomingCallFrom, setIncomingCallFrom] = useState<UserType | null>(null);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const remoteStreamRef = useRef<MediaStream>(new MediaStream());
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:5006");
    socketRef.current = socket;

    socket.on("users-list", (userList: UserType[]) => {
      setUsers(userList.filter((u) => u.id !== socket.id));
    });

    socket.on("offer", async ({ offer, from, name }: { offer: RTCSessionDescriptionInit; from: string; name: string }) => {
      setIsIncomingCall(true);
      setIncomingCallFrom({ id: from, name });
    });

    socket.on("answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.on("ice-candidate", async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      if (peerConnectionRef.current && candidate) {
        try {
          await peerConnectionRef.current.addIceCandidate(candidate);
        } catch (error) {
          console.error("Error adding received ICE candidate", error);
        }
      }
    });

    socket.on("call-rejected", () => {
      alert("Call was rejected.");
      cleanupCall();
    });

    socket.on("end-call", () => {
      cleanupCall();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoin = (): void => {
    if (!myName.trim()) return;
    socketRef.current?.emit("join-room", { name: myName });
    setConnected(true);
  };

  const createPeerConnection = (to: string): RTCPeerConnection => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ]
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit("ice-candidate", { candidate: event.candidate, to });
      }
    };

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStreamRef.current.addTrack(track);
      });

      setRemoteStream(remoteStreamRef.current);

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current;
      }
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    }

    peerConnectionRef.current = pc;
    return pc;
  };

  const handleCallUser = async (user: UserType): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      const pc = createPeerConnection(user.id);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current?.emit("offer", { offer, to: user.id, name: myName });

      setInCall(true);
      setCurrentCallUser(user);
    // } catch (error) {
    //   console.error("Error starting call:", error);
    //   alert(`Could not access camera and microphone: ${error.name} - ${error.message}`);

    // }

    } catch (error: unknown) {
  console.error("Error starting call:", error);

  if (error instanceof Error) {
    alert(`Could not access camera and microphone: ${error.name} - ${error.message}`);
  } else {
    alert("Could not access camera and microphone due to an unknown error.");
  }
}

  };

  const acceptCall = async (): Promise<void> => {
    if (!incomingCallFrom) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      const pc = createPeerConnection(incomingCallFrom.id);

      socketRef.current?.emit("get-offer", { from: incomingCallFrom.id });

      socketRef.current?.once("resend-offer", async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socketRef.current?.emit("answer", { answer, to: incomingCallFrom.id });

        setInCall(true);
        setCurrentCallUser(incomingCallFrom);
        setIsIncomingCall(false);
        setIncomingCallFrom(null);
      });
    } catch (error) {
      console.error("Error accepting call:", error);
      alert("Could not access camera and microphone.");
      rejectCall();
    }
  };

  const rejectCall = (): void => {
    if (!incomingCallFrom) return;
    socketRef.current?.emit("reject-call", { to: incomingCallFrom.id });
    setIsIncomingCall(false);
    setIncomingCallFrom(null);
  };

  const endCall = (): void => {
    if (peerConnectionRef.current && currentCallUser) {
      peerConnectionRef.current.close();
      socketRef.current?.emit("end-call", { to: currentCallUser.id });
    }
    cleanupCall();
  };

  const cleanupCall = (): void => {
    setInCall(false);
    setCurrentCallUser(null);

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach((track) => track.stop());
      remoteStreamRef.current = new MediaStream();
      setRemoteStream(null);
    }
  };

  const toggleAudio = (): void => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = (): void => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  if (!connected) {
    return (
      <div className="flex items-center justify-center h-screen  ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#793185]">Video Connect</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your display Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={myName}
                  onChange={(e) => setMyName(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#6c3873]"
                />
              </div>
            </div>
            <button
              onClick={handleJoin}
              disabled={!myName.trim()}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                myName.trim() ? "bg-[#782883] hover:bg-[#794f7e]" : "bg-[#d0a5d5] cursor-not-allowed"
              } transition-colors`}
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {isIncomingCall && incomingCallFrom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Incoming Call</h2>
            <p className="mb-6">
              <span className="font-medium">{incomingCallFrom.name}</span> is calling you
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={rejectCall}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center gap-2"
              >
                <Phone className="rotate-135" size={20} />
                Decline
              </button>
              <button
                onClick={acceptCall}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center gap-2"
              >
                <Phone size={20} />
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4">
        <header className="bg-white shadow rounded-lg p-4 mb-6">
          <h1 className="text-xl font-bold text-[#782883] ">Video Chat</h1>
          <p className="text-gray-600">Connected as: {myName}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center mb-4">
              <Users size={20} className="text-[#782883] mr-2" />
              <h2 className="text-lg font-semibold">Available Users</h2>
            </div>
            {users.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No users available</p>
                <p className="text-sm">Waiting for others to join...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <User size={20} className="text-[#782883]" />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={() => handleCallUser(user)}
                      disabled={inCall}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                        inCall
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      <Phone size={16} />
                      Call
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Area */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">
                {inCall ? `In call with ${currentCallUser?.name || ""}` : "No active call"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full aspect-video bg-gray-800 rounded-lg ${!videoEnabled ? "opacity-50" : ""}`}
                  />
                  {!videoEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gray-900 bg-opacity-70 p-3 rounded-full">
                        <VideoOff size={32} className="text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                    You ({myName})
                  </div>
                </div>

                <div className="relative">
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full aspect-video bg-gray-800 rounded-lg"
                  />
                  {inCall && currentCallUser && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                      {currentCallUser.name}
                    </div>
                  )}
                  {!inCall && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-lg">No remote video</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-6 gap-4">
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full ${audioEnabled ? "bg-blue-100 text-[#782883]" : "bg-red-100 text-red-600"}`}
                  disabled={!inCall && !localStream}
                >
                  {audioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
                </button>
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full ${videoEnabled ? "bg-blue-100 text-[#782883]" : "bg-red-100 text-red-600"}`}
                  disabled={!inCall && !localStream}
                >
                  {videoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
                </button>
                {inCall && (
                  <button
                    onClick={endCall}
                    className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <Phone className="rotate-135" size={24} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;





