
import React, { useState } from 'react';
import WhatsAppButton from './chat.boton';
import ChatTree from './chat.bot.tree';
import styles from '../../styles/Chatbot.module.css';

const ChatbotMenu: React.FC = () => {
    // Estado para controlar si el chat está abierto o cerrado
    const [showChat, setShowChat] = useState(false);

    return (
        <div className='chatbotMenu'>
            {/* Botón de WhatsApp */}
            <WhatsAppButton />
            {/* Botón para abrir/cerrar el chat */}
            <button onClick={() => setShowChat(!showChat)}>
                {showChat ? 'Cerrar Chat' : 'Abrir Chat'}
            </button>
            {/* si showChat es true, muestra el chattree */}
            {showChat && <ChatTree />}
        </div>
    );
};

export default ChatbotMenu;