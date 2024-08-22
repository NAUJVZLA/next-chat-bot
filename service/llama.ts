import axios from 'axios';

const LLAMA_API_URL = 'https://api.llama-api.com'; // Reemplaza con la URL real de la API de Llama

export const llamaService = {
    sendMessage: async (message: string): Promise<string> => {
        try {
            const response = await axios.post(
                `${LLAMA_API_URL}/chat`,
                { message },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data.reply;
        } catch (error) {
            console.error('Error al enviar mensaje a Llama API:', error);
            return 'Lo siento, ha ocurrido un error al procesar tu mensaje.';
        }
    },
};