'use client'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"

import Carrusel from "../carrusel/page";
import { MenuNav } from "@/components/controller/navbar";
import ChatBox from "@/components/chat/chatBot";


export default function Navigator() {
    return (
        <div>
            <MenuNav />
            <Carrusel />
            <ChatBox />

        </div>


    );
}

