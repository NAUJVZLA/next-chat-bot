
import React from 'react';

const WhatsAppButton: React.FC = () => {
    const whatsappNumber = '+573147327452';
    const message = 'Hola, estoy interesado en su ropa familiar.';

    const handleClick = () => {
        // Abre WhatsApp en una nueva pestaña con el mensaje predefinido
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <button className='whatsappButton' onClick={handleClick}>
            Enviar mensaje por WhatsApp
        </button>
    );
};

export default WhatsAppButton;