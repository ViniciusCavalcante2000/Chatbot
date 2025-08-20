document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');

   const botResponses = {
    greetings: {
        keywords: [
            'bom dia', 'boa tarde', 'boa noite', 'ola', 'olá', 'oi', 'oiê', 'salve', 'e ai', 'tudo bem', 'tudo bom', 'bem-vindo', 'eae'
        ],
        response: 'Olá! Agradecemos seu contato com a Kelly Bordados! ✨\nNeste momento, estamos com foco total em nossa área de produção.\nRetornaremos sua mensagem assim que finalizarmos uma etapa por aqui, dentro do nosso horário de atendimento:\nSegunda a Sexta, das 8h às 18h.\n\nPara agilizar, se desejar um orçamento, você pode nos adiantar as seguintes informações:\n- Sua ideia\n- A imagem\n- O tamanho do bordado\n- A quantidade de peças'
    },
    farewells: {
        keywords: [
            'obrigado', 'obrigada', 'valeu', 'depois', 'ok', 'okay', 'tchau', 'até logo', 'até mais', 'flw', 'falow', 'até mais tarde'
        ],
        response: 'Agradecemos o seu contato! Se precisar de algo mais, pode chamar. Tenha um ótimo dia!'
    },
    orcamento: {
        keywords: [
            'orcamento', 'preço', 'preco', 'quanto custa', 'valor', 'cotação', 'cotacao', 'orçamento rápido', 'custo', 'orçamento online', 'faço orçamento', 'preço do bordado', 'preco do bordado', 'preço do serviço', 'preco do servico', 'orçamento grátis', 'orcamento gratis'
        ],
        response: 'Para solicitar um orçamento, por favor, informe-nos:\n- Sua ideia\n- A imagem\n- O tamanho do bordado\n- A quantidade de peças'
    },
    pecas: {
        keywords: [
            'pecas', 'peças', 'camisa', 'camiseta', 'camiseta polo', 'camiseta gola redonda', 'blusa', 'jaleco', 'uniforme', 'avental', 'tecido', 'tecidos', 'malha', 'algodao', 'poliester', 'roupa', 'vestimenta', 'polo'
        ],
        response: 'Sim, fornecemos camisas polo e camisas de gola redonda, mas apenas para pedidos acima de 10 unidades.\nNão fornecemos jalecos, mas bordamos em jalecos trazidos pelo cliente.\nVocê também pode trazer suas próprias peças, se desejar.'
    },
    bordado: {
        keywords: [
            'bordado', 'bordar', 'bordagem', 'bordado personalizado', 'bordado em tecido', 'logo', 'logotipo', 'brasão', 'brasao', 'nome bordado', 'bordado em jaleco', 'desenho para bordado', 'arte para bordado', 'bordado industrial', 'bordado digital', 'bordado em máquina', 'bordado em maquina', 'bordado manual', 'toalha', 'toalhas'
        ],
        response: 'Por gentileza, envie:\n- A imagem do bordado\n- O tamanho desejado\n- A quantidade de peças\n\nTamanhos recomendados:\n- Máximo para bolso: até 10 cm\n- Máximo para costas ou grande: até 25 cm x 15 cm'
    },
    camisa: {
        keywords: [
            'camisa', 'polo', 't-shirt', 'camiseta polo', 'gola', 'gola polo', 'gola redonda'
        ],
        response: 'Para pedidos de camisas conosco, informe:\n- Tamanhos\n- Quantidades\n- Cores\n- Tipo de camisa (gola polo ou gola redonda)'
    },
    jaleco: {
        keywords: [
            'jaleco', 'jalecos', 'aventail'
        ],
        response: 'Para bordar um nome no peito + um brasão na manga, o valor é de R$ 50,00.\nPara outros tipos de bordado em jaleco, pedimos que aguarde nosso atendimento humano.\nSe quiser adiantar, envie:\n- Nome\n- Cor do jaleco\n- Brasão ou logotipo'
    },
    prazo: {
        keywords: [
            'prazo', 'entrega', 'tempo', 'quanto tempo', 'até quando', 'prazo de entrega', 'prazo padrão', 'tempo de produção', 'tempo de bordado', 'demora', 'quando fica pronto', 'prazo de confecção'
        ],
        response: 'O prazo padrão para qualquer bordado é de até 7 dias úteis, contados a partir da aprovação final.'
    },
    matriz: {
    keywords: [
        'matriz', 'matrizes', 'arquivo', 'arquivos para bordado', 'arquivo digital', 'digitalização', 'digitalizacao', 'converter arquivo', 'desenho vetorial', 'arquivo pes', 'dst', 'bordado computadorizado', 'criação de matriz', 'criacao de matriz', 'arquivo para máquina', 'arquivo para maquina'
    ],
    response: 'Nós da Kelly Bordados criamos matrizes de bordado, que são os arquivos digitais necessários para a máquina bordar. A matriz é o desenho digitalizado e formatado para que a máquina possa bordar com precisão o seu logo, arte ou nome desejado.'
},
    atendimento: {
        keywords: [
            'atendimento', 'horário', 'horario', 'contato', 'telefone', 'whatsapp', 'como entrar em contato', 'dúvida', 'duvida', 'suporte', 'ajuda', 'resposta', 'chat', 'atendimento online', 'reclamação', 'reclamacao', 'sugestão', 'sugestao'
        ],
        response: 'Nosso horário de atendimento é de Segunda a Sexta, das 8h às 18h. Para falar conosco, você pode enviar mensagem por aqui ou pelo WhatsApp.'
    },
    pagamento: {
        keywords: [
            'pagamento', 'formas de pagamento', 'dinheiro', 'cartão', 'cartao', 'pix', 'boleto', 'depósito', 'deposito', 'parcela', 'desconto', 'promoção', 'promocao', 'vale desconto'
        ],
        response: 'Aceitamos diversas formas de pagamento, incluindo dinheiro, cartão, pix e boleto. Entre em contato para mais detalhes sobre descontos e promoções.'
    },
    customizacao: {
        keywords: [
            'bordado 3d', 'bordado em relevo', 'bordado com linha especial', 'bordados coloridos', 'bordado dourado', 'bordado prata', 'aplicação', 'aplicacao', 'patch', 'silk', 'serigrafia', 'estampa'
        ],
        response: 'Oferecemos diversas opções de customização, incluindo bordados 3D, aplicações, silk, serigrafia e mais. Conte-nos o que deseja!'
    },
    qualidade: {
        keywords: [
            'qualidade', 'garantia', 'durabilidade', 'resistência', 'resistencia', 'acabamento', 'revisão', 'revisao', 'defeito', 'troca', 'devolução', 'devolucao', 'reclamação', 'reclamacao'
        ],
        response: 'Prezamos pela qualidade e garantimos nossos serviços. Se houver qualquer problema, estamos à disposição para revisão ou troca.'
    },
    geral: {
        keywords: [
            'dúvidas', 'duvidas', 'perguntas', 'informações', 'informacoes', 'detalhes', 'ajuda', 'suporte', 'como funciona', 'instruções', 'instrucoes', 'política', 'politica', 'regras', 'termos'
        ],
        response: 'Estamos aqui para ajudar! Por favor, especifique sua dúvida para que possamos atendê-lo da melhor forma.'
    },
    fallback: {
        response: 'Desculpe, não entendi sua pergunta. Por favor, tente formular sua dúvida de maneira mais específica.'
    }
};


    function displayMessage(message, isUserMessage) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', isUserMessage ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processUserInput(input) {
        const normalizedInput = input
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        let response = botResponses.fallback.response;

        for (const key in botResponses) {
            if (botResponses[key].keywords && botResponses[key].keywords.some(keyword => normalizedInput.includes(keyword))) {
                response = botResponses[key].response;
                break;
            }
        }

        if (response) {
            setTimeout(() => {
                displayMessage(response, false);
            }, 500);
        }
    }

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const userText = userInput.value;
            if (userText) {
                displayMessage(userText, true);
                processUserInput(userText);
                userInput.value = '';
            }
        }
    });
});
