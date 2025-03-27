import { useEffect, useState } from "react";
import { socket } from '../lib/scoket';
import toast from "react-hot-toast"
export default function Chat({name,roomName}) {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    // console.log(name);
    // console.log(roomName);
    const sendMessage = () => {
        
        
        if (value.trim() !== "") {
            // setMessages([...messages, { text: value, sender: name, time: new Date().toLocaleTimeString() }]);
            setValue("");
        }
        const msgData =   { 
            text: value, 
            sender: name,
             time: new Date().toLocaleTimeString(),
            roomName:roomName
        }
        
        socket.emit("message",msgData)
        
    };
    
    socket.on("newMessage",(data)=>{
        // console.log(data);
        const {sender , text,time} = data;
        console.log(sender+ " " + text+" "+time);
        setMessages([...messages, { text: text, sender: sender, time: time }]);
        // console.log(messages);
    })
    useEffect(()=>{
        const tostnot = (data)=>{
            toast(data.message)
        }
        socket.on("newJoin",tostnot)

    return () => {
        socket.off("newJoin",tostnot); // ✅ Cleanup listener to prevent duplicates
    };
    },[])

  
    return (
        <main className="flex flex-col h-[90vh] md:h-[  100vh] p-4 w-[80%] md:w-[70%] bg-gray-100 fixed top-0 right-0">
            <div className="flex-1 overflow-y-auto p-4 bg-white rounded shadow">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 p-2 rounded ${msg.sender === name ? " bg-blue-500 text-white self-end" : " bg-gray-200 text-black self-start"}`}>
                        <div className="text-start ml-[10px]">{msg.text}</div>
                        <div className="flex justify-between">
                        <span className="font-semibold ml-[10px]">{msg.sender}</span>
                        <span className={`ml-2 text-sm  ${msg.sender === name ? "text-white" : "text-black"}  mr-[10px]`}>({msg.time})</span>
                        </div>
                        
                    </div>
                ))}
            </div>
            <div className="flex items-center mt-4">
                <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }} 
                    className="flex-1 p-2 border rounded-l-md focus:outline-none"
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} 
                className="p-2 bg-blue-500 text-white rounded-r-md">Send</button>
            </div>
        </main>
    );
}