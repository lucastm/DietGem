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

import Chat from '@/components/Chat';
import Header from '@/components/Header';
import { Message } from '@/types';
import { useState, useEffect, useRef } from 'react';
// import Chat from '../components/Chat';
// import FormularioPerfil from '../components/FormularioPerfil';

export default function ChatPage() {
    const [mensagens, setMensagens] = useState<Message[]>([]);
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [perfilUsuario, setPerfilUsuario] = useState<PerfilUsuario | null>(null);
    const fimDaConversaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchInitialMessage = async () => {
            const mensagemInicial: Message = {
                texto: 'Olá! Sou o DietGem, seu guia inteligente para uma alimentação saudável. Para começar, conte-me um pouco sobre você e seus objetivos.',
                autor: 'DietGem',
            };
            try {
                const response = await fetch('/api/greeting', { method: 'GET' });
                const data = await response.json();
                mensagemInicial.texto = data.message;
            } catch (error) {
                console.error(error);
            }
            setMensagens([mensagemInicial]);
            setExibirFormulario(true);
        };

        fetchInitialMessage();
    }, []);

    const adicionarMensagem = async (mensagem: Message) => {
        setMensagens((mensagensAtuais) => [...mensagensAtuais, mensagem]);
        const response = await fetch('/api/message', { method: 'POST', body: JSON.stringify({ message: mensagem }) });
        const texto = await response.text()
        setMensagens((mensagensAtuais) => [...mensagensAtuais, { texto, autor: 'DietGem'}]);
    };

    const handleFormularioEnviado = (perfil: PerfilUsuario) => {
        setPerfilUsuario(perfil);
        setExibirFormulario(false);
        // TODO: Enviar perfil para a API e obter resposta do DietGem
    };

    // TODO: Implementar a lógica para rolar a tela para o final da conversa
    // const rolarParaOFinal = () => {
    //   if (fimDaConversaRef.current) {
    //     fimDaConversaRef.current.scrollIntoView({ behavior: 'smooth' });
    //   }
    // };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Header />
            <Chat mensagens={mensagens} onEnviarMensagem={adicionarMensagem} />
            {/* {exibirFormulario && (
                // <FormularioPerfil onFormularioEnviado={handleFormularioEnviado} />
            )} */}
            {/* <div ref={fimDaConversaRef} /> */}
        </div>
    );
}


type PerfilUsuario = {
    // TODO: Definir os campos do perfil do usuário
};

