import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Interfaz para un mensaje
interface IMessage {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const ChatBox: React.FC = () => {
    // Estado para almacenar los mensajes
    const [messages, setMessages] = useState<IMessage[]>([]);
    // Estado para el input del usuario
    const [input, setInput] = useState('');
    // Estado para manejar la carga
    const [isLoading, setIsLoading] = useState(false);
    // Referencia para el scroll automático
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    // Efecto para scroll automático
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Función para obtener respuesta del bot
    const getBotResponse = async (message: string): Promise<string> => {
        try {
            const response = await axios.post('/api/chat', { message });
            return response.data.reply;
        } catch (error) {
            console.error('Error al obtener respuesta del bot:', error);
            return "Lo siento, ocurrió un error al procesar tu mensaje.";
        }
    };

    // Función para manejar el envío de mensajes
    const handleSend = async () => {
        if (input.trim() && !isLoading) {
            // Añadir el mensaje del usuario
            const userMessage: IMessage = {
                id: messages.length,
                text: input,
                sender: 'user',
            };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInput('');
            setIsLoading(true);

            // Obtener respuesta del bot
            const botResponse = await getBotResponse(input);
            const botMessage: IMessage = {
                id: messages.length + 1,
                text: botResponse,
                sender: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessage]);
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="messages">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading}
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={handleSend} disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
        </div>
    );
};

export default ChatBox;