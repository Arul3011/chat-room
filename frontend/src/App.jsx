import { useEffect, useState, useRef } from 'react';
import RoomList from './blocks/RoomList';
import './App.css'; // If needed for custom styles
import Chat from './blocks/Chat';
import { socket } from './lib/scoket';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomList,setRoomList] = useState([])
  const dialogEl_name = useRef(null);
  const dialogEl_room = useRef(null);
  
  useEffect(()=>{
    const pname = prompt("enter your name") || null
    const rname = prompt("enter your name") || null

    setName(pname)
  setRoomName(rname)
  },[])
  useEffect(()=>{
    if(roomName === null){
      alert("joint to a room")
    }else{
      socket.emit("joinroom",{roomName:roomName,name:name});
    }
  },[roomName])

  useEffect(() => {
    socket.connect(); // Connect only once when the component mounts

    return () => {
        socket.disconnect(); // Cleanup on unmount
    };
}, []);

const hanngelnameDilog_name = () =>{
  dialogEl_name.current.close()
  dialogEl_room.current.showModal()

}
const hanngelnameDilog_room =()=>{
  dialogEl_room.current.close();
  socket.emit("joinroom",{roomName:roomName,name:name});
  
}
socket.on("roomsList",(data)=>{
  // console.log(data);
  
  setRoomList(data)
})
// socket.on("message",(data)=>{ 

// })
  return (
    <>
        <div className="w-full h-[100dvh]">
     <div className="">
       <RoomList roomList={roomList}/>
      <Chat 
      name={name}
      roomName={roomName}
      />
     </div>
      
      {/* <dialog
        ref={dialogEl_name}
        className=" p-6 bg-white shadow-lg w-[400px] max-w-full rounded-lg "
      >
        <p className='mb-[10px]'>enter your name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
         className="w-full p-2 rounded mb-[10px] border-2 border-solid border-black bg-white"
        />
        <button 
        className=' w-full p-2 border rounded bg-blue-500 text-[#fff]'
        onClick={hanngelnameDilog_name}
        >submit</button>
      </dialog>
      <dialog
        ref={dialogEl_room}
        className="fixed top-[40%] left-[40%] p-6 bg-white shadow-lg w-[400px] max-w-full rounded-lg "
      >
        <p className='mb-[10px]'>enter your roomName</p>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
         className="w-full p-2 rounded mb-[10px] border-2 border-solid border-black bg-white"
        />
        <button 
        className=' w-full p-2 border rounded bg-blue-500 text-[#fff]'
        onClick={hanngelnameDilog_room}
        >submit</button>
      </dialog> */}
    </div>
    <Toaster />

    </>

  );

}

export default App;
