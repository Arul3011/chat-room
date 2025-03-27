import { useState } from "react";
import Hamburger from 'hamburger-react'

export default function Rooms({ roomList }) {
    const [isOpen, setIsOpen] = useState(false); // ✅ Use boolean instead of []

    return (
        <div>
           
                    <div
                  
                className="fixed top-4 left-2 text-white rounded md:hidden z-[2] bg-blue-500"

                    >
               <Hamburger 
               toggled={isOpen} 
               toggle={setIsOpen}  
               size={20}
               color="white"
               />
                    </div>
         

          
            <nav className={`fixed top-0 left-0 bg-blue-500 h-screen p-4 text-white overflow-y-scroll z-[1]
                transition-all duration-300 ${isOpen ? "w-2/3 block" : "w-0 hidden"} md:block md:w-[30%]`}>
                
             

                <div className="mb-4 text-lg font-bold">Logo</div>

                <div className="w-[90%] rounded-[5px] bg-blue-200 mt-[20px] h-[100px] flex flex-wrap justify-around items-center mb-[10px]">
                    <button
                        onClick={() => alert("clicked")}
                        className="px-2 py-2 bg-blue-500  text-white text:xs md:text-xl rounded-md hover:bg-blue-600 transition">
                        Create Room
                    </button>
                    <button
                        onClick={() => alert("clicked")}
                        className="px-2 py-2 bg-blue-500 text-white rounded-md text:xs md:text-xl hover:bg-blue-600 transition">
                        Join Room
                    </button>
                </div>

                {/* Room List */}
                {roomList.length === 0 ? (
                    <p>No rooms available</p>
                ) : (
                    <ul>
                        {roomList.map((val, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    if (confirm("Want to join this room?")) {
                                        alert("Joined!");
                                    } else {
                                        alert("Cancelled");
                                    }
                                }}
                                className="w-[90%] my-[2px] py-3 px-4 bg-blue-300 rounded-[5px] shadow-md hover:bg-blue-400 transition cursor-pointer">
                                {val}
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </div>
    );
}
