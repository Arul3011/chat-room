import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function CreatRoom({creatform,createroominput,setCreatfrom}) {
  const [rname, setRname] = useState("");
  const [rpass, setRpass] = useState("");
  const [loading,setLoading] = useState(false)
  const [conformRoomPassword,setConformRoomPassword] = useState("")

  const handleJoin = () => {
    if (rname && rpass && conformRoomPassword) {
        if(rpass === conformRoomPassword){
            createroominput(rname, rpass );
            setLoading(true);
        }
      
    }
  };

  return (
    <Transition appear show={creatform} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={()=> setCreatfrom(false)}
      >
        {/* Blurred Light Background */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm" />
        </Transition.Child>

        {/* Dialog Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold text-gray-900">
              Create Your Private Room
              </Dialog.Title>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="room Name"
                  value={rname}
                  onChange={(e) => setRname(e.target.value)}
                  className="w-full mb-3 px-4 py-2 border border-gray-500 shadow-sm rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Room password"
                  value={rpass}
                  onChange={(e) => setRpass(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border border-gray-500 shadow-sm rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                 <input
                  type="password"
                  placeholder="conform Room password"
                  value={conformRoomPassword}
                  onChange={(e) => setConformRoomPassword(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border border-gray-500 shadow-sm rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleJoin}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                 {!loading ?  "Create" : "loading..."}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
