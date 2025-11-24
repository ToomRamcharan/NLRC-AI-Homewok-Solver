// Production version of script.js that uses Vercel serverless function
// This version keeps your API key completely secure on the server

// API endpoint - uses serverless function in production
const isProduction = window.location.hostname !== 'localhost' &&
    window.location.hostname !== '' &&
    !window.location.hostname.includes('127.0.0.1');

const API_URL = isProduction
    ? '/api/generate'  // Vercel serverless function
    : (typeof CONFIG !== 'undefined' ? CONFIG.API_URL : 'http://localhost:3000/api/generate');

// Note: In production, we don't need the API_KEY variable at all
// The serverless function handles it securely on the server

const form = document.getElementById('solverForm');
const submitBtn = document.getElementById('submitBtn');
const responseSection = document.getElementById('responseSection');
const loadingIndicator = document.getElementById('loadingIndicator');
const responseContent = document.getElementById('responseContent');
const copyBtn = document.getElementById('copyBtn');

// Chatbot Elements
const chatWidget = document.getElementById('chatWidget');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWindow = document.getElementById('chatWindow');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

const imageInput = document.getElementById('imageInput');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const removeImageBtn = document.getElementById('removeImageBtn');

let selectedImageBase64 = null;
let selectedImageMimeType = null;
let chatHistory = [];

// Chatbot Toggle
chatToggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
});

closeChatBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
});

// Chat Message Handling
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    // Add User Message
    addMessage(message, 'user');
    chatInput.value = '';

    // Show Typing Indicator
    const typingId = addTypingIndicator();

    try {
        // Construct History for API
        const history = chatHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        // Add current message
        history.push({
            role: 'user',
            parts: [{ text: message }]
        });

        // System Instruction
        if (chatHistory.length === 0) {
            history.unshift({
                role: 'user',
                parts: [{ text: "You are an expert academic mentor. Your goal is to help the user understand concepts deeply. Be accurate, patient, and clear. Use step-by-step explanations for complex problems." }]
            });
            history.splice(1, 0, {
                role: 'model',
                parts: [{ text: "Understood. I am ready to help you master this subject with accurate and clear guidance." }]
            });
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: history
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Server error: ${response.status}`);
        }

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        // Remove Typing Indicator
        removeMessage(typingId);

        // Add AI Message
        addMessage(aiText, 'ai');

    } catch (error) {
        console.error(error);
        removeMessage(typingId);
        addMessage("Sorry, I couldn't connect. Please try again.", 'ai');
    }
});

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('message', `${sender}-message`);

    if (sender === 'ai') {
        div.innerHTML = marked.parse(text);
    } else {
        div.textContent = text;
    }

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatHistory.push({ role: sender, text: text });
}

function addTypingIndicator() {
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.classList.add('message', 'ai-message');
    div.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// Image Upload Handling
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreviewContainer.classList.remove('hidden');
            selectedImageBase64 = e.target.result.split(',')[1];
            selectedImageMimeType = file.type;
        };
        reader.readAsDataURL(file);
    }
});

removeImageBtn.addEventListener('click', () => {
    imageInput.value = '';
    imagePreviewContainer.classList.add('hidden');
    selectedImageBase64 = null;
    selectedImageMimeType = null;
});

// Main Solver Form Handling
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const subject = document.getElementById('subject').value;
    const level = document.getElementById('level').value;
    const language = document.getElementById('language').value;
    const notes = document.getElementById('notes').value;

    if (!question && !selectedImageBase64) {
        alert('Please enter a question or upload an image.');
        return;
    }

    // UI Updates
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" style="width: 25px; height: 25px; border-width: 3px;"></span>';
    responseSection.classList.remove('hidden');
    loadingIndicator.classList.remove('hidden');
    responseContent.innerHTML = '';

    // Construct Prompt with Maximum Accuracy Focus
    let promptText = `# ROLE
You are a world-class polymath tutor with expertise across all academic disciplines. You are known for:
- 100% accuracy in problem-solving
- Deep conceptual understanding
- Clear, pedagogical explanations
- Rigorous verification of all work

# TASK
Solve the following homework problem with absolute precision and clarity.

**Subject:** ${subject}
**Level:** ${level}
**Language:** ${language}
`;
    if (question) promptText += `**Question:** ${question}\n`;
    if (notes) promptText += `**Additional Notes:** ${notes}\n`;

    promptText += `\n# METHODOLOGY
You MUST follow this exact structure:

## 1. Deep Analysis
- Carefully read and understand the problem
- Identify all given information, unknowns, and constraints
- If an image is provided, describe all relevant details extracted from it
- State the core concepts and principles that apply
- Outline your solution strategy before executing it

## 2. Step-by-Step Solution
- Execute your solution with clear, logical steps
- Show ALL work - do not skip steps
- Explain the reasoning behind each step
- Use proper mathematical notation (LaTeX format: $$...$$ for display, $...$ for inline)
- For complex problems, consider multiple approaches if applicable

## 3. Verification & Sanity Check
- Review your solution for errors
- Verify the answer makes logical/physical sense
- Double-check all calculations
- If possible, solve using an alternative method to confirm
- State your confidence level in the answer

## 4. Final Answer
- Present the final answer in a clear, highlighted block
- Include units if applicable
- Summarize key insights or learning points

# FORMATTING REQUIREMENTS
- Use Markdown for structure
- Use LaTeX for ALL mathematical expressions
- Use **bold** for key terms and concepts
- Use proper headings (##, ###) for organization
- Make the output visually clear and easy to follow

# CRITICAL RULES
- Accuracy is paramount - take your time to think through each step
- If you're unsure about any part, state your assumptions clearly
- Never guess or provide approximate answers without stating so
- Always show your reasoning process
`;

    if (selectedImageBase64) {
        promptText += "\n**[Image Analysis Required]**: An image has been uploaded. Carefully analyze all visual information and incorporate it into your solution.";
    }

    const requestBody = {
        contents: [{
            parts: [{ text: promptText }]
        }]
    };

    // Add image part if exists
    if (selectedImageBase64) {
        requestBody.contents[0].parts.push({
            inline_data: {
                mime_type: selectedImageMimeType,
                data: selectedImageBase64
            }
        });
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error?.message || errorData.message || response.statusText;
            throw new Error(`API Error: ${errorMessage}`);
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;

        // Render Markdown and Math
        loadingIndicator.classList.add('hidden');
        responseContent.innerHTML = marked.parse(generatedText);
        renderMathInElement(responseContent, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ]
        });

    } catch (error) {
        console.error(error);
        loadingIndicator.classList.add('hidden');
        responseContent.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-icon">➤</span>';
        responseSection.scrollIntoView({ behavior: 'smooth' });
    }
});

copyBtn.addEventListener('click', () => {
    const text = responseContent.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
});
