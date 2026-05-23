import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const geminiApiKey = process.env.GEMINI_API_KEY;
const itineraryApiKey = process.env.ITINERARY_BUILDER_API_KEY;
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
const cloudinaryAssetFolder = process.env.CLOUDINARY_ASSET_FOLDER || 'Users Profile Photo';
const aiProvider = (process.env.AI_PROVIDER || 'openrouter').toLowerCase();
const itineraryModel = process.env.ITINERARY_BUILDER_MODEL || process.env.VITE_ITINERARY_BUILDER_MODEL || 'deepseek/deepseek-v4-flash:free';
const chatModel = process.env.CHATBOT_MODEL || process.env.VITE_CHATBOT_MODEL || process.env.VITE_GEMINI_MODEL || 'deepseek/deepseek-v4-flash:free';
const web3FormsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
const ollamaChatModel = process.env.OLLAMA_CHAT_MODEL || process.env.OLLAMA_MODEL || 'llama3:8b';
const ollamaItineraryModel = process.env.OLLAMA_ITINERARY_MODEL || process.env.OLLAMA_MODEL || 'llama3:8b';
const isOpenRouterKey = (value = '') => value.startsWith('sk-or-v1-');
const fallbackModels = (process.env.OPENROUTER_FALLBACK_MODELS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
const AI_RPM_LIMIT = Number(process.env.AI_RPM_LIMIT || 15);
const AI_TPM_LIMIT = Number(process.env.AI_TPM_LIMIT || 250000);
const AI_RPD_LIMIT = Number(process.env.AI_RPD_LIMIT || 500);

const aiQuotaState = {
    minuteKey: '',
    minuteCount: 0,
    minuteTokens: 0,
    dayKey: '',
    dayCount: 0,
};

const getMinuteKey = () => {
    const now = new Date();
    return `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}-${now.getUTCHours()}-${now.getUTCMinutes()}`;
};

const getDayKey = () => {
    const now = new Date();
    return `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
};

const resetQuotaWindowsIfNeeded = () => {
    const minuteKey = getMinuteKey();
    const dayKey = getDayKey();

    if (aiQuotaState.minuteKey !== minuteKey) {
        aiQuotaState.minuteKey = minuteKey;
        aiQuotaState.minuteCount = 0;
        aiQuotaState.minuteTokens = 0;
    }

    if (aiQuotaState.dayKey !== dayKey) {
        aiQuotaState.dayKey = dayKey;
        aiQuotaState.dayCount = 0;
    }
};

const estimateTokens = (messages = []) => {
    const chars = messages.reduce((acc, msg) => acc + String(msg?.content || '').length, 0);
    return Math.max(1, Math.ceil(chars / 4));
};

const checkAndConsumeAiQuota = ({ messages }) => {
    resetQuotaWindowsIfNeeded();

    const estimatedPromptTokens = estimateTokens(messages);

    if (aiQuotaState.minuteCount + 1 > AI_RPM_LIMIT) {
        return { ok: false, error: `Rate limit reached: ${AI_RPM_LIMIT} requests per minute.` };
    }

    if (aiQuotaState.minuteTokens + estimatedPromptTokens > AI_TPM_LIMIT) {
        return { ok: false, error: `Token limit reached: ${AI_TPM_LIMIT} tokens per minute.` };
    }

    if (aiQuotaState.dayCount + 1 > AI_RPD_LIMIT) {
        return { ok: false, error: `Daily limit reached: ${AI_RPD_LIMIT} requests per day.` };
    }

    aiQuotaState.minuteCount += 1;
    aiQuotaState.dayCount += 1;
    aiQuotaState.minuteTokens += estimatedPromptTokens;

    return { ok: true };
};

const addOutputTokens = (text = '') => {
    resetQuotaWindowsIfNeeded();
    const outTokens = Math.max(1, Math.ceil(String(text).length / 4));
    aiQuotaState.minuteTokens += outTokens;
};

const buildModelCandidates = (primaryModel) => {
    const candidates = [
        primaryModel,
        'openrouter/auto',
        'deepseek/deepseek-v4-flash:free',
        ...fallbackModels,
    ].filter(Boolean);

    return [...new Set(candidates)];
};

const callOpenRouterChat = async ({ apiKey, messages, primaryModel }) => {
    const candidates = buildModelCandidates(primaryModel);
    let lastError = 'OpenRouter request failed';

    for (const model of candidates) {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:5173',
                'X-Title': 'Yatra Go Assistant',
            },
            body: JSON.stringify({
                model,
                messages,
            }),
        });

        const payload = await response.json().catch(() => ({}));
        if (response.ok) {
            return { payload, model };
        }

        lastError = payload?.error?.message || `OpenRouter request failed on model ${model}`;

        // Retry only for transient/provider-side errors, not auth or invalid key errors.
        if (response.status === 401 || response.status === 403) {
            break;
        }
    }

    throw new Error(lastError);
};

const callOllamaChat = async ({ messages, model }) => {
    const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model,
            messages,
            stream: false,
        }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(payload?.error || 'Ollama request failed');
    }

    const content = payload?.message?.content || '';
    if (!content) {
        throw new Error('No content returned by Ollama');
    }

    return { text: content, payload };
};

const chatClient = geminiApiKey && !isOpenRouterKey(geminiApiKey) ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;
const itineraryClient = itineraryApiKey && !isOpenRouterKey(itineraryApiKey) ? new GoogleGenAI({ apiKey: itineraryApiKey }) : null;
const isCloudinaryConfigured = Boolean(
    cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret && cloudinaryUploadPreset
);

const buildCloudinarySignature = (params) => {
    const filteredParams = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null && value !== '')
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return crypto
        .createHash('sha1')
        .update(`${filteredParams}${cloudinaryApiSecret}`)
        .digest('hex');
};

app.get('/api/cloudinary/sign-upload', (req, res) => {
    if (!isCloudinaryConfigured) {
        return res.status(500).json({ error: 'Cloudinary is not configured on backend' });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = {
        folder: cloudinaryAssetFolder,
        timestamp,
        upload_preset: cloudinaryUploadPreset,
    };

    const signature = buildCloudinarySignature(paramsToSign);

    return res.json({
        cloudName: cloudinaryCloudName,
        apiKey: cloudinaryApiKey,
        timestamp,
        signature,
        folder: cloudinaryAssetFolder,
        uploadPreset: cloudinaryUploadPreset,
    });
});

app.post('/api/cloudinary/delete-image', async (req, res) => {
    if (!isCloudinaryConfigured) {
        return res.status(500).json({ error: 'Cloudinary is not configured on backend' });
    }

    const { publicId } = req.body || {};
    if (!publicId) {
        return res.status(400).json({ error: 'publicId is required' });
    }

    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = buildCloudinarySignature({ public_id: publicId, timestamp });

        const formData = new URLSearchParams();
        formData.append('public_id', publicId);
        formData.append('timestamp', String(timestamp));
        formData.append('api_key', cloudinaryApiKey);
        formData.append('signature', signature);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/destroy`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString(),
            }
        );

        const payload = await response.json();
        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to delete Cloudinary image', details: payload });
        }

        return res.json({ result: payload.result || 'ok' });
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        return res.status(500).json({ error: 'Cloudinary delete request failed' });
    }
});

