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

import { useRef } from 'react';
import { Message } from '../types';

interface Props {
    mensagens: Message[];
    onEnviarMensagem: (mensagem: Message) => void;
}

export default function Chat({ mensagens, onEnviarMensagem }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputRef.current) {
            onEnviarMensagem({ texto: inputRef.current.value, autor: "Usuário"});
            inputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col h-full p-16">
            <div className="flex-grow p-4 overflow-y-auto">
                {mensagens.map((mensagem, index) => (
                    <div key={index} className={`mb-4 ${mensagem.autor === 'DietGem' ? 'text-left' : 'text-right'}`}>
                        <div className={`bg-${mensagem.autor === 'DietGem' ? 'gray-200' : 'green-200'} p-3 rounded-lg max-w-[70%]`}>
                            {mensagem.autor}: {mensagem.texto}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
                <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
                    ref={inputRef}
                />
                <button type="submit" className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                    Enviar
                </button>
            </form>
        </div>
    );

}