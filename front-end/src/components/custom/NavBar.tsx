import { Folder, PackagePlus, ScanBarcode } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";

const NavBar = () => {
    return <Menubar className='fixed bottom-0 left-0 right-0 h-14 flex justify-around'>
        <MenubarMenu>
            <MenubarTrigger >
                <NavLink className="flex-1"
        key="/inventaire"
        to="/inventaire"
        end>
        <Folder />
    </NavLink></MenubarTrigger>
        <MenubarTrigger ><NavLink className="flex-1"
            key="/"
            to="/"
            end>
            <ScanBarcode />
        </NavLink></MenubarTrigger>
        <MenubarTrigger ><NavLink className="flex-1"
            key="/ajouter"
            to="/ajouter"
            end>
            <PackagePlus />
        </NavLink>
        </MenubarTrigger>
    </MenubarMenu>
    </Menubar>;
};

export default NavBar;