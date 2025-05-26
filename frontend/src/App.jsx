import { useEffect, useState } from 'react';
import RoomList from './blocks/RoomList';
import Chat from './blocks/Chat';
import { socket } from './lib/scoket';
import toast, { Toaster } from 'react-hot-toast';
import { Transition } from '@headlessui/react';
import Hamburger from 'hamburger-react';
import './App.css'; // Optional: your custom styles
import JoinRoomDialog from './blocks/InputForm';
import CreatRoom from './blocks/CreatroomForm';

function App() {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dilogOpen, setDialogOpen] = useState(false);
  const [isinroom,setIsinroom] = useState(false);
 const [creatform, setCreatfrom] = useState(false);
 const [roompass,setRoompass] = useState("");

const handelleavroom = ()=>{
    socket.emit("leave-room", { roomName });
  }
  const createroominput = (roomname , roompassword)=>{
    socket.emit("createroom",{roomname,roompassword},(response)=>{
       if( response.status === "ok"){
        toast.success("room created sccusfully");
        
       }
    });
    setCreatfrom(false);
  }
  useEffect(() => {
    if (roomName && name && roompass) {
     
       socket.emit("joinroom", { roomName, name ,roompass}, (response) => {
        if (response.status === 'ok') {
            console.log("Successfully joined room:", roomName);
         
            setIsinroom(true)
            toast.success(`Joined room: ${roomName}`);
          
        } else {
            console.error("Failed to join:", response.message);
            alert(`Error: ${response.message}`);
        }
    });
      
    }
  }, [roomName, name]);

  useEffect(() => {
    socket.connect();

    const handleRoomsList = (data) => {
      setRoomList(data)
      console.log(data);
      
    };
    socket.on('roomsList', handleRoomsList);
    console.log();
    

    return () => {
      socket.off('roomsList', handleRoomsList);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="w-full h-[100dvh] flex flex-col bg-gray-100 relative">
        {/* Hamburger Button (Mobile) */}
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} color="blue" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <Transition
            show={isOpen}
            enter="transition duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className="fixed top-0 left-0 w-64 h-full  bg-gray-800 text-white p-4 z-40 md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <RoomList handelleavroom={handelleavroom} setIsOpen={setIsOpen} isOpen={isOpen} roomList={roomList} />
            </div>
          </Transition>

          {/* Sidebar - Desktop only */}
          <div className="hidden md:block md:w-1/3 bg-gray-800 text-white p-4">
            <RoomList setIsOpen={setIsOpen}
             isOpen={isOpen} 
             roomList={roomList} 
             setDialogOpen={setDialogOpen}
             isinroom={isinroom}
             setIsinroom={setIsinroom}
             setCreatfrom={setCreatfrom}
             />
             
          </div>

          {/* Chat Area */}
          <div className="w-full md:w-2/3">
            
          {isinroom ?
          <Chat name={name} roomName={roomName}  isinroom={isinroom}/> :
          <h1 className='text-center my-auto'>{"Go to chat"}</h1>}
          </div>
        </div>
      </div>
      <JoinRoomDialog 
      isOpen={dilogOpen} 
      roominput={(name,roomId,roompass)=>{
        setName(name);
        setRoomName(roomId);
        setRoompass(roompass);
      }}
      setDialogOpen={setDialogOpen} />
      <CreatRoom 
        creatform={creatform}
        createroominput={createroominput}
        setCreatfrom={setCreatfrom}
      />
      <Toaster />
    </>
  );
}

export default App;
