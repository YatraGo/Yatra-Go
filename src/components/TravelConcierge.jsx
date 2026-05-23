import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bot,
  ChevronDown,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import {
  buildGeminiSystemPrompt,
  buildRelevantKnowledge,
  CHAT_SUGGESTIONS,
  getHeuristicAnswer,
  getRelevantLinks,
} from '../lib/siteAssistant';
import { useAuth } from '../context/AuthContext';

const transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};
const LOCAL_GREETING_PATTERN = /^(hi|hello|hey|hii|heyy|hola|namaste|good morning|good afternoon|good evening)\b/i;

const cleanInlineText = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .trim();

const BlinkingCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
    className="inline-block w-[2px] h-4 ml-0.5 bg-brand-dark align-middle"
  />
);

// Premium thinking dots — shown while waiting for first byte
const ThinkingDots = () => (
  <div className="flex items-center gap-1.5 px-1 py-2">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        className="block h-2 w-2 rounded-full bg-gradient-to-b from-brand-gold to-[#1399de]"
      />
    ))}
  </div>
);

// Typing message — reveals text char-by-char like ChatGPT
const TypingMessage = ({ fullText, onDone, isStreaming }) => {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (indexRef.current >= fullText.length) {
      if (!isStreaming && fullText.length > 0) onDoneRef.current?.();
      return;
    }

    const interval = setInterval(() => {
      if (indexRef.current < fullText.length) {
        indexRef.current += 2; // 2 chars per tick — adjust for speed
        setDisplayed(fullText.slice(0, indexRef.current));
      } else {
        clearInterval(interval);
        if (!isStreaming) onDoneRef.current?.();
      }
    }, 18); // ~55 chars/sec — ChatGPT-like pace

    return () => clearInterval(interval);
  }, [fullText, isStreaming]);

  // When stream is done and typing is done, fire onDone
  useEffect(() => {
    if (!isStreaming && displayed.length >= fullText.length && fullText.length > 0) {
      onDoneRef.current?.();
    }
  }, [isStreaming, displayed.length, fullText.length]);

  const isTyping = displayed.length < fullText.length;

  return renderFormattedAssistantMessage(displayed || '', isTyping);
};

