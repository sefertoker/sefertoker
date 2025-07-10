document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.createElement('button');
    chatButton.className = 'chat-button';
    chatButton.innerHTML = '<i class="fas fa-comments"></i>';
    document.body.appendChild(chatButton);

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.innerHTML = `
        <div class="chat-header">
            <h3>Canlı Destek</h3>
            <button class="close-chat">&times;</button>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input">
            <input type="text" placeholder="Mesajınızı yazın...">
            <button>Gönder</button>
        </div>
    `;
    document.body.appendChild(chatContainer);

    const closeButton = chatContainer.querySelector('.close-chat');
    const chatMessages = chatContainer.querySelector('.chat-messages');
    const chatInput = chatContainer.querySelector('input');
    const sendButton = chatContainer.querySelector('.chat-input button');

    let isChatOpen = false;

    function toggleChat() {
        isChatOpen = !isChatOpen;
        chatContainer.style.display = isChatOpen ? 'flex' : 'none';
        if (isChatOpen && chatMessages.children.length === 0) {
            addBotMessage('Merhaba! Size nasıl yardımcı olabilirim?');
        }
    }

    function addMessage(text, isBot) {
        const message = document.createElement('div');
        message.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(text) {
        addMessage(text, true);
    }

    function addUserMessage(text) {
        addMessage(text, false);
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (text) {
            addUserMessage(text);
            chatInput.value = '';
            setTimeout(() => generateBotResponse(text), 500);
        }
    }

    function generateBotResponse(userInput) {
        const responses = {
            'merhaba': 'Merhaba! Size nasıl yardımcı olabilirim?',
            'selam': 'Selam! Nasıl yardımcı olabilirim?',
            'nasılsın': 'İyiyim, teşekkür ederim. Size nasıl yardımcı olabilirim?',
            'iletişim': 'Bizimle iletişime geçmek için iletisim@alfayazilim.com adresini kullanabilirsiniz.',
            'teşekkürler': 'Rica ederim! Başka bir sorunuz var mı?',
            'görüşürüz': 'İyi günler! Tekrar görüşmek üzere!'
        };

        let botResponse = 'Üzgünüm, bu konuda size yardımcı olamıyorum. Lütfen farklı bir şekilde sorunuzu ifade edin veya başka bir soru sorun.';
        
        // Basit kelime eşleştirmesi
        for (let key in responses) {
            if (userInput.toLowerCase().includes(key)) {
                botResponse = responses[key];
                break;
            }
        }

        addBotMessage(botResponse);
    }

    chatButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
});
