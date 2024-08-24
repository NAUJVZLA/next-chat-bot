// components/RuleChatbot.tsx
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

// Definimos el tipo para las reglas del chatbot
type Rule = {
    keywords: string[];
    response: string;
};

// Definimos las reglas del chatbot
const rules: Rule[] = [
    { keywords: ['hola', 'buenos días', 'buenas tardes'], response: '¡Hola! ¿En qué puedo ayudarte hoy?' },
    { keywords: ['producto', 'artículo'], response: '¡Tenemos una gran variedad de productos! ¿Buscas algo en particular?' },
    { keywords: ['precio', 'comprar'], response: 'Los precios varían según el producto. ¿Puedes especificar qué artículo te interesa?' },
    { keywords: ['envío', 'entrega'], response: 'Realizamos envíos a todo el país. El tiempo de entrega depende de tu ubicación.' },
    { keywords: ['pago', 'tarjeta', 'efectivo'], response: 'Aceptamos pagos con tarjeta de crédito, débito y transferencias bancarias.' },
    // Agrega más reglas según sea necesario
];

const RuleChatbot: React.FC = () => {
    const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
    const [input, setInput] = useState('');

    // Función para procesar el mensaje del usuario y obtener una respuesta
    const processMessage = (userInput: string): string => {
        const lowercasedInput = userInput.toLowerCase();
        for (const rule of rules) {
            if (rule.keywords.some(keyword => lowercasedInput.includes(keyword))) {
                return rule.response;
            }
        }
        return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";
    };

    // Función para enviar mensajes
    const sendMessage = () => {
        if (input.trim() === '') return;

        // Agregamos el mensaje del usuario al estado
        setMessages(prevMessages => [...prevMessages, { role: 'user', content: input }]);

        // Procesamos el mensaje y obtenemos la respuesta
        const botResponse = processMessage(input);

        // Agregamos la respuesta del bot al estado
        setMessages(prevMessages => [...prevMessages, { role: 'bot', content: botResponse }]);

        // Limpiamos el input
        setInput('');
    };

    // Manejador para el cambio en el input
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // Manejador para la tecla "Enter"
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    );
};

export default RuleChatbot;