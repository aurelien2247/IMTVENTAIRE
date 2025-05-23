import { Folder, PackagePlus, ScanBarcode } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";

const NavBar = () => {
    return (
        <Menubar className='fixed bottom-0 left-0 right-0 h-16 flex justify-around bg-white border-t'>
            <div className="w-full h-full flex">
                <MenubarMenu>
                    <MenubarTrigger className="flex-1 p-0 min-w-[100px]">
                        <NavLink 
                            className={({ isActive }) => `w-full h-full flex flex-col items-center justify-center gap-1 transition-colors duration-200 hover:bg-gray-100 group ${isActive ? 'text-actif bg-actif/10' : 'text-gray-600'}`}
                            key="/inventaire"
                            to="/inventaire"
                            end
                        >
                            <Folder className="w-6 h-6 group-hover:stroke-actif transition-colors duration-200" />
                            <span className="text-xs group-hover:text-actif transition-colors duration-200">Inventaire</span>
                        </NavLink>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="flex-1 p-0 min-w-[100px]">
                        <NavLink 
                            className={({ isActive }) => `w-full h-full flex flex-col items-center justify-center gap-1 transition-colors duration-200 hover:bg-gray-100 group ${isActive ? 'text-actif bg-actif/10' : 'text-gray-600'}`}
                            key="/"
                            to="/"
                            end
                        >
                            <ScanBarcode className="w-6 h-6 group-hover:stroke-actif transition-colors duration-200" />
                            <span className="text-xs group-hover:text-actif transition-colors duration-200">Scanner</span>
                        </NavLink>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="flex-1 p-0 min-w-[100px]">
                        <NavLink 
                            className={({ isActive }) => `w-full h-full flex flex-col items-center justify-center gap-1 transition-colors duration-200 hover:bg-gray-100 group ${isActive ? 'text-actif bg-actif/10' : 'text-gray-600'}`}
                            key="/ajouter"
                            to="/ajouter"
                            end
                        >
                            <PackagePlus className="w-6 h-6 group-hover:stroke-actif transition-colors duration-200" />
                            <span className="text-xs group-hover:text-actif transition-colors duration-200">Ajouter</span>
                        </NavLink>
                    </MenubarTrigger>
                </MenubarMenu>
            </div>
        </Menubar>
    );
};

export default NavBar;