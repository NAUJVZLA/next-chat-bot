// components/RuleChatbot.tsx
import React, { useState } from 'react';

// reglas de las palabras claves para las respuestas del chat 
const rules = [
  { keywords: ['hola', 'buenos días', 'buenas tardes'], response: '¡Hola! ¿En qué puedo ayudarte hoy?' },
  { keywords: ['comprar', 'ropa'], response: '¡tenemos ropa de niño , para ellos y ellas ?' },
  { keywords: ['necesito ', 'me ayudas'], response: '¡claro ! ¿Buscas algo en particular?' },
  { keywords: ['producto', 'artículo'], response: '¡Tenemos una gran variedad de productos! ¿Buscas algo en particular?' },
  { keywords: ['quien es kevin', 'el gordito de gafas'], response: '¡si es un coder especialista en worpress pero hace paginas feas  y el man le gusta comer mucha fritura ' },
  { keywords: ['precio', 'costo'], response: 'Los precios varían según el producto. ¿Puedes especificar qué artículo te interesa?' },
  { keywords: ['envío', 'entrega'], response: 'Realizamos envíos a todo el país. El tiempo de entrega depende de tu ubicación.' },
  { keywords: ['pago','que tipo de pago aceptan ', 'tarjeta', 'efectivo'], response: 'Aceptamos pagos con tarjeta de crédito, débito y transferencias bancarias.' },

];


const RuleChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');

  // Función para procesar el mensaje del usuario y obtener una respues del "bot"
  const processMessage = (userInput: string) => {
    const lowercasedInput = userInput.toLowerCase();
    for (const rule of rules) {
      if (rule.keywords.some(keyword => lowercasedInput.includes(keyword))) {
        return rule.response;
      }
    }
    return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";
  };

  // Función para enviar mensajes dl chat 
  const sendMessage = () => {
    if (input.trim() === '') return;

    // agregamos el mensaje del usuario al estado
    setMessages([...messages, { role: 'user', content: input }]);

    // Procesamos el mensaje y obtenemos  la respuesta
    const botResponse = processMessage(input);

    // agregamos la respuesta del bot al estado
    setMessages(prevMessages => [...prevMessages, { role: 'bot', content: botResponse }]);

    // dejamos en blanco el input
    setInput('');
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
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default RuleChatbot;