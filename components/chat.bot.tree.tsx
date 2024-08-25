// importamos las cosas que necesitamos de react
import React, { useState, useEffect, useRef } from 'react';

// definimos cómo se ve una opción del chat
type ChatOption = {
    text: string;
    options?: ChatOption[];
    response?: string;
};

// aquí creamos todas las opciones del chat
const chatTree: ChatOption = {
    // este es el mensaje de bienvenida
    text: 'a VERI en línea. Escribe "menu" para ver las opciones disponibles.',
    options: [
        // aquí empiezan las opciones principales
        {
            // opción de calzados
            text: 'Calsados',
            options: [
                // subopción de tallas
                {
                    text: 'Tallas',
                    options: [
                        // más opciones dentro de tallas
                        { text: 'Smartphones', response: 'Tenemos una amplia gama de smartphones de las mejores marcas.' },
                        { text: 'Laptops', response: 'Ofrecemos laptops para todos los usos, desde básicas hasta gaming.' },
                        { text: 'Accesorios', response: 'Disponemos de todo tipo de accesorios electrónicos.' },
                    ]
                },
                // subopción de calzado
                {
                    text: 'Cazado',
                    options: [
                        // tipos de calzado
                        { text: 'Casual', response: 'Para un evento especial .. mira este link ...' },
                        { text: 'Deportivos', response: 'este es un link para que veas los diferentes estilos .' },
                        { text: 'Casa', response: 'Disponemos todas las marcas aqui un link para ir a .' },
                    ]
                },
                // subopción de deportivos
                {
                    text: 'Deportivos',
                    options: [
                        // tipos de deportivos
                        { text: 'Hombre', response: 'Nuestra colección para hombres incluye camisas, pantalones, trajes y más.' },
                        { text: 'Mujer', response: 'Para mujeres tenemos vestidos, blusas, pantalones y accesorios.' },
                        { text: 'Niños', response: 'Ropa cómoda y duradera para niños de todas las edades.' },
                    ]
                },
                // subopción de hogar
                {
                    text: 'Hogar',
                    options: [
                        // tipos de productos para el hogar
                        { text: 'Muebles', response: 'Ofrecemos muebles para todas las habitaciones de tu hogar.' },
                        { text: 'Decoración', response: 'Encuentra accesorios decorativos para darle estilo a tu casa.' },
                        { text: 'Electrodomésticos', response: 'Tenemos electrodomésticos de las mejores marcas.' },
                    ]
                },
            ],
        },
        // opción de productos
        {
            text: 'Productos',
            options: [
                // subopción de electrónica
                {
                    text: 'Electrónica',
                    options: [
                        // tipos de productos electrónicos
                        { text: 'Smartphones', response: 'Tenemos una amplia gama de smartphones de las mejores marcas.' },
                        { text: 'Laptops', response: 'Ofrecemos laptops para todos los usos, desde básicas hasta gaming.' },
                        { text: 'Accesorios', response: 'Disponemos de todo tipo de accesorios electrónicos.' },
                    ]
                },
                // subopción de calzado (repetida)
                {
                    text: 'Cazado',
                    options: [
                        // tipos de calzado
                        { text: 'Casual', response: 'Para un evento especial .. mira este link ...' },
                        { text: 'Deportivos', response: 'este es un link para que veas los diferentes estilos .' },
                        { text: 'Casa', response: 'Disponemos todas las marcas aqui un link para ir a .' },
                    ]
                },
                // subopción de ropa
                {
                    text: 'Ropa',
                    options: [
                        // tipos de ropa
                        { text: 'Hombre', response: 'Nuestra colección para hombres incluye camisas, pantalones, trajes y más.' },
                        { text: 'Mujer', response: 'Para mujeres tenemos vestidos, blusas, pantalones y accesorios.' },
                        { text: 'Niños', response: 'Ropa cómoda y duradera para niños de todas las edades.' },
                    ]
                },
                // subopción de hogar (repetida)
                {
                    text: 'Hogar',
                    options: [
                        // tipos de productos para el hogar
                        { text: 'Muebles', response: 'Ofrecemos muebles para todas las habitaciones de tu hogar.' },
                        { text: 'Decoración', response: 'Encuentra accesorios decorativos para darle estilo a tu casa.' },
                        { text: 'Electrodomésticos', response: 'Tenemos electrodomésticos de las mejores marcas.' },
                    ]
                },
            ],
        },
        // opción de ofertas
        {
            text: 'Ofertas',
            response: 'Actualmente en VERI tenemos descuentos de hasta el 50% en productos seleccionados.',
        },
        // opción de atención al cliente
        {
            text: 'Atención al cliente',
            options: [
                // tipos de atención al cliente
                { text: 'Devoluciones', response: 'Puedes devolver tu producto en un plazo de 30 días tras la compra.' },
                { text: 'Envíos', response: 'Ofrecemos envío gratuito en compras superiores a $50.' },
                { text: 'Contacto', response: 'Puedes contactarnos en el teléfono 3147327452 o por email a info@tienda.com' },
            ],
        },
        // opción de mi cuenta
        {
            text: 'Mi cuenta',
            options: [
                // opciones de la cuenta
                { text: 'Mis pedidos', response: 'Aquí podrás ver el estado de tus pedidos actuales y anteriores.' },
                { text: 'Mis datos', response: 'Puedes actualizar tu información personal y de envío.' },
                { text: 'Mis favoritos', response: 'Accede a tu lista de productos favoritos.' },
            ],
        },
    ],
};

