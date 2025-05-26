import { useEffect, useState } from "react";
import { socket } from '../lib/scoket';
import toast from "react-hot-toast";

export default function Chat({ name, roomName,isinroom }) {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
console.log(isinroom);

    const sendMessage = () => {
        if(!isinroom){
            toast.error("go to chat")
            return
        }
        if (value.trim() === "") return;

        const msgData = {
            text: value,
            sender: name,
            time: new Date().toLocaleTimeString(),
            roomName: roomName
        };

        socket.emit("message", msgData);
        setValue(""); // Clear input after sending
    };

    useEffect(() => {
        const handleNewMessage = (data) => {
            const { sender, text, time } = data;
            setMessages((prevMessages) => [
                ...prevMessages,
                { text, sender, time }
            ]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, []);

    useEffect(() => {
        const handleJoin = (data) => {
            toast(data.message);
        };

        socket.on("newJoin", handleJoin);

        return () => {
            socket.off("newJoin", handleJoin);
        };
    }, []);

    return (
        <main className="flex flex-col h-full w-full p-4 bg-gray-100">
            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto p-4 bg-white rounded shadow space-y-3">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded max-w-[70%] ${
                            msg.sender === name
                                ? "bg-blue-500 text-white self-end ml-auto"
                                : "bg-gray-200 text-black self-start mr-auto"
                        }`}
                    >
                        <div className="mb-1">{msg.text}</div>
                        <div className="text-xs flex justify-between opacity-80">
                            <span>{msg.sender}</span>
                            <span>{msg.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 p-2 border rounded focus:outline-none"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-500 text-white rounded w-full sm:w-auto"
                >
                    Send
                </button>
            </div>
        </main>
    );
}
