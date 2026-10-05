import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { Github, Terminal, User, Play, Check, Server, Activity, Clock } from 'lucide-react';

interface DocContentProps {
  activeSection: string;
}

export const DocContent: React.FC<DocContentProps> = ({ activeSection }) => {
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
  const [testResponse, setTestResponse] = useState<{ [key: string]: any }>({});
  const [testTime, setTestTime] = useState<{ [key: string]: number }>({});

  const handleTestApi = async (path: string, method: string = 'GET', body?: any) => {
    setTestingEndpoint(path);
    const start = performance.now();
    try {
      const res = await fetch(path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json();
      const end = performance.now();
      setTestTime(prev => ({ ...prev, [path]: Math.round(end - start) }));
      setTestResponse(prev => ({ ...prev, [path]: data }));
    } catch (err: any) {
      setTestResponse(prev => ({ ...prev, [path]: { error: 'Failed to fetch API' } }));
    } finally {
      setTestingEndpoint(null);
    }
  };

  return (
    <article className="max-w-3xl space-y-10 py-6 text-zinc-300 text-sm leading-relaxed">

      {/* INTRODUCTION / HOME SECTION */}
      {activeSection === 'introduction' && (
        <section className="space-y-8">
          
          {/* 1. KATA PEMBUKA */}
          <div className="space-y-3 pb-6 border-b border-zinc-800/80">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>rts v1.0.0 · Termux & Mobile Vibe Coding Ready</span>
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              r.outers (rts)
            </h1>
            
            <p className="text-zinc-300 text-base leading-relaxed">
              Selamat datang di dokumentasi resmi <b>r.outers (rts)</b> — CLI tool ultra-ringan buat <b>vibe coding langsung di HP (Android / Termux)</b> dan Terminal Linux/PC. Mirip seperti <b>9routers</b>, rts adalah router tool cepat yang menghubungkan kamu ke berbagai model LLM tanpa bloatware rumit ala OpenCode.
            </p>

            <p className="text-zinc-400 text-xs leading-relaxed">
              Fokus utamanya simpel: ketik prompt di smartphone, route ke provider (80+ NVIDIA NIM, DeepSeek R1, Qwen 2.5 Coder, Custom endpoint), eksekusi shell command dengan kontrol penuh, dan langsung gas ngoding di mana aja dari HP.
            </p>
          </div>

          {/* 2. CARA PAKAI (HOW TO USE) */}
          <div className="space-y-4 pb-6 border-b border-zinc-800/80">
            <h2 className="text-lg font-semibold text-white tracking-tight flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span>Cara Pakai & Instalasi Cepat</span>
            </h2>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block mb-1">
                  1. Install via Terminal (Termux / Linux):
                </span>
                <CodeBlock
                  language="bash"
                  code="curl -fsSL https://raw.githubusercontent.com/myramm/r.outers/main/install.sh | bash"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-200 block mb-1">
                  2. Jalankan Program:
                </span>
                <CodeBlock
                  language="bash"
                  code="rts"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-200 block mb-1">
                  3. Contoh Perintah dalam CLI:
                </span>
                <CodeBlock
                  language="text"
                  filename="rts prompt"
                  code={`r.outers > /setup                         # Setup API Key & Provider
r.outers > /model nemotron               # Ganti model AI ke Nemotron 120B
r.outers > buatkan REST API anime        # AI langsung menulis kode & eksekusi shell`}
                />
              </div>
            </div>
          </div>

          {/* 3. YANG BIKIN SIAPA (AUTHOR & CREDITS) */}
          <div className="space-y-3 pt-2">
            <h2 className="text-lg font-semibold text-white tracking-tight flex items-center space-x-2">
              <User className="w-4 h-4 text-zinc-400" />
              <span>Developer & Pembuat</span>
            </h2>

            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-base">myramm (ラム)</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                      Indonesia 🇮🇩
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 block mt-0.5">
                    Full-Stack Polyglot, AI Agent Builder & System Engineer
                  </span>
                </div>

                <a
                  href="https://github.com/myramm"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors w-fit"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/myramm</span>
                </a>
              </div>

              <div className="pt-2 border-t border-zinc-800 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="flex items-center">
                  🌸 Inspired by <b className="text-zinc-200 ml-1">Akari Watanabe (渡辺 星)</b>
                </span>
                <span className="font-mono text-[11px] text-zinc-500">
                  MIT License © 2026 myramm
                </span>
              </div>
            </div>
          </div>

        </section>
      )}

      {/* REST API ENDPOINTS SECTION */}
      {activeSection === 'endpoints' && (
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">API Reference</span>
            <h1 className="text-2xl font-bold text-white tracking-tight">REST API Endpoints</h1>
            <p className="text-zinc-400">
              Dokumentasi endpoint serverless resmi untuk integrasi programatik, status agen, katalog model, dan eksekusi AI.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 font-mono text-xs text-zinc-300">
            <span className="text-zinc-500">BASE URL: </span>
            <span className="text-emerald-400">https://rts-docs-sigma.vercel.app</span>
          </div>

          {/* ENDPOINT 1: /api/status */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold">
                  GET
                </span>
                <span className="text-white font-semibold">/api/status</span>
              </div>

              <button
                onClick={() => handleTestApi('/api/status')}
                disabled={testingEndpoint === '/api/status'}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-sans flex items-center space-x-1.5 transition-colors w-fit"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{testingEndpoint === '/api/status' ? 'Fetching...' : 'Test Endpoint'}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Mengembalikan status kesehatan sistem, versi agen, provider aktif, dan default model.
            </p>

            <CodeBlock
              language="bash"
              filename="cURL"
              code="curl -s https://rts-docs-sigma.vercel.app/api/status"
            />

            {testResponse['/api/status'] && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Live Response</span>
                  <span>{testTime['/api/status']} ms</span>
                </div>
                <CodeBlock
                  language="json"
                  code={JSON.stringify(testResponse['/api/status'], null, 2)}
                />
              </div>
            )}
          </div>

          {/* ENDPOINT 2: /api/models */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold">
                  GET
                </span>
                <span className="text-white font-semibold">/api/models</span>
              </div>

              <button
                onClick={() => handleTestApi('/api/models')}
                disabled={testingEndpoint === '/api/models'}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-sans flex items-center space-x-1.5 transition-colors w-fit"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{testingEndpoint === '/api/models' ? 'Fetching...' : 'Test Endpoint'}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Mengembalikan seluruh daftar 80+ model NVIDIA NIM, context window, tag reasoning, dan latency.
            </p>

            <CodeBlock
              language="bash"
              filename="cURL"
              code="curl -s https://rts-docs-sigma.vercel.app/api/models"
            />

            {testResponse['/api/models'] && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Live Response</span>
                  <span>{testTime['/api/models']} ms</span>
                </div>
                <CodeBlock
                  language="json"
                  code={JSON.stringify(testResponse['/api/models'], null, 2)}
                />
              </div>
            )}
          </div>

          {/* ENDPOINT 3: /api/skills */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold">
                  GET
                </span>
                <span className="text-white font-semibold">/api/skills</span>
              </div>

              <button
                onClick={() => handleTestApi('/api/skills')}
                disabled={testingEndpoint === '/api/skills'}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-sans flex items-center space-x-1.5 transition-colors w-fit"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{testingEndpoint === '/api/skills' ? 'Fetching...' : 'Test Endpoint'}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Mengembalikan daftar modul skill aktif (Anti-Slop, Systematic Debugging, APKTool).
            </p>

            <CodeBlock
              language="bash"
              filename="cURL"
              code="curl -s https://rts-docs-sigma.vercel.app/api/skills"
            />

            {testResponse['/api/skills'] && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Live Response</span>
                  <span>{testTime['/api/skills']} ms</span>
                </div>
                <CodeBlock
                  language="json"
                  code={JSON.stringify(testResponse['/api/skills'], null, 2)}
                />
              </div>
            )}
          </div>

          {/* ENDPOINT 4: /api/terminal/execute */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60 font-bold">
                  POST
                </span>
                <span className="text-white font-semibold">/api/terminal/execute</span>
              </div>

              <button
                onClick={() => handleTestApi('/api/terminal/execute', 'POST', { input: '/skills' })}
                disabled={testingEndpoint === '/api/terminal/execute'}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-sans flex items-center space-x-1.5 transition-colors w-fit"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{testingEndpoint === '/api/terminal/execute' ? 'Executing...' : 'Test Execution'}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Menjalankan simulasi prompt, perintah slash, atau instruksi coding agen secara programatik.
            </p>

            <CodeBlock
              language="bash"
              filename="cURL (POST)"
              code={`curl -X POST https://rts-docs-sigma.vercel.app/api/terminal/execute \\
  -H "Content-Type: application/json" \\
  -d '{"input": "/skills", "currentModel": "nvidia/nemotron-3-super-120b-a12b"}'`}
            />

            {testResponse['/api/terminal/execute'] && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Live Response</span>
                  <span>{testTime['/api/terminal/execute']} ms</span>
                </div>
                <CodeBlock
                  language="json"
                  code={JSON.stringify(testResponse['/api/terminal/execute'], null, 2)}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* QUICKSTART SECTION */}
      {activeSection === 'quickstart' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Quickstart Installation</h1>
          <p className="text-zinc-400">
            Jalankan 1 baris perintah instalasi otomatis di bawah ini:
          </p>

          <CodeBlock
            language="bash"
            code="curl -fsSL https://raw.githubusercontent.com/myramm/r.outers/main/install.sh | bash"
          />

          <div className="pt-2 space-y-2">
            <h2 className="text-base font-semibold text-white">Instalasi Manual</h2>
            <CodeBlock
              language="bash"
              code={`git clone https://github.com/myramm/r.outers.git ~/r_outers
cd ~/r_outers
pip install requests rich
chmod +x main.py
ln -sf ~/r_outers/main.py /data/data/com.termux/files/usr/bin/rts 2>/dev/null || sudo ln -sf ~/r_outers/main.py /usr/local/bin/rts
rts`}
            />
          </div>
        </section>
      )}

      {/* MANUAL JSON CONFIGURATION */}
      {activeSection === 'json-config' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Setup Manual JSON</h1>
          <p className="text-zinc-400">
            Semua model, provider, custom OpenAI endpoint (Ollama, vLLM, DeepInfra), API key, dan timeout dapat diatur di <code className="text-zinc-200">~/.routers_config.json</code>.
          </p>

          <CodeBlock
            language="json"
            filename="~/.routers_config.json"
            code={`{
  "active_provider": "nvidia",
  "providers": {
    "nvidia": {
      "name": "NVIDIA NIM",
      "base_url": "https://integrate.api.nvidia.com/v1",
      "api_key": "nvapi-your-key-here",
      "model": "nvidia/nemotron-3-super-120b-a12b",
      "timeout": 180,
      "temperature": 0.2,
      "max_tokens": 8192
    },
    "atria": {
      "name": "Atria ASI",
      "base_url": "https://api.atria-asi.ai/v1",
      "api_key": "your-atria-key",
      "model": "Atria-Dawn-Preview",
      "timeout": 120
    },
    "custom_local": {
      "name": "Local Ollama / vLLM",
      "base_url": "http://localhost:11434/v1",
      "api_key": "ollama",
      "model": "qwen2.5-coder:32b",
      "timeout": 180
    }
  },
  "settings": {
    "history_file": "~/.routers_history",
    "skills_dir": "~/.agents/skills"
  }
}`}
          />

          <div className="pt-2">
            <h2 className="text-base font-semibold text-white mb-2">Perintah Edit</h2>
            <CodeBlock language="bash" code="nano ~/.routers_config.json" />
          </div>
        </section>
      )}

      {/* UNINSTALLATION */}
      {activeSection === 'uninstall' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Uninstallation</h1>
          <p className="text-zinc-400">
            Hapus instalasi r.outers dan symlink secara bersih:
          </p>
          <CodeBlock
            language="bash"
            code="curl -fsSL https://raw.githubusercontent.com/myramm/r.outers/main/uninstall.sh | bash"
          />
        </section>
      )}

      {/* TERMINAL STYLES (AGY STYLE) */}
      {activeSection === 'terminal-styles' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">UI & Customization</span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Terminal Styles & Themes (Agy Style)</h1>
            <p className="text-zinc-400">
              Kustomisasi tampilan prompt dan palette warna terminal ala <b>Antigravity (AGY)</b> untuk pengalaman vibe coding yang lebih estetik dan nyaman di layar smartphone / Termux.
            </p>
          </div>

          {/* Prompt Styles Showcase */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-white">1. Pilihan Format Prompt</h2>
            <div className="grid grid-cols-1 gap-3">
              
              <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs space-y-1">
                <div className="text-zinc-400 text-[11px] font-sans font-semibold">Agy Double-Line (Default Modern)</div>
                <div className="text-cyan-400 font-semibold">╭─ <span className="text-yellow-400">⚡</span> [rts:nemotron-3-super] · Termux · Auto</div>
                <div className="text-pink-400 font-semibold">╰─❯ <span className="text-zinc-300 font-normal">buatkan REST API anime</span></div>
              </div>

              <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs space-y-1">
                <div className="text-zinc-400 text-[11px] font-sans font-semibold">Cyber Box (Neon Terminal)</div>
                <div className="text-purple-400 font-semibold">┌── 🚀 [rts // nemotron] ── [Auto]</div>
                <div className="text-yellow-400 font-semibold">└── ❯ <span className="text-zinc-300 font-normal">buatkan REST API anime</span></div>
              </div>

              <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs space-y-1">
                <div className="text-zinc-400 text-[11px] font-sans font-semibold">Powerline Segments</div>
                <div className="text-purple-400 font-semibold">▰▰ <span className="text-cyan-400">rts</span> ▰ <span className="text-purple-300">nemotron</span> ▰ <span className="text-emerald-400">Auto</span> ▰</div>
                <div className="text-cyan-400 font-semibold">❯ <span className="text-zinc-300 font-normal">buatkan REST API anime</span></div>
              </div>

              <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs space-y-1">
                <div className="text-zinc-400 text-[11px] font-sans font-semibold">Minimal Compact (Single-Line)</div>
                <div className="text-cyan-400 font-semibold">rts<span className="text-zinc-500">(nemotron)</span> ❯ <span className="text-zinc-300 font-normal">buatkan REST API anime</span></div>
              </div>

              <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs space-y-1">
                <div className="text-zinc-400 text-[11px] font-sans font-semibold">Classic r.outers</div>
                <div className="text-cyan-400 font-semibold">r.outers &gt; <span className="text-zinc-300 font-normal">buatkan REST API anime</span></div>
                <div className="text-zinc-500 text-[11px]">⚡ Nemotron 3 Super 120B · Auto · Ready</div>
              </div>

            </div>
          </div>

          {/* Color Schemes 2-Column Split Preview */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-semibold text-white">2. Color Schemes & Live Code Diff Preview</h2>
            <p className="text-zinc-400 text-xs">
              Mendukung menu interaktif 2-kolom dengan live syntax highlighting dan diff preview kode secara instan:
            </p>

            <CodeBlock
              language="text"
              filename="CLI /theme Interactive Selector"
              code={`color scheme Color Scheme                   _─────────────────────────────────────────────────────
  > terminal (current)           │ > you: add a greeting function
    light                        │
    solarized light              │   Here's the change:
    colorblind-friendly light    │
    dark                         │  3   import "fmt"
    solarized dark               │  4
    colorblind-friendly dark     │  5 - func main() {
    tokyo night                  │  5 + func greet(name string) {
    cyberpunk                    │  6 +     fmt.Println("Hello, " + name)
    matrix                       │  7 + }`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2">
              <div className="p-2.5 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-cyan-400">terminal (current)</span>
                <span className="text-zinc-500">Default ANSI</span>
              </div>
              <div className="p-2.5 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-blue-400">light</span>
                <span className="text-zinc-500">Clean Light</span>
              </div>
              <div className="p-2.5 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-amber-400">solarized light</span>
                <span className="text-zinc-500">Warm Solarized</span>
              </div>
              <div className="p-2.5 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-blue-400">colorblind-friendly light</span>
                <span className="text-zinc-500">High Contrast</span>
              </div>
              <div className="p-2.5 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-white">dark</span>
                <span className="text-zinc-500">High Contrast Dark</span>
              </div>
              <div className="p-2.5 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-cyan-400">solarized dark</span>
                <span className="text-zinc-500">Deep Solarized</span>
              </div>
              <div className="p-2.5 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-sky-400">colorblind-friendly dark</span>
                <span className="text-zinc-500">Accessible Dark</span>
              </div>
              <div className="p-2.5 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-purple-400">tokyo night</span>
                <span className="text-zinc-500">Cyan & Violet</span>
              </div>
            </div>
          </div>

          {/* How to Change */}
          <div className="space-y-2 pt-2">
            <h2 className="text-base font-semibold text-white">3. Cara Mengubah Color Scheme & Style</h2>
            <p className="text-zinc-400 text-xs">
              Ketik perintah <code className="text-zinc-200">/theme</code> atau <code className="text-zinc-200">/style</code> di CLI untuk membuka wizard selector 2-kolom dengan live diff preview:
            </p>
            <CodeBlock
              language="bash"
              code="rts > /theme"
            />
          </div>
        </section>
      )}

      {/* DOUBLE-LINE PROMPT */}
      {activeSection === 'double-line' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Double-Line Prompt Layout</h1>
          <p className="text-zinc-400">
            r.outers membagi input dan status bar menjadi 2 baris bersih:
          </p>

          <CodeBlock
            language="text"
            filename="Terminal Prompt"
            code={`r.outers > [Ketik prompt atau perintah di sini]
⚡ Nemotron 3 Super 120B  ·  Auto  ·  Ready`}
          />
        </section>
      )}

      {/* ARROW HISTORY */}
      {activeSection === 'history' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Navigasi Riwayat Panah UP / DOWN</h1>
          <p className="text-zinc-400">
            Semua input tersimpan di <code className="text-zinc-200">~/.routers_history</code>.
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            <li><kbd className="px-1 py-0.5 rounded bg-zinc-800 text-xs text-zinc-300">UP</kbd>: Menyimpan ketikan aktif dan memuat prompt sebelumnya.</li>
            <li><kbd className="px-1 py-0.5 rounded bg-zinc-800 text-xs text-zinc-300">DOWN</kbd>: Berpindah ke input yang lebih baru dan mengembalikan draf awal.</li>
          </ul>
        </section>
      )}

      {/* AUTONOMOUS TOOLS */}
      {activeSection === 'tool-execution' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Autonomous Tools & Shell Execution</h1>
          <p className="text-zinc-400">
            Log eksekusi tool berstandar jelas dengan streaming output langsung:
          </p>

          <div className="space-y-2 text-xs font-mono bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-zinc-300">
            <div>READ     → RTS &gt; Reading &#123;file&#125; (120 lines)</div>
            <div>WRITE    → RTS &gt; Writing &#123;file&#125; (45 lines)</div>
            <div>EDIT     → RTS &gt; Editing &#123;file&#125; (lines 10-25)</div>
            <div>SHELL    → ⚡ RTS &gt; Running &#123;command&#125; (live stdout/stderr)</div>
            <div>CONFIRM  → RTS &gt; Modal pilihan panah keyboard (UP/DOWN/ENTER)</div>
          </div>
        </section>
      )}

      {/* MODELS GUIDE */}
      {activeSection === 'models-guide' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">NVIDIA NIM & Providers</h1>
          <p className="text-zinc-400">
            Ganti model instan dengan <code className="text-zinc-200">/model &lt;name&gt;</code>:
          </p>

          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 text-xs">
            <table className="w-full text-left">
              <thead className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 text-[11px] uppercase">
                <tr>
                  <th className="p-2.5">Model</th>
                  <th className="p-2.5">Context</th>
                  <th className="p-2.5">Speed</th>
                  <th className="p-2.5">Kategori</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300 font-mono">
                <tr>
                  <td className="p-2.5 font-semibold text-white">nemotron-3-super-120b</td>
                  <td className="p-2.5">128k</td>
                  <td className="p-2.5 text-emerald-400">&lt;1.2s</td>
                  <td className="p-2.5 font-sans">Flagship Coding & Tools</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">gpt-oss-20b</td>
                  <td className="p-2.5">32k</td>
                  <td className="p-2.5 text-emerald-400">&lt;400ms</td>
                  <td className="p-2.5 font-sans">Zero-lag Termux</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">deepseek-r1</td>
                  <td className="p-2.5">64k</td>
                  <td className="p-2.5 text-amber-400">Thinking</td>
                  <td className="p-2.5 font-sans">Deep Reasoning</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">qwen2.5-coder-32b</td>
                  <td className="p-2.5">32k</td>
                  <td className="p-2.5 text-emerald-400">Fast</td>
                  <td className="p-2.5 font-sans">Coding & Diffs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SKILLS GUIDE */}
      {activeSection === 'skills-guide' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Anti-Slop & Skill Ecosystem</h1>
          <p className="text-zinc-400">
            Skills tersimpan di <code className="text-zinc-200">~/.agents/skills/&lt;skill-name&gt;/SKILL.md</code>.
          </p>

          <CodeBlock
            language="bash"
            code="r.outers > /add-skill https://github.com/miqdadbadjuber/anti-slop"
          />
        </section>
      )}

      {/* SLASH COMMANDS */}
      {activeSection === 'commands-ref' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Slash Commands Reference</h1>
          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 text-xs">
            <table className="w-full text-left">
              <thead className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 text-[11px] uppercase">
                <tr>
                  <th className="p-2.5">Command</th>
                  <th className="p-2.5">Usage</th>
                  <th className="p-2.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300 font-mono">
                <tr>
                  <td className="p-2.5 font-bold text-white">/setup</td>
                  <td className="p-2.5 text-zinc-400">/setup</td>
                  <td className="p-2.5 font-sans">Wizard pengaturan API Key</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/style</td>
                  <td className="p-2.5 text-zinc-400">/style [or /theme]</td>
                  <td className="p-2.5 font-sans">Ubah style terminal prompt & palette warna (Agy style)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/model</td>
                  <td className="p-2.5 text-zinc-400">/model [id]</td>
                  <td className="p-2.5 font-sans">Ganti model AI</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/provider</td>
                  <td className="p-2.5 text-zinc-400">/provider [name]</td>
                  <td className="p-2.5 font-sans">Ganti provider API</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/skills</td>
                  <td className="p-2.5 text-zinc-400">/skills</td>
                  <td className="p-2.5 font-sans">Daftar skill aktif</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/memory</td>
                  <td className="p-2.5 text-zinc-400">/memory</td>
                  <td className="p-2.5 font-sans">Lihat token memori</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/clear</td>
                  <td className="p-2.5 text-zinc-400">/clear</td>
                  <td className="p-2.5 font-sans">Reset konteks chat</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/exit</td>
                  <td className="p-2.5 text-zinc-400">/exit</td>
                  <td className="p-2.5 font-sans">Simpan riwayat & keluar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

    </article>
  );
};
