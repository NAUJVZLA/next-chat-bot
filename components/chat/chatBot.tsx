// importamos las herramientas que tienen reat 
import React, { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from 'react';

// definimos que reglas recibe para sabeer que responder 
type Rule = {
    keywords: string[];  // palabras clave que va a  buscar
    response: string;    // respuesta del chatbot
};

// aquí están todas las reglas del chatbot lo que va a responder dependiedno que escriben
const rules: Rule[] = [
    // saludos y bienvenida
    {
        keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'qué tal'],
        response: '¡Bienvenido a nuestra tienda online de moda! ¿En qué puedo ayudarte hoy?'
    },

    // Ropa de niños
    {
        keywords: ['ropa de niño', 'ropa', 'ropa de nino', 'ropa infantil', 'ropa para niños', 'moda infantil', 'ropa de bebé', 'prendas infantiles'],
        response: 'Tenemos una amplia selección de ropa para niños y bebés. ¿Buscas algo específico como camisetas, pantalones, pijamas o ropa deportiva para niños?'
    },

    // Ropa de adultos - Hombres
    {
        keywords: ['ropa de hombre', 'moda masculina', 'prendas para caballero', 'ropa de caballero', 'vestimenta masculina'],
        response: 'Nuestra sección de hombres ofrece una gran variedad. ¿Estás buscando ropa casual, formal, deportiva o accesorios para hombre?'
    },

    // Ropa de adultos - Mujeres
    {
        keywords: ['ropa de mujer', 'moda femenina', 'prendas para dama', 'ropa de dama', 'vestimenta femenina'],
        response: 'En nuestra sección de mujeres encontrarás todo tipo de prendas. ¿Te interesa ropa casual, vestidos, ropa deportiva o quizás accesorios?'
    },

    // Tallas especiales
    {
        keywords: ['tallas grandes', 'tallas pequeñas', 'ropa xl', 'ropa xxl', 'tallas extra'],
        response: 'Ofrecemos una amplia gama de tallas para todos los cuerpos. ¿Necesitas ayuda para encontrar tu talla ideal?'
    },

    // Descuentos y ofertas
    {
        keywords: ['descuento', 'oferta', 'promoción', 'rebajas', 'liquidación', 'sale'],
        response: '¡Tenemos grandes descuentos! Actualmente ofrecemos hasta 50% de descuento en nuestra colección de temporada. ¿Te gustaría ver nuestras ofertas destacadas?'
    },

    // Ubicación
    {
        keywords: ['ubicación', 'dirección', 'tienda física', 'local', 'sucursal'],
        response: 'Nuestra tienda principal está ubicada en el centro comercial Plaza Mayor, calle Principal #123. También tenemos sucursales en otras ciudades. ¿Necesitas la dirección de alguna en particular?'
    },

    // Horarios
    {
        keywords: ['horario', 'hora de atención', 'cuándo abren', 'cuándo cierran'],
        response: 'Nuestras tiendas físicas están abiertas de lunes a sábado de 10:00 AM a 9:00 PM, y los domingos de 11:00 AM a 7:00 PM. Nuestra tienda online está disponible 24/7.'
    },

    // Envíos
    {
        keywords: ['hacen envios?', 'hacen envios ?', 'envios', 'delivery', 'entrega', 'shipping'],
        response: 'Sí, realizamos envíos a todo el país. Los tiempos de entrega varían según la ubicación, pero generalmente son de 3 a 5 días hábiles. ¿Necesitas información sobre costos de envío?'
    },

    // WhatsApp
    {
        keywords: ['tienen whatsapp ?', 'tienen whatsapp', 'dame tu contacto', 'número de teléfono', 'chat'],
        response: 'Puedes contactarnos por WhatsApp al número +573147327452. Estamos disponibles para chat de lunes a viernes de 9:00 AM a 6:00 PM.'
    },

    // Métodos de pago
    {
        keywords: ['pago', 'forma de pago', 'tarjeta', 'efectivo', 'transferencia', 'paypal'],
        response: 'Aceptamos múltiples formas de pago: tarjetas de crédito/débito, PayPal, transferencias bancarias y pago contra entrega en algunas zonas. ¿Tienes alguna preferencia en particular?'
    },

    // Cuentas bancarias
    {
        keywords: ['cuenta bancaria', 'depósito', 'banco', 'número de cuenta'],
        response: 'Tenemos cuentas en los principales bancos del país. Si deseas hacer un depósito o transferencia, puedo proporcionarte los detalles de la cuenta que prefieras. ¿De qué banco te gustaría la información?'
    },

    // Devoluciones y cambios
    {
        keywords: ['devolución', 'cambio', 'reembolso', 'garantía'],
        response: 'Ofrecemos devoluciones y cambios gratuitos dentro de los 30 días posteriores a la compra. ¿Necesitas más detalles sobre nuestra política de devoluciones?'
    },

    // Novedades y tendencias
    {
        keywords: ['novedades', 'nueva colección', 'tendencias', 'moda actual'],
        response: '¡Nuestra nueva colección de temporada acaba de llegar! Incluye las últimas tendencias en moda para toda la familia. ¿Te gustaría ver algunos de nuestros artículos destacados?'
    },

    // Atención al cliente
    {
        keywords: ['atención al cliente', 'servicio al cliente', 'ayuda', 'asistencia'],
        response: 'Nuestro equipo de atención al cliente está disponible para ayudarte. ¿Tienes alguna pregunta o inquietud específica en la que podamos asistirte?'
    }
];

// Esta es la función principal del chatbot
const RuleChatbot: React.FC = () => {
    // Guardamos los mensajes del chat
    const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
    // Guardamos lo que el usuario está escribiendo
    const [input, setInput] = useState('');
    // Creamos una referencia para el final de los mensajes
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Esta función hace que el chat se desplace hacia abajo automáticamente
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Usamos esta función cada vez que hay nuevos mensajes
    useEffect(scrollToBottom, [messages]);

    // Esta función busca la respuesta correcta para el mensaje del usuario
    const processMessage = (userInput: string): string => {
        const lowercasedInput = userInput.toLowerCase();
        for (const rule of rules) {
            if (rule.keywords.some(keyword => lowercasedInput.includes(keyword))) {
                return rule.response;
            }
        }
        return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";
    };

    // esta función envía el mensaje del usuario y obtiene la respuesta del bot
    const sendMessage = () => {
        if (input.trim() === '') return;

        // agregamos el mensaje del usuario
        setMessages(prevMessages => [...prevMessages, { role: 'user', content: input }]);

        // obtenemos la respuesta del bot
        const botResponse = processMessage(input);

        // agregamos la respuesta del bot
        setMessages(prevMessages => [...prevMessages, { role: 'bot', content: botResponse }]);

        // dejamos limpio el cuadro de texto
        setInput('');
    };

    // esta función se activa cuando el usuario escribe en el cuadro de texto
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // esta función se activa cuando el usuario presiona una tecla
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // aquí estructuramos el chat 
    return (
        <div className="chatbot-container">
            <div className="message.user">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {message.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <input className='input-container'
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <div>
                <button className='boton' onClick={sendMessage}>Enviar</button>
            </div>

        </div>
    );
};

// exportamos el chatbot para que se pueda usar en otras partes de la aplicación
export default RuleChatbot;