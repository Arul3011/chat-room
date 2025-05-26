

export default function RoomList({ setCreatfrom,roomList, setIsOpen,isinroom ,setIsinroom,setDialogOpen}) {
  console.log(roomList);
  const handelcreatroom=()=>{
    setCreatfrom(true);
  }

  const handeljoinroom=()=>{
    if(!isinroom) setDialogOpen(true);
  }
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Available Rooms</h2>

      {/* Create & Join Room Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handelcreatroom}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
        >
          Create Room
        </button>
        <button
          onClick={handeljoinroom}
          className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
        >
          Join Room
        </button>
      </div>

      {/* Room List */} 
       <ul className="flex-1 overflow-y-auto space-y-2">
        {roomList.length === 0 ? (
          <p className="text-gray-400">No rooms available</p>
        ) : (
          roomList.map((room, index) => (
            <li
              key={index}
              className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition"
              onClick={() => {
                setIsOpen(false); // Close sidebar on mobile when room is clicked
              }}
            >
              {room}
            </li>
          ))
        )}
      </ul>
      <button className="py-3 bg-red-400" onClick={()=> setIsinroom(false)}>Leave room</button>
    </div>
  );
}
