import { useEffect, useState } from 'react';
import RoomList from './blocks/RoomList';
import Chat from './blocks/Chat';
import { socket } from './lib/scoket';
import toast, { Toaster } from 'react-hot-toast';
import { Transition } from '@headlessui/react';
import Hamburger from 'hamburger-react';
import './App.css'; // Optional: your custom styles

function App() {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const pname = prompt('Enter your name') || '';
    const rname = prompt('Enter your room name or room ID') || '';

    if (!pname || !rname) {
      toast.error('Name and Room are required!');
      return;
    }

    setName(pname);
    setRoomName(rname);
  }, []);

  useEffect(() => {
    if (roomName && name) {
      socket.emit('joinroom', { roomName, name });
    }
  }, [roomName, name]);

  useEffect(() => {
    socket.connect();

    const handleRoomsList = (data) => setRoomList(data);
    socket.on('roomsList', handleRoomsList);

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
          {/* Sidebar - Mobile with Transition */}
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
              <RoomList setIsOpen={setIsOpen} isOpen={isOpen} roomList={roomList} />
            </div>
          </Transition>

          {/* Sidebar - Desktop only */}
          <div className="hidden md:block md:w-1/3 bg-gray-800 text-white p-4">
            <RoomList setIsOpen={setIsOpen} isOpen={isOpen} roomList={roomList} />
          </div>

          {/* Chat Area */}
          <div className="w-full md:w-2/3">
            <Chat name={name} roomName={roomName} />
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default App;