app.post('/api/forms/submit', async (req, res) => {
    if (!web3FormsAccessKey) {
        return res.status(500).json({ error: 'Web3Forms access key not configured in backend' });
    }

    try {
        const { subject, fields, replyTo } = req.body || {};
        if (!subject || !fields || typeof fields !== 'object') {
            return res.status(400).json({ error: 'Invalid form payload' });
        }

        const payload = {
            access_key: web3FormsAccessKey,
            subject,
            from_name: fields.from_name || 'Yatra Go Web Query',
            replyto: replyTo || fields.email || fields.customerEmail || '',
            ...fields,
        };

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.success) {
            return res.status(502).json({ error: result.message || 'Unable to submit form right now.' });
        }

        return res.json(result);
    } catch (error) {
        console.error('Web3Forms proxy error:', error);
        return res.status(500).json({ error: 'Form submission failed' });
    }
});

// Chatbot Endpoint (Server-Sent Events for streaming)
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history, systemInstruction } = req.body;

        if (aiProvider === 'ollama') {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const messages = [];
            if (systemInstruction) messages.push({ role: 'system', content: systemInstruction });
            (history || []).forEach((item) => {
                if (item?.role && item?.parts?.[0]?.text) {
                    const normalizedRole = item.role === 'model' ? 'assistant' : item.role;
                    messages.push({ role: normalizedRole, content: item.parts[0].text });
                }
            });
            messages.push({ role: 'user', content: message });
            const quota = checkAndConsumeAiQuota({ messages });
            if (!quota.ok) {
                res.write(`data: ${JSON.stringify({ error: encodeURIComponent(quota.error) })}\n\n`);
                res.write('data: [DONE]\n\n');
                return res.end();
            }

            try {
                const { text } = await callOllamaChat({ messages, model: ollamaChatModel });
                addOutputTokens(text);
                res.write(`data: ${JSON.stringify({ text: encodeURIComponent(text) })}\n\n`);
                res.write('data: [DONE]\n\n');
                return res.end();
            } catch (error) {
                const messageText = error?.message || 'Ollama chat request failed';
                res.write(`data: ${JSON.stringify({ error: encodeURIComponent(messageText) })}\n\n`);
                res.write('data: [DONE]\n\n');
                return res.end();
            }
        }
        
        if (!geminiApiKey) {
            return res.status(500).json({ error: "Chat API key not configured in backend" });
        }

        if (isOpenRouterKey(geminiApiKey)) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const messages = [];
            if (systemInstruction) {
                messages.push({ role: 'system', content: systemInstruction });
            }
            (history || []).forEach((item) => {
                if (item?.role && item?.parts?.[0]?.text) {
                    const normalizedRole = item.role === 'model' ? 'assistant' : item.role;
                    messages.push({ role: normalizedRole, content: item.parts[0].text });
                }
            });
            messages.push({ role: 'user', content: message });
            const quota = checkAndConsumeAiQuota({ messages });
            if (!quota.ok) {
                res.write(`data: ${JSON.stringify({ error: encodeURIComponent(quota.error) })}\n\n`);
                res.write('data: [DONE]\n\n');
                return res.end();
            }

            try {
                const { payload } = await callOpenRouterChat({
                    apiKey: geminiApiKey,
                    messages,
                    primaryModel: chatModel,
                });
                const text = payload?.choices?.[0]?.message?.content || '';
                if (text) {
                    addOutputTokens(text);
                    res.write(`data: ${JSON.stringify({ text: encodeURIComponent(text) })}\n\n`);
                }
                res.write('data: [DONE]\n\n');
                return res.end();
            } catch (error) {
                const messageText = error?.message || 'OpenRouter chat request failed';
                res.write(`data: ${JSON.stringify({ error: encodeURIComponent(messageText) })}\n\n`);
                res.write('data: [DONE]\n\n');
                return res.end();
            }
        }

        const model = chatClient.getGenerativeModel({ 
            model: chatModel || 'gemini-3.1-flash-lite',
            systemInstruction: systemInstruction,
        });

        const geminiMessages = (history || []).map((entry) => ({
            role: entry?.role || 'user',
            content: entry?.parts?.[0]?.text || '',
        }));
        geminiMessages.push({ role: 'user', content: message });
        const quota = checkAndConsumeAiQuota({ messages: geminiMessages });
        if (!quota.ok) {
            return res.status(429).json({ error: quota.error });
        }

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
            }
        });
        
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const stream = await chat.sendMessageStream(message);
        
        for await (const chunk of stream) {
            if (chunk.text) {
                // Ensure text is safely encoded for SSE
                const encodedText = encodeURIComponent(chunk.text);
                addOutputTokens(chunk.text);
                res.write(`data: ${JSON.stringify({ text: encodedText })}\n\n`);
            }
        }
        res.write('data: [DONE]\n\n');
        res.end();
    } catch (error) {
        console.error("Chat API Error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to generate response" });
        }
    }
});

