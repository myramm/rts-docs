import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, RefreshCw, Palette, Layout } from 'lucide-react';

interface TerminalMessage {
  id: string;
  type: 'input' | 'output';
  content: string;
  style?: string;
  topLine?: string;
  isColorSchemeModal?: boolean;
}

export const TerminalSimulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [draftInput, setDraftInput] = useState('');
  const [currentModel, setCurrentModel] = useState('nvidia/nemotron-3-super-120b-a12b');
  const [promptStyle, setPromptStyle] = useState<'agy' | 'cyber' | 'powerline' | 'minimal' | 'classic'>('agy');
  const [theme, setTheme] = useState<string>('terminal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: 'welcome',
      type: 'output',
      content: `r.outers (rts) v1.0.0 — Fast Mobile & Terminal Vibe Coding Tool (Termux Ready)
Engine: NVIDIA NIM | Active Model: nvidia/nemotron-3-super-120b-a12b
Style: Agy Double-Line | Color Scheme: terminal (current)
Type /theme, /style, /help, or enter prompt to test.`
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const colorSchemes = [
    { id: 'terminal', name: 'terminal' },
    { id: 'light', name: 'light' },
    { id: 'solarized_light', name: 'solarized light' },
    { id: 'colorblind_light', name: 'colorblind-friendly light' },
    { id: 'dark', name: 'dark' },
    { id: 'solarized_dark', name: 'solarized dark' },
    { id: 'colorblind_dark', name: 'colorblind-friendly dark' },
    { id: 'tokyonight', name: 'tokyo night' },
    { id: 'cyberpunk', name: 'cyberpunk' },
    { id: 'matrix', name: 'matrix' }
  ];

  const handleExecute = async (cmdText?: string) => {
    const cmd = (cmdText !== undefined ? cmdText : input).trim();
    if (!cmd || isProcessing) return;

    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');

    const shortMod = currentModel.replace('nvidia/', '').split('-')[0];
    let topL = '';
    if (promptStyle === 'agy') {
      topL = `╭─ ⚡ [rts:${shortMod}] · Termux · Auto`;
    } else if (promptStyle === 'cyber') {
      topL = `┌── 🚀 [rts // ${shortMod}] ── [Auto]`;
    } else if (promptStyle === 'powerline') {
      topL = `▰▰ rts ▰ ${shortMod} ▰ Auto ▰`;
    }

    setMessages(prev => [
      ...prev,
      { id: Math.random().toString(), type: 'input', content: cmd, style: promptStyle, topLine: topL }
    ]);
    setIsProcessing(true);

    setTimeout(() => {
      let output = '';
      let isModal = false;

      if (cmd === '/help') {
        output = `/setup         Pusat konfigurasi API & provider\n/theme         Buka selector 2-column Color Scheme dengan Live Code Diff Preview\n/style         Ganti style prompt (Agy, Cyber, Powerline, Minimal, Classic)\n/model         Ganti model AI aktif\n/skills        Lihat daftar skill aktif\n/memory        Lihat penggunaan token\n/clear         Bersihkan layar & riwayat`;
      } else if (cmd === '/theme' || cmd === '/color-scheme' || cmd === '/color') {
        isModal = true;
        output = `color scheme Color Scheme                   _─────────────────────────────────────────────────────
  > terminal (current)           │ > you: add a greeting function
    light                        │
    solarized light              │   Here's the change:
    colorblind-friendly light    │
    dark                         │  3   import "fmt"
    solarized dark               │  4
    colorblind-friendly dark     │  5 - func main() {
    tokyo night                  │  5 + func greet(name string) {
    cyberpunk                    │  6 +     fmt.Println("Hello, " + name)
    matrix                       │  7 + }

  ↑↓ Navigate  •  Enter Select & Apply  •  Esc Exit`;
      } else if (cmd.startsWith('/theme ') || cmd.startsWith('/color-scheme ')) {
        const target = cmd.replace('/theme', '').replace('/color-scheme', '').trim().toLowerCase();
        const found = colorSchemes.find(c => c.id === target || c.name.toLowerCase() === target);
        if (found) {
          setTheme(found.id);
          output = `✔ Applied color scheme: ${found.name}`;
        } else {
          output = `Unknown color scheme. Available: ${colorSchemes.map(c => c.name).join(', ')}`;
        }
      } else if (cmd === '/style' || cmd.startsWith('/style ')) {
        const target = cmd.replace('/style', '').trim().toLowerCase();
        if (['agy', 'cyber', 'powerline', 'minimal', 'classic'].includes(target)) {
          setPromptStyle(target as any);
          output = `✔ Switched prompt style to: ${target.toUpperCase()}`;
        } else {
          output = `Pilihan Style Prompt:\n • /style agy        (Agy Double-Line Futuristic)\n • /style cyber      (Cyber Box Neon)\n • /style powerline  (Powerline Segments)\n • /style minimal    (Minimalist Single-Line)\n • /style classic    (Classic r.outers)\n\nTip: Bisa juga pilih langsung lewat toolbar tombol di atas.`;
        }
      } else if (cmd.startsWith('/model')) {
        const mod = cmd.replace('/model', '').trim() || 'nvidia/nemotron-3-super-120b-a12b';
        setCurrentModel(mod);
        output = `✔ Switched active model to: ${mod}`;
      } else if (cmd === '/skills') {
        output = `Active skills:\n • anti-slop (DURING mode)\n • systematic-debugging\n • apktool-modding`;
      } else if (cmd === '/memory') {
        output = `Context: 128k tokens | History turns: 3 | Active buffer: 2.1k tokens`;
      } else if (cmd === '/clear') {
        setMessages([]);
        setIsProcessing(false);
        return;
      } else {
        output = `RTS > Writing main.go (18 lines)\n⚡ RTS > Running go run main.go\n✔ RTS > Hello, developer! Task completed successfully.`;
      }

      setMessages(prev => [...prev, { id: Math.random().toString(), type: 'output', content: output, isColorSchemeModal: isModal }]);
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

  const shortMod = currentModel.replace('nvidia/', '').split('-')[0];

  // Colors based on selected color scheme
  const getThemeColors = () => {
    switch (theme) {
      case 'light':
        return { primary: 'text-blue-400', secondary: 'text-cyan-400', accent: 'text-zinc-300' };
      case 'solarized_light':
        return { primary: 'text-amber-400', secondary: 'text-emerald-400', accent: 'text-cyan-300' };
      case 'colorblind_light':
        return { primary: 'text-blue-400', secondary: 'text-amber-400', accent: 'text-yellow-400' };
      case 'dark':
        return { primary: 'text-white', secondary: 'text-zinc-300', accent: 'text-emerald-400' };
      case 'solarized_dark':
        return { primary: 'text-cyan-400', secondary: 'text-emerald-400', accent: 'text-amber-300' };
      case 'colorblind_dark':
        return { primary: 'text-sky-400', secondary: 'text-amber-400', accent: 'text-cyan-300' };
      case 'tokyonight':
        return { primary: 'text-cyan-400', secondary: 'text-pink-400', accent: 'text-purple-400' };
      case 'cyberpunk':
        return { primary: 'text-pink-400', secondary: 'text-yellow-400', accent: 'text-cyan-400' };
      case 'matrix':
        return { primary: 'text-emerald-400', secondary: 'text-emerald-300', accent: 'text-emerald-500' };
      default: // terminal
        return { primary: 'text-cyan-400', secondary: 'text-emerald-400', accent: 'text-blue-400' };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="max-w-4xl mx-auto my-4 rounded-xl border border-zinc-800 bg-black font-mono text-xs overflow-hidden shadow-2xl">
      
      {/* Header with Style & Color Scheme Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-950 text-zinc-400">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-semibold text-white">rts terminal</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            v1.0.0
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center space-x-2 text-[11px]">
          
          {/* Style Selector */}
          <div className="flex items-center space-x-1 bg-zinc-900 p-0.5 rounded border border-zinc-800">
            <Layout className="w-3 h-3 text-zinc-400 ml-1" />
            <select
              value={promptStyle}
              onChange={e => setPromptStyle(e.target.value as any)}
              className="bg-transparent text-zinc-300 text-[11px] focus:outline-none cursor-pointer pr-1"
            >
              <option value="agy" className="bg-zinc-900 text-white">Agy Double-Line</option>
              <option value="cyber" className="bg-zinc-900 text-white">Cyber Box</option>
              <option value="powerline" className="bg-zinc-900 text-white">Powerline</option>
              <option value="minimal" className="bg-zinc-900 text-white">Minimal</option>
              <option value="classic" className="bg-zinc-900 text-white">Classic r.outers</option>
            </select>
          </div>

          {/* Color Scheme Selector */}
          <div className="flex items-center space-x-1 bg-zinc-900 p-0.5 rounded border border-zinc-800">
            <Palette className="w-3 h-3 text-zinc-400 ml-1" />
            <select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              className="bg-transparent text-zinc-300 text-[11px] focus:outline-none cursor-pointer pr-1"
            >
              {colorSchemes.map(cs => (
                <option key={cs.id} value={cs.id} className="bg-zinc-900 text-white">
                  {cs.name} {cs.id === 'terminal' ? '(current)' : ''}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setMessages([])}
            className="p-1 hover:text-white rounded hover:bg-zinc-900 transition-colors"
            title="Clear screen"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="p-4 space-y-3 min-h-[320px] max-h-[480px] overflow-y-auto cursor-text text-zinc-200 leading-relaxed"
      >
        {messages.map(msg => (
          <div key={msg.id} className="space-y-0.5">
            {msg.type === 'input' ? (
              <div className="space-y-0.5">
                {msg.topLine && (
                  <div className={`${colors.primary} font-medium`}>{msg.topLine}</div>
                )}
                <div className="text-zinc-100 flex items-start space-x-1.5">
                  <span className={`${colors.secondary} font-bold`}>
                    {msg.style === 'agy' ? '╰─❯' : msg.style === 'cyber' ? '└── ❯' : msg.style === 'minimal' ? '❯' : 'r.outers >'}
                  </span>
                  <span>{msg.content}</span>
                </div>
              </div>
            ) : msg.isColorSchemeModal ? (
              <div className="p-3 my-2 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs overflow-x-auto text-zinc-300">
                <pre className="text-zinc-300 whitespace-pre">{msg.content}</pre>
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
            ⚡ r.outers is executing...
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Area Dynamic Render */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-950/90 space-y-2">
        
        {/* Top line if Agy / Cyber / Powerline */}
        {promptStyle === 'agy' && (
          <div className={`text-xs ${colors.primary} font-medium`}>
            ╭─ <span className="text-yellow-400">⚡</span> [rts:{shortMod}] <span className="text-zinc-500">·</span> <span className={colors.accent}>Termux</span> <span className="text-zinc-500">·</span> <span className="text-emerald-400">Auto</span>
          </div>
        )}

        {promptStyle === 'cyber' && (
          <div className={`text-xs ${colors.primary} font-medium`}>
            ┌── 🚀 [{colors.secondary}rts <span className="text-zinc-600">//</span> {shortMod}] ── [<span className="text-emerald-400">Auto</span>]
          </div>
        )}

        {promptStyle === 'powerline' && (
          <div className={`text-xs ${colors.secondary} font-medium`}>
            ▰▰ <span className={colors.primary}>rts</span> ▰ <span>{shortMod}</span> ▰ <span className="text-emerald-400">Auto</span> ▰
          </div>
        )}

        {/* Input prompt line */}
        <div className="flex items-center space-x-2">
          {promptStyle === 'agy' && (
            <span className={`${colors.secondary} font-bold`}>╰─❯</span>
          )}
          {promptStyle === 'cyber' && (
            <span className={`${colors.secondary} font-bold`}>└── ❯</span>
          )}
          {promptStyle === 'powerline' && (
            <span className={`${colors.primary} font-bold`}>❯</span>
          )}
          {promptStyle === 'minimal' && (
            <span className={`${colors.primary} font-bold`}>
              rts<span className="text-zinc-500">({shortMod})</span> ❯
            </span>
          )}
          {promptStyle === 'classic' && (
            <span className={`${colors.primary} font-bold`}>r.outers &gt;</span>
          )}

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            placeholder="Ketik /theme untuk Color Scheme selector, atau prompt apa saja..."
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-600 focus:outline-none text-xs"
            autoFocus
          />

          <button
            onClick={() => handleExecute()}
            disabled={!input.trim() || isProcessing}
            className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {promptStyle === 'classic' && (
          <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-900">
            <span>⚡ {shortMod} · Auto · Ready</span>
            <span className="hidden sm:inline">UP/DOWN history</span>
          </div>
        )}
      </div>

    </div>
  );
};