// aquí empieza la parte principal del chat
const ChatTree: React.FC = () => {
    // guardamos la opción actual del chat
    const [currentOption, setCurrentOption] = useState<ChatOption>(chatTree);
    // guardamos la conversación
    const [conversation, setConversation] = useState<string[]>(['Bienvenidos ' + chatTree.text]);
    // guardamos lo que escribe el usuario
    const [userInput, setUserInput] = useState<string>('');
    // esto nos ayuda a hacer que el chat se mueva solo hacia abajo
    const conversationRef = useRef<HTMLDivElement>(null);

    // esto hace que el chat se mueva solo hacia abajo cuando hay nuevos mensajes
    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [conversation]);

    // esta función muestra el menú de opciones
    const showMenu = () => {
        if (currentOption.options) {
            const menuOptions = currentOption.options.map((option, index) =>
                `${index + 1}. ${option.text}`
            ).join('\n');
            setConversation(prev => [...prev, `Por favor, selecciona una opción:\n${menuOptions}`]);
        }
    };

    // esta función se ejecuta cuando el usuario envía un mensaje
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConversation(prev => [...prev, `Usuario: ${userInput}`]);

        if (userInput.toLowerCase() === 'menu') {
            // si el usuario escribe "menu", mostramos el menú principal
            setCurrentOption(chatTree);
            showMenu();
        } else {
            // si no, intentamos entender qué opción eligió el usuario
            const selectedIndex = parseInt(userInput) - 1;

            if (currentOption.options && selectedIndex >= 0 && selectedIndex < currentOption.options.length) {
                const selectedOption = currentOption.options[selectedIndex];

                if (selectedOption.response) {
                    // si la opción tiene una respuesta, la mostramos
                    setConversation(prev => [...prev, selectedOption.response!]);
                    setCurrentOption(chatTree);
                    setConversation(prev => [...prev, 'Escribe "menu" para volver al menú principal o haz otra pregunta.']);
                } else if (selectedOption.options) {
                    // si la opción tiene más opciones, las mostramos
                    setCurrentOption(selectedOption);
                    showMenu();
                }
            } else {
                // si el usuario escribió algo que no entendemos, le pedimos que lo intente de nuevo
                setConversation(prev => [...prev, 'Opción no válida. Por favor, intenta de nuevo o escribe "menu" para ver las opciones.']);
            }
        }

        // limpiamos lo que escribió el usuario
        setUserInput('');
    };

    // aquí creamos lo que se ve en la pantalla
    return (
        <div className='chatTree'>
            <div className='conversation' ref={conversationRef}>
                {conversation.map((message, index) => (
                    <div key={index} className={message.startsWith('Usuario:') ? 'userMessage' : 'botMessage'}>
                        {message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Cuentanos..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default ChatTree;