// Itinerary Builder Endpoint
app.post('/api/itinerary', async (req, res) => {
    try {
        const { prompt } = req.body;
        const quota = checkAndConsumeAiQuota({ messages: [{ role: 'user', content: prompt }] });
        if (!quota.ok) {
            return res.status(429).json({ error: quota.error });
        }

        if (aiProvider === 'ollama') {
            const { text } = await callOllamaChat({
                messages: [{ role: 'user', content: prompt }],
                model: ollamaItineraryModel,
            });
            addOutputTokens(text);

            return res.json({ text, modelUsed: ollamaItineraryModel, provider: 'ollama' });
        }

        if (!itineraryApiKey) {
            return res.status(500).json({ error: 'Itinerary API key not configured in backend' });
        }

        if (!isOpenRouterKey(itineraryApiKey)) {
            if (!itineraryClient) {
                return res.status(500).json({ error: 'Gemini itinerary client not configured' });
            }

            const model = itineraryClient.getGenerativeModel({
                model: itineraryModel || 'gemini-3.1-flash-lite',
            });

            const response = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: 'application/json',
                },
            });

            let textResult = response.text;
            if (typeof textResult === 'function') {
                textResult = textResult();
            }

            if (!textResult) {
                return res.status(502).json({ error: 'No itinerary content returned by Gemini' });
            }
            addOutputTokens(textResult);

            return res.json({ text: textResult, modelUsed: itineraryModel, provider: 'gemini' });
        }

        const { payload, model } = await callOpenRouterChat({
            apiKey: itineraryApiKey,
            messages: [{ role: 'user', content: prompt }],
            primaryModel: itineraryModel,
        });

        const textResult = payload?.choices?.[0]?.message?.content;
        if (!textResult) {
            return res.status(502).json({ error: 'No itinerary content returned by OpenRouter' });
        }
        addOutputTokens(textResult);

        return res.json({ text: textResult, modelUsed: model });
    } catch(err) {
        console.error("Itinerary Generation Error:", err);
        return res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Secure Backend Server running on port ${PORT}`);
    console.log(`   - Chatbot Endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`   - Itinerary Endpoint: http://localhost:${PORT}/api/itinerary`);
});

