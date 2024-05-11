// Copyright (C) 2024 lucas
// 
// This file is part of diet-gem.
// 
// diet-gem is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// diet-gem is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with diet-gem.  If not, see <https://www.gnu.org/licenses/>.


import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const request = JSON.parse(req.body)
            const userMessage = request.message.texto
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Com base na resposta do usuário sobre seu perfil e objetivos. Interprete e identifique informações relevantes no contexto de dieta e nutrição como idade, sexo, peso, objetivo etc.
            resposta do usuário: ${userMessage}`
            const result = await model.generateContent({
                // safetySettings: [
                //     { category: "", threshold: "" }
                // ]
                generationConfig: {
                    temperature: 0.7, // Adjust temperature for creativity
                    candidateCount: 1, // Number of responses to generate
                    topK: 40, // Adjust top_k for diversity
                    topP: 0.95, // Adjust top_p for focus
                },
                // systemInstruction: "Você é uma IA assistente de nutrição e dietas do aplicativo DietGem.",
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            });
            const response = await result.response;

            // Process the response from Gemini
            const initialMessage = response.text();

            res.status(200).json({ message: initialMessage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching initial message from Gemini.' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}