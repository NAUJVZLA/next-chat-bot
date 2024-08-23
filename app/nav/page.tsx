<<<<<<< HEAD
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
export default function Navigator() {
    return (
        <h1> navbar page </h1>
=======

import Carrusel from "../carrusel/page";
import { MenuNav } from "@/components/controller/navbar";
export default function Navigator() {
    return (
        <div>

            <MenuNav />
            <Carrusel />

        </div>
>>>>>>> 08d6560ffc96fa2c1c68eed900fd3a8224eda2a6

    );
}

