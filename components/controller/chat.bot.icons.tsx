
import React, { useState } from 'react';
import ChatbotMenu from '../chat.menu';

const ChatbotIcon: React.FC = () => {
    // Estado para controlar si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='chatbotIconContainer'>
            {/* Botón que al hacer clic abre o cierra el menú */}
            <button
                className='chatbotIcon'
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '🤯' : '🤖'}
            </button>
            {/* Si isOpen es true, muestra el ChatbotMenu */}
            {isOpen && <ChatbotMenu />}
        </div >
    );
};

export default ChatbotIcon;