import Hamburger from "hamburger-react";

export default function Navbar({ isOpen, setIsOpen }) {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">

      <div className="md:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} size={24} color="white" />
      </div>

    
      <h2 className="text-lg font-semibold">Chat Rooms</h2>

  
   
    </nav>
  );
}