const renderFormattedAssistantMessage = (text, isStreaming = false) => {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const blocks = [];
  let currentList = null;

  const flushList = () => {
    if (currentList?.items?.length) {
      blocks.push(currentList);
    }
    currentList = null;
  };

  lines.forEach((line) => {
    if (/^#{1,6}\s/.test(line)) {
      flushList();
      blocks.push({
        type: 'heading',
        text: cleanInlineText(line.replace(/^#{1,6}\s*/, '')),
      });
      return;
    }

    if (/^\d+\.\s+/.test(line)) {
      const textValue = cleanInlineText(line.replace(/^\d+\.\s+/, ''));
      if (!currentList || currentList.type !== 'ordered') {
        flushList();
        currentList = { type: 'ordered', items: [] };
      }
      currentList.items.push(textValue);
      return;
    }

    if (/^[-*]\s+/.test(line)) {
      const textValue = cleanInlineText(line.replace(/^[-*]\s+/, ''));
      if (!currentList || currentList.type !== 'unordered') {
        flushList();
        currentList = { type: 'unordered', items: [] };
      }
      currentList.items.push(textValue);
      return;
    }

    flushList();
    blocks.push({
      type: 'paragraph',
      text: cleanInlineText(line),
    });
  });

  flushList();

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } }
      }}
      className="space-y-3.5"
    >
      {blocks.map((block, index) => {
        const isLastBlock = index === blocks.length - 1;

        if (block.type === 'heading') {
          return (
            <motion.div
              key={`${block.type}-${index}`}
              variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }}
              className="rounded-2xl bg-[linear-gradient(135deg,#fff8ef_0%,#ffffff_100%)] px-3.5 py-3 text-sm font-black tracking-[0.02em] text-brand-dark shadow-[inset_0_0_0_1px_rgba(255,138,23,0.12)]"
            >
              {block.text}
              {isStreaming && isLastBlock && <BlinkingCursor />}
            </motion.div>
          );
        }

        if (block.type === 'ordered') {
          return (
            <div key={`${block.type}-${index}`} className="space-y-2.5">
              {block.items.map((item, itemIndex) => {
                const isLastItem = itemIndex === block.items.length - 1;
                return (
                  <motion.div 
                    key={`${block.type}-${index}-${itemIndex}`} 
                    variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
                    className="flex gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-dark text-[11px] font-black text-white">
                      {itemIndex + 1}
                    </div>
                    <div className="pt-0.5 text-sm leading-7 text-slate-700">
                      {item}
                      {isStreaming && isLastBlock && isLastItem && <BlinkingCursor />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          );
        }

        if (block.type === 'unordered') {
          return (
            <div key={`${block.type}-${index}`} className="space-y-2.5">
              {block.items.map((item, itemIndex) => {
                const isLastItem = itemIndex === block.items.length - 1;
                return (
                  <motion.div 
                    key={`${block.type}-${index}-${itemIndex}`} 
                    variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
                    className="flex gap-3"
                  >
                    <div className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                    <div className="text-sm leading-7 text-slate-700">
                      {item}
                      {isStreaming && isLastBlock && isLastItem && <BlinkingCursor />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          );
        }

        return (
          <motion.div 
            key={`${block.type}-${index}`} 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-sm leading-7 text-slate-700"
          >
            {block.text}
            {isStreaming && isLastBlock && <BlinkingCursor />}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// ThinkingBubble removed in favor of ChatGPT-style cursor
const TOPIC_SUGGESTION_GROUPS = [
  {
    match: /(raft|rafting|river rafting|shivpuri|marine drive|brahmpuri|ganga)/i,
    suggestions: [
      'Best rafting route in Rishikesh',
      'Rafting price and age limit',
      'Is rafting safe for beginners?',
      'What is included in rafting?',
    ],
  },
  {
    match: /(bungee|giant swing|flying fox|zip|zorbing)/i,
    suggestions: [
      'Bungee jumping price',
      'Age limit for bungee',
      'Flying Fox details',
      'Best thrill combo option',
    ],
  },
  {
    match: /(camp|camping|bonfire|tent)/i,
    suggestions: [
      'Camping package details',
      'Camping includes kya hai?',
      'Best camping for families',
      'Rishikesh camping price',
    ],
  },
  {
    match: /(paragliding|kayaking|rock climbing|rappelling|activity|adventure)/i,
    suggestions: [
      'Best activities in Rishikesh',
      'Paragliding details',
      'Kayaking price and duration',
      'Rock climbing beginner friendly?',
    ],
  },
  {
    match: /(char dham|kedarnath|badrinath|pilgrimage|temple|haridwar)/i,
    suggestions: [
      'Char Dham package details',
      'Kedarnath yatra steps',
      'Best pilgrimage package',
      'Haridwar spiritual tour price',
    ],
  },
  {
    match: /(manali|shimla|spiti|kasol|honeymoon|himachal)/i,
    suggestions: [
      'Best Himachal package',
      'Manali honeymoon package',
      'Spiti trip details',
      'Shimla Manali tour price',
    ],
  },
  {
    match: /(hotel|stay|resort|room|accommodation)/i,
    suggestions: [
      'Hotel booking process',
      'Luxury resort options',
      'Budget stay details',
      'Best hotel service for family',
    ],
  },
  {
    match: /(car|cab|coach|tempo|vehicle|driver)/i,
    suggestions: [
      'Car rental rates',
      'Tempo traveller details',
      'Driver included hai?',
      'Best vehicle for group trip',
    ],
  },
  {
    match: /(train|railway|pnr|tatkal)/i,
    suggestions: [
      'Railway booking process',
      'Tatkal booking help',
      'Group train booking details',
      'PNR support available?',
    ],
  },
  {
    match: /(flight|air ticket|airport|airfare)/i,
    suggestions: [
      'Air ticket booking details',
      'Best route for Himachal',
      'International ticket support',
      'Web check-in help available?',
    ],
  },
  {
    match: /(bike|royal enfield|himalayan|thunderbird|activa)/i,
    suggestions: [
      'Bike rental prices',
      'Royal Enfield Himalayan details',
      'Bike rental process',
      'Safety gear included?',
    ],
  },
  {
    match: /(book|booking|steps|process|how to book|enquiry)/i,
    suggestions: [
      'How to book a tour?',
      'How to book hotel service?',
      'Contact details please',
      'WhatsApp booking help',
    ],
  },
  {
    match: /(contact|call|phone|email|whatsapp|address)/i,
    suggestions: [
      'Show contact details',
      'WhatsApp booking help',
      'Office address',
      'Talk to travel expert',
    ],
  },
];

const TravelConcierge = () => {
  const { currentUser, userProfile } = useAuth();
  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  // We no longer use GoogleGenAI directly on frontend.
  const canUseGemini = true; // Enabled since we use backend proxy

  const visitorName = userProfile?.name?.trim() || currentUser?.displayName?.trim() || '';
  const greetingText = visitorName
    ? `Hello! Welcome to Yatra Go. Hope you good Mr. ${visitorName}. How would you like me to assist you today?`
    : 'Hello! Welcome to Yatra Go. How would you like me to assist you today?';

  useEffect(() => {
    setMessages((current) => {
      if (current.length === 0) {
        return [{ id: 'welcome-message', role: 'assistant', text: greetingText }];
      }

      if (current[0]?.id === 'welcome-message') {
        return [{ ...current[0], text: greetingText }, ...current.slice(1)];
      }

      return current;
    });
  }, [greetingText]);

  const quickSuggestions = useMemo(() => {
    const recentText = [...messages]
      .slice(-4)
      .map((item) => item.text || '')
      .join(' ');

    const matchedGroup = TOPIC_SUGGESTION_GROUPS.find((group) => group.match.test(recentText));
    if (!matchedGroup) return CHAT_SUGGESTIONS;

    return matchedGroup.suggestions;
  }, [messages]);

  const scrollToBottom = () => {
    window.requestAnimationFrame(() => {
      const node = scrollRef.current;
      if (node) {
        node.scrollTop = node.scrollHeight;
      }
    });
  };

  const shouldUseAiForMessage = (message) => {
    const text = message.toLowerCase().trim();
    if (!text) return false;
    if (/(hindi|हिंदी|language|bhasha|भाषा|baat kar|speak)/i.test(message)) return true;
    if (/[\u0900-\u097F]/.test(message) && text.length > 10) return true;
    if (text.length <= 80) return false;
    if (LOCAL_GREETING_PATTERN.test(text)) return false;
    if (/(contact|call|phone|email|whatsapp|address|book|booking|steps|process|price|cost|package|activity|service)/i.test(text)) {
      return false;
    }
    return true;
  };

  const askGemini = async ({ priorMessages, latestMessage, fallbackAnswer, messageId }) => {
    try {
      const history = priorMessages.map((item) => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: item.text }],
      }));

      const systemInstruction = `${buildGeminiSystemPrompt(visitorName)}\n\nRelevant website context:\n${buildRelevantKnowledge(latestMessage)}`;

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          message: latestMessage,
          history,
          systemInstruction,
        }),
      });

      if (!response.ok) throw new Error('Backend proxy error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let streamBuffer = '';
      let streamErrored = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        streamBuffer += decoder.decode(value, { stream: true });
        const lines = streamBuffer.split('\n');
        streamBuffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') continue;
            if (dataStr) {
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.error) {
                  streamErrored = true;
                  const safeError = decodeURIComponent(parsed.error);
                  setMessages((current) =>
                    current.map((item) =>
                      item.id === messageId ? { ...item, text: safeError || fallbackAnswer } : item
                    )
                  );
                  continue;
                }

                if (typeof parsed.text === 'string') {
                  accumulated += decodeURIComponent(parsed.text);
                  setMessages((current) => current.map((item) => (item.id === messageId ? { ...item, text: accumulated } : item)));
                }
              } catch (e) {
                // Ignore incomplete JSON chunks
              }
            }
          }
        }
      }

      if (!streamErrored && !accumulated.trim()) {
        setMessages((current) => current.map((item) => (item.id === messageId ? { ...item, text: fallbackAnswer } : item)));
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages((current) => current.map((item) => (item.id === messageId ? { ...item, text: fallbackAnswer } : item)));
    }
  };

  const submitMessage = async (rawMessage) => {
    const message = rawMessage.trim();
    if (!message || isLoading) return;

    const userMessage = { id: `user-${Date.now()}`, role: 'user', text: message };
    const assistantMessageId = `assistant-${Date.now()}`;
    const fallbackAnswer = getHeuristicAnswer(message);
    const relevantLinks = getRelevantLinks(message);
    const priorMessages = messages.filter((item) => item.id !== 'welcome-message' || item.text);

    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantMessageId, role: 'assistant', text: '', links: relevantLinks },
    ]);
    setInput('');
    setIsLoading(true);
    scrollToBottom();

    try {
      if (shouldUseAiForMessage(message)) {
        await askGemini({
          priorMessages,
          latestMessage: message,
          fallbackAnswer,
          messageId: assistantMessageId,
        });
      } else {
        setMessages((current) =>
          current.map((item) => (item.id === assistantMessageId ? { ...item, text: fallbackAnswer, links: relevantLinks } : item))
        );
      }
    } catch (error) {
      console.error('Travel concierge fallback activated', error);
      setMessages((current) => current.map((item) => (item.id === assistantMessageId ? { ...item, text: fallbackAnswer, links: relevantLinks } : item)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.92, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.95 }}
            transition={transition}
            className="pointer-events-auto fixed bottom-[4.5rem] right-3 sm:bottom-[5rem] sm:right-6 z-[9999] w-[calc(100vw-1.5rem)] max-w-[408px] overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(247,251,255,0.98)_100%)] shadow-[0_28px_100px_rgba(8,38,61,0.26)] backdrop-blur-2xl"
            style={{ maxHeight: 'calc(100svh - 6rem)' }}
          >
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#08263d_0%,#0c3553_40%,#1399de_140%)] px-6 pb-6 pt-5 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,138,23,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(113,207,63,0.2),transparent_35%)]" />
              <div className="relative flex items-start justify-between gap-5">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl">
                    <Bot size={22} className="text-brand-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-brand-gold/90">
                      <ShieldCheck size={12} className="text-emerald-400" />
                      Verified Travel Expert
                    </div>
                    <h3 className="mt-1 text-[1.3rem] font-serif font-black text-white leading-tight">Yatra Go Assistant</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/10 p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
                  aria-label="Close travel concierge"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="space-y-5 overflow-y-auto px-5 py-5 pr-3"
              style={{ scrollbarGutter: 'stable', maxHeight: 'min(400px, calc(100svh - 16rem))' }}
            >
              {messages.map((message, index) => {
                const isAssistant = message.role === 'assistant';
                const isLastMsg = index === messages.length - 1;
                const stillStreaming = isLoading && isLastMsg && isAssistant;

                return (
                  <motion.div
                    key={message.id || `${message.role}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex gap-3.5 ${isAssistant ? '' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-dark text-white shadow-lg">
                        <Bot size={16} />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-[1.8rem] px-4 py-3.5 text-sm leading-7 shadow-sm ${
                        isAssistant
                          ? 'border border-slate-100 bg-white text-slate-700'
                          : 'bg-brand-dark text-white'
                      }`}
                    >
                      {isAssistant ? (
                        !message.text && stillStreaming ? (
                          <ThinkingDots />
                        ) : message.text ? (
                          <TypingMessage
                            fullText={message.text}
                            isStreaming={stillStreaming}
                            onDone={() => {
                              if (isLastMsg) scrollToBottom();
                            }}
                          />
                        ) : null
                      ) : (
                        <div className="whitespace-pre-line">{message.text}</div>
                      )}
                      {isAssistant && !stillStreaming && Array.isArray(message.links) && message.links.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-4 space-y-3"
                        >
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <Sparkles size={10} className="text-brand-gold" />
                            Recommended for you
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {message.links.map((link) => (
                              <Link
                                key={`${link.label}-${link.path}`}
                                to={link.path}
                                className="inline-flex items-center rounded-full border border-brand-gold/20 bg-[#fff8ef] px-3.5 py-2 text-xs font-bold text-brand-dark transition hover:border-brand-gold hover:bg-brand-gold hover:text-white"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                    {!isAssistant && (
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-gold text-brand-dark shadow-lg">
                        <User size={16} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="border-t border-slate-100 px-4 pb-4 pt-3">
              <AnimatePresence>
                {!isLoading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Ask Anything
                    </div>
                    <div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {quickSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => submitMessage(suggestion)}
                          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-brand-gold hover:bg-[#fff8ef] hover:text-brand-dark"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  submitMessage(input);
                }}
                className="flex items-end gap-3"
              >
                <div className="relative flex-1">
                  <MessageSquareText
                    size={16}
                    className="pointer-events-none absolute left-4 top-5.5 text-slate-400"
                  />
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        submitMessage(input);
                      }
                    }}
                    placeholder="Ask about rafting, packages, services, or anything else..."
                    className="min-h-[62px] w-full align-top resize-none rounded-[1.5rem] border border-slate-300 bg-white pl-11 pr-4 pt-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-[58px] w-[58px] items-center justify-center rounded-[1.35rem] bg-brand-gold text-brand-dark shadow-[0_12px_30px_rgba(255,138,23,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ff9a36] disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layout
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`pointer-events-auto fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#08263d_0%,#1399de_100%)] text-white shadow-[0_12px_30px_rgba(19,153,222,0.4)] backdrop-blur-xl border border-white/20 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(19,153,222,0.6)] ${isOpen ? 'px-6' : 'w-14'}`}
        aria-label="Toggle AI Assistant"
      >
        <motion.div layout className="flex items-center justify-center overflow-hidden">
          {isOpen ? <X size={20} className="text-white drop-shadow-md shrink-0" /> : <Bot size={26} className="text-white drop-shadow-md shrink-0" />}
          <AnimatePresence>
            {isOpen && (
              <motion.span 
                initial={{ opacity: 0, width: 0, marginLeft: 0 }} 
                animate={{ opacity: 1, width: 'auto', marginLeft: 8 }} 
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                className="text-[13px] font-black tracking-[0.15em] uppercase whitespace-nowrap"
              >
                Ask
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Pulse indicator only when closed */}
        {!isOpen && (
          <>
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute right-0 top-0 h-3 w-3 rounded-full bg-brand-gold border-2 border-[#1399de]"
            />
            <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-brand-gold border-2 border-[#1399de]" />
          </>
        )}
      </motion.button>
    </>
  );
};

export default TravelConcierge;
