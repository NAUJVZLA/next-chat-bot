// components/RuleChatbot.tsx
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

// Definimos el tipo para las reglas del chatbot
type Rule = {
    keywords: string[];
    response: string;
};

// Definimos las reglas del chatbot
const rules: Rule[] = [
    // Saludos y bienvenida
    { keywords: ['hola', 'buenos días', 'buenas tardes'], response: '¡Bienvenido a nuestra tienda online! ¿En qué puedo ayudarte hoy?' },

    // Categorías principales
    { keywords: ['producto', 'artículo', 'ropa', 'prendas'], response: 'Ofrecemos ropa para toda la familia. ¿Buscas algo para niños, adultos, mujeres o niñas?' },
    { keywords: ['niño', 'ropa de niño'], response: 'En nuestra sección de niños tenemos camisetas, pantalones, shorts y más. ¿Qué edad tiene el niño?' },
    { keywords: ['adulto', 'hombre', 'ropa de hombre'], response: 'Para hombres tenemos camisas, pantalones, trajes y ropa deportiva. ¿Buscas algo formal o casual?' },
    { keywords: ['mujer', 'ropa de mujer'], response: 'Nuestra colección de mujeres incluye vestidos, blusas, faldas y más. ¿Qué estilo te interesa?' },
    { keywords: ['niña', 'ropa de niña'], response: 'Para niñas ofrecemos vestidos, faldas, pantalones y conjuntos adorables. ¿Qué edad tiene la niña?' },

    // Tallas y medidas
    { keywords: ['talla', 'medida', 'guía de tallas'], response: 'Tenemos una guía de tallas detallada en nuestro sitio. ¿Necesitas ayuda con alguna talla en particular?' },

    // Precios y pagos
    { keywords: ['precio', 'costo', 'pago', 'tarjeta', 'efectivo'], response: 'Aceptamos múltiples formas de pago, incluyendo tarjetas y PayPal. ¿Tienes alguna duda sobre los precios o métodos de pago?' },

    // Envíos y entregas
    { keywords: ['envío', 'entrega', 'tiempo de entrega'], response: 'Realizamos envíos a todo el país. El tiempo estándar es de 3-5 días hábiles. ¿Necesitas más detalles sobre envíos?' },

    // Devoluciones y cambios
    { keywords: ['devolución', 'cambio', 'reembolso'], response: 'Ofrecemos devoluciones gratuitas dentro de los 30 días. ¿Quieres conocer más sobre nuestra política de devoluciones?' },

    // Ofertas y promociones
    { keywords: ['oferta', 'descuento', 'promoción'], response: 'Actualmente tenemos descuentos de hasta el 30% en ropa de temporada. ¿Te interesa alguna categoría en particular?' },

    // Atención al cliente
    { keywords: ['ayuda', 'atención al cliente', 'asistencia'], response: 'Nuestro equipo está disponible de lunes a viernes de 9:00 a 18:00. ¿En qué podemos ayudarte?' },

    // Materiales y cuidado
    { keywords: ['material', 'tela', 'cuidado'], response: 'Usamos materiales de alta calidad. Cada prenda tiene instrucciones específicas de cuidado. ¿Tienes dudas sobre algún material?' },

    // Colecciones y temporadas
    { keywords: ['colección', 'temporada', 'nueva llegada'], response: '¡Nuestra colección de primavera/verano acaba de llegar! ¿Quieres que te muestre las últimas tendencias?' },

    // Accesorios
    { keywords: ['accesorio', 'complemento', 'joyería'], response: 'Tenemos una amplia gama de accesorios, desde bolsos hasta joyería. ¿Buscas algo en particular?' },

    // Programa de fidelidad
    { keywords: ['puntos', 'fidelidad', 'recompensas'], response: 'Nuestro programa de fidelidad te permite ganar puntos en cada compra. ¿Quieres saber más sobre los beneficios?' },

    // Sostenibilidad
    { keywords: ['sostenible', 'ecológico', 'medio ambiente'], response: 'Nos comprometemos con la moda sostenible. Muchas de nuestras prendas están hechas con materiales reciclados.' },

    // Personalización
    { keywords: ['personalizar', 'customizar', 'a medida'], response: 'Ofrecemos servicios de personalización para ciertos artículos. ¿Te interesa personalizar alguna prenda?' },

    // Redes sociales
    { keywords: ['instagram', 'facebook', 'redes sociales'], response: '¡Síguenos en Instagram y Facebook para ver nuestras últimas colecciones y ofertas exclusivas!' },

    // Opiniones y reseñas
    { keywords: ['opinión', 'reseña', 'comentario'], response: 'Puedes ver las opiniones de otros clientes en cada producto. ¿Buscas información sobre algún artículo en particular?' },

    // Información de la empresa
    { keywords: ['sobre nosotros', 'historia', 'empresa'], response: 'Somos una empresa familiar con más de 20 años en el sector de la moda. ¿Quieres saber más sobre nuestra historia?' },
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