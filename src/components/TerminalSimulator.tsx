import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, RefreshCw } from 'lucide-react';

interface TerminalMessage {
  id: string;
  type: 'input' | 'output';
  content: string;
}

export const TerminalSimulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [draftInput, setDraftInput] = useState('');
  const [currentModel, setCurrentModel] = useState('nvidia/nemotron-3-super-120b-a12b');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: 'welcome',
      type: 'output',
      content: `r.outers (rts) v2.4.0 — Autonomous AI Coding Agent for Termux & Linux
Engine: NVIDIA NIM | Active Model: nvidia/nemotron-3-super-120b-a12b
Type /help for slash commands or enter your prompt.`
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleExecute = async (cmdText?: string) => {
    const cmd = (cmdText !== undefined ? cmdText : input).trim();
    if (!cmd || isProcessing) return;

    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');

    setMessages(prev => [...prev, { id: Math.random().toString(), type: 'input', content: cmd }]);
    setIsProcessing(true);

    setTimeout(() => {
      let output = '';
      if (cmd === '/help') {
        output = `/setup      Configure API keys and providers\n/model      Switch active AI model\n/skills     List active prompt skills\n/memory     View token usage\n/clear      Reset conversation context`;
      } else if (cmd.startsWith('/model')) {
        const mod = cmd.replace('/model', '').trim() || 'nvidia/nemotron-3-super-120b-a12b';
        setCurrentModel(mod);
        output = `✔ Switched active model to: ${mod}`;
      } else if (cmd === '/skills') {
        output = `Active skills:\n • anti-slop (DURING mode)\n • systematic-debugging\n • apktool-modding`;
      } else if (cmd === '/memory') {
        output = `Context: 128k tokens | History turns: 3 | Active buffer: 2.1k tokens`;
      } else if (cmd === '/clear') {
        output = `✔ Conversation context reset.`;
      } else {
        output = `RTS > Writing script.py (24 lines)\n⚡ RTS > Running python3 script.py\n✔ RTS > Completed task successfully.`;
      }

      setMessages(prev => [...prev, { id: Math.random().toString(), type: 'output', content: output }]);
      setIsProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === -1) {
        setDraftInput(input);
        const idx = history.length - 1;
        setHistoryIndex(idx);
        setInput(history[idx]);
      } else if (historyIndex > 0) {
        const idx = historyIndex - 1;
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < history.length - 1) {
        const idx = historyIndex + 1;
        setHistoryIndex(idx);
        setInput(history[idx]);
      } else {
        setHistoryIndex(-1);
        setInput(draftInput);
      }
    }
  };

  const modelLabel = currentModel.replace('nvidia/', '').replace(/-/g, ' ');

  return (
    <div className="max-w-4xl mx-auto my-6 rounded-lg border border-zinc-800 bg-black font-mono text-xs overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-800 bg-zinc-950 text-zinc-400">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span>rts session</span>
        </div>
        <button
          onClick={() => setMessages([])}
          className="p-1 hover:text-white rounded"
          title="Clear screen"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      {/* Body */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="p-4 space-y-3 min-h-[300px] max-h-[460px] overflow-y-auto cursor-text text-zinc-200 leading-relaxed"
      >
        {messages.map(msg => (
          <div key={msg.id} className="space-y-0.5">
            {msg.type === 'input' ? (
              <div className="text-zinc-100 flex items-start space-x-2">
                <span className="text-zinc-500 font-bold">r.outers &gt;</span>
                <span>{msg.content}</span>
              </div>
            ) : (
              <pre className="text-zinc-400 whitespace-pre-wrap pl-2 border-l border-zinc-800">
                {msg.content}
              </pre>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className="text-zinc-500 animate-pulse pl-2">
            r.outers is executing...
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-950/80 space-y-1.5">
        <div className="flex items-center space-x-2">
          <span className="text-zinc-400 font-bold">r.outers &gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            placeholder="Type /help, /skills, /model, or enter command..."
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-600 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => handleExecute()}
            disabled={!input.trim() || isProcessing}
            className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-900">
          <span>⚡ {modelLabel} · Auto · Ready</span>
          <span className="hidden sm:inline">UP/DOWN for history</span>
        </div>
      </div>
    </div>
  );
};
