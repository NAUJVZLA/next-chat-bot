
import React, { useState } from 'react';

// definición del tipo para las opciones del chat
type ChatOption = {
    text: string;
    options?: ChatOption[];
    response?: string;
};

// arbol de opciones del chat
const chatTree: ChatOption = {
    text: '¿Hola que tal tu dia , En qué puedo ayudarte?',
    options: [
        {
            text: 'Ropa Perros',
            options: [
                { text: 'Gorros', response: 'Tenemos Muchos gorros de perros' },
                { text: 'Cuerdas', response: 'De que color buscabas ' },
            ],
        },
        {
            text: 'Ropa para niños',
            options: [
                { text: 'Camisetas', response: 'Tenemos una gran variedad de camisetas para niños de todas las edades.' },
                { text: 'Pantalones', response: 'Ofrecemos pantalones cómodos y duraderos para niños activos.' },
            ],
        },
        {
            text: 'Ropa para niños',
            options: [
                { text: 'Camisetas', response: 'Tenemos una gran variedad de camisetas para niños de todas las edades.' },
                { text: 'Pantalones', response: 'Ofrecemos pantalones cómodos y duraderos para niños activos.' },
            ],
        },
        {
            text: 'Ropa para adultos',
            options: [
                { text: 'Mujeres', response: 'Nuestra colección para mujeres incluye vestidos, blusas, pantalones y más.' },
                { text: 'Hombres', response: 'Para hombres tenemos camisas, pantalones, trajes y ropa casual.' },
                { text: 'Calzado', response: 'Tenis , Cotizas.' },
            ],
        },
        {
            text: 'Ofertas especiales',
            response: 'Actualmente tenemos un 30% de descuento en toda la ropa de verano para la familia.',
        },
    ],
};

const ChatTree: React.FC = () => {
    // Estado para la opción actual del chat
    const [currentOption, setCurrentOption] = useState<ChatOption>(chatTree);
    // Estado para almacenar la conversación
    const [conversation, setConversation] = useState<string[]>([chatTree.text]);

    const handleOptionClick = (option: ChatOption) => {
        // Añade la opción seleccionada a la conversación
        setConversation([...conversation, option.text]);
        if (option.response) {
            // Si hay una respuesta, la añade a la conversación
            setConversation(prev => [...prev, option.response!]);
        }
        if (option.options) {
            // Si hay más opciones, actualiza la opción actual
            setCurrentOption(option);
        } else {
            // Si no hay más opciones, vuelve al inicio
            setCurrentOption({ text: '¿Puedo ayudarte en algo más?', options: chatTree.options });
        }
    };

    return (
        <div className='styles.chatTree'>
            <div className='conversation'>
                {conversation.map((message, index) => (
                    <div key={index} className={index % 2 === 0 ? 'userMessage' : 'botMessage'}>
                        {message}
                    </div>
                ))}
            </div>
            <div className='options'>
                {currentOption.options?.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(option)}>
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatTree;