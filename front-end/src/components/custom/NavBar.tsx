import { Folder, PackagePlus, ScanBarcode } from "lucide-react";
import { NavLink } from "react-router-dom";

const Ajouter = () => {
    return <>
        <div className='fixed bottom-0 left-0 right-0 h-16 flex justify-around'>
            <NavLink className={({ isActive }) =>
                isActive
                    ? "flex-1 bg-sky-400 "
                    : "flex-1 hover:bg-gray-400"
            }
                key="/inventaire"
                to="/inventaire"
                end>
                <Folder />
            </NavLink>
            <NavLink className={({ isActive }) =>
                isActive
                    ? "flex-1 bg-sky-400 "
                    : "flex-1 hover:bg-gray-400"
            }
                key="/"
                to="/"
                end>
                <ScanBarcode/>
            </NavLink>
            <NavLink className={({ isActive }) =>
                isActive
                    ? "flex-1 bg-sky-400 "
                    : "flex-1 hover:bg-gray-400"
            }
                key="/ajouter"
                to="/ajouter"
                end>
                <PackagePlus />
            </NavLink>
        </div>
    </>;
};

export default Ajouter;