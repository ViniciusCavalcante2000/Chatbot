document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');

    const botResponses = {
        greetings: {
            keywords: ['bom dia', 'ola', 'bom', 'boa', 'oi'],
            response: 'Olá! Agradecemos seu contato com a Kelly Bordados! ✨\nNeste momento, estamos com foco total em nossa área de produção.\nRetornaremos sua mensagem assim que finalizarmos uma etapa por aqui, dentro do nosso horário de atendimento:\nSegunda a Sexta, das 8h às 18h.\n\nPara agilizar, se desejar um orçamento, você pode nos adiantar as seguintes informações:\n- Sua ideia\n- A imagem\n- O tamanho do bordado\n- A quantidade de peças'
        },
        farewells: {
            keywords: ['obrigado', 'obrigada', 'valeu', 'depois', 'ok', 'okay'],
            response: 'Agradecemos o seu contato! Se precisar de algo mais, pode chamar. Tenha um ótimo dia!'
        },
        orcamento: {
            keywords: ['orcamento'],
            response: 'Para solicitar um orçamento, por favor, informe-nos:\n- Sua ideia\n- A imagem\n- O tamanho do bordado\n- A quantidade de peças'
        },
        pecas: {
            keywords: ['pecas', 'jaleco'],
            response: 'Sim, fornecemos camisas polo e camisas de gola redonda, mas apenas para pedidos acima de 10 unidades.\nNão fornecemos jalecos, mas bordamos em jalecos trazidos pelo cliente.\nVocê também pode trazer suas próprias peças, se desejar.'
        },
        bordado: {
            keywords: ['bordado'],
            response: 'Por gentileza, envie:\n- A imagem do bordado\n- O tamanho desejado\n- A quantidade de peças\n\nTamanhos recomendados:\n- Máximo para bolso: até 10 cm\n- Máximo para costas ou grande: até 25 cm x 15 cm'
        },
        camisa: {
            keywords: ['camisa', 'polo'],
            response: 'Para pedidos de camisas conosco, informe:\n- Tamanhos\n- Quantidades\n- Cores\n- Tipo de camisa (gola polo ou gola redonda)'
        },
        jaleco: {
            keywords: ['jaleco'],
            response: 'Para bordar um nome no peito + um brasão na manga, o valor é de R$ 50,00.\nPara outros tipos de bordado em jaleco, pedimos que aguarde nosso atendimento humano.\nSe quiser adiantar, envie:\n- Nome\n- Cor do jaleco\n- Brasão ou logotipo'
        },
        prazo: {
            keywords: ['prazo'],
            response: 'O prazo padrão para qualquer bordado é de até 7 dias úteis, contados a partir da aprovação final.'
        },
        matriz: {
            keywords: ['matriz', 'matrizes'],
            response: 'Nós da Kelly Bordados não criamos matrizes de bordado, que são os arquivos digitais necessários para a máquina bordar. No entanto, nós trabalhamos com uma parceira que faz esse serviço para nossos clientes.'
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