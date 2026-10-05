import React from 'react';
import { Terminal, Zap, Shield, Cpu, Layers, BookOpen, Trash2, Sparkles, CheckCircle, ArrowRight, Code2 } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface DocContentProps {
  activeSection: string;
  onNavigateTab: (tab: string) => void;
}

export const DocContent: React.FC<DocContentProps> = ({ activeSection, onNavigateTab }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-2">

      {/* QUICKSTART SECTION */}
      {activeSection === 'quickstart' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-cyan uppercase font-bold tracking-wider">Installation Guide</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">1-Line Quickstart Installation</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Install and configure <code className="text-cyber-cyan font-mono font-bold">r.outers (rts)</code> on your Android Termux device or Linux VPS in a single command.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-cyber-card to-[#12192c] border border-cyber-cyan/30">
            <h3 className="text-sm font-bold text-cyber-cyan flex items-center">
              <Zap className="w-4 h-4 mr-2" /> One-Line Installation (Curl)
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Automatically clones the repository, installs required dependencies, creates alias symlinks, and launches setup:
            </p>
            <CodeBlock
              language="bash"
              code="curl -sL https://raw.githubusercontent.com/myramm/r.outers/main/install.sh | bash"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Manual Installation</h2>
            <CodeBlock
              language="bash"
              filename="Terminal"
              code={`# 1. Clone repository
git clone https://github.com/myramm/r.outers.git ~/r_outers

# 2. Navigate and set executable permissions
cd ~/r_outers && chmod +x rts

# 3. Create global symlink
ln -sf ~/r_outers/rts $PREFIX/bin/rts 2>/dev/null || sudo ln -sf ~/r_outers/rts /usr/local/bin/rts

# 4. Launch r.outers
rts`}
            />
          </div>
        </section>
      )}

      {/* MANUAL JSON CONFIGURATION SECTION */}
      {activeSection === 'json-config' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-green uppercase font-bold tracking-wider">Manual Configuration</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Setup Manual via JSON File</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Semua model, provider, custom endpoint, API key, dan timeout dapat diatur secara manual melalui file <code className="text-cyber-cyan font-mono font-bold">~/.routers_config.json</code>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center">
              <Code2 className="w-4 h-4 mr-2 text-cyber-green" /> Format Lengkap ~/.routers_config.json
            </h2>
            <p className="text-xs text-gray-400">
              Kamu bisa membuat atau mengedit file ini langsung menggunakan <code className="text-gray-200 font-mono">nano ~/.routers_config.json</code>:
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
    "clouvia": {
      "name": "Clouvia Router",
      "base_url": "https://router.clouvia.id/v1",
      "api_key": "your-clouvia-key",
      "model": "free-model",
      "timeout": 120
    },
    "atria": {
      "name": "Atria ASI",
      "base_url": "https://api.atria-asi.ai/v1",
      "api_key": "your-atria-key",
      "model": "Atria-Dawn-Preview",
      "timeout": 120
    },
    "custom_openai": {
      "name": "Custom Endpoint / Ollama / Local",
      "base_url": "http://localhost:11434/v1",
      "api_key": "ollama",
      "model": "qwen2.5-coder:32b",
      "timeout": 180
    }
  },
  "settings": {
    "theme": "tokyonight",
    "prompt_style": "double_line",
    "history_file": "~/.routers_history",
    "skills_dir": "~/.agents/skills"
  }
}`}
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">Penjelasan Parameter JSON:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-cyber-card border border-cyber-border">
                <span className="font-mono text-cyber-yellow font-bold">active_provider</span>
                <p className="text-gray-400 mt-1">ID provider yang sedang aktif digunakan (<code className="text-gray-200">"nvidia"</code>, <code className="text-gray-200">"clouvia"</code>, <code className="text-gray-200">"atria"</code>, dsb).</p>
              </div>
              <div className="p-3 rounded-xl bg-cyber-card border border-cyber-border">
                <span className="font-mono text-cyber-cyan font-bold">base_url</span>
                <p className="text-gray-400 mt-1">Endpoint API kompatibel OpenAI (bisa lokal Ollama, vLLM, DeepInfra, SambaNova, dsb).</p>
              </div>
              <div className="p-3 rounded-xl bg-cyber-card border border-cyber-border">
                <span className="font-mono text-cyber-pink font-bold">model</span>
                <p className="text-gray-400 mt-1">ID model target (contoh: <code className="text-gray-200">nvidia/nemotron-3-super-120b-a12b</code>).</p>
              </div>
              <div className="p-3 rounded-xl bg-cyber-card border border-cyber-border">
                <span className="font-mono text-cyber-green font-bold">timeout</span>
                <p className="text-gray-400 mt-1">Durasi batas waktu request dalam detik (default 180 detik untuk model reasoning).</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ANDROID TERMUX SETUP */}
      {activeSection === 'termux-setup' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-pink uppercase font-bold tracking-wider">Mobile Environment</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Android Termux Configuration</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              r.outers is engineered specifically for Android Termux with zero memory overhead, sub-second latency, and touch/keyboard optimized raw terminal controls.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">Prerequisites on Termux</h2>
            <CodeBlock
              language="bash"
              code={`pkg update -y && pkg install -y python git curl\ntermux-setup-storage`}
            />
          </div>
        </section>
      )}

      {/* UNINSTALLATION SECTION */}
      {activeSection === 'uninstall' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-red-400 uppercase font-bold tracking-wider">Maintenance</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Uninstallation & Cleanup</h1>
          </div>

          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
            <h3 className="text-sm font-bold text-red-400 flex items-center">
              <Trash2 className="w-4 h-4 mr-2" /> 1-Line Uninstall Script
            </h3>
            <CodeBlock
              language="bash"
              code="curl -sL https://raw.githubusercontent.com/myramm/r.outers/main/uninstall.sh | bash"
            />
          </div>
        </section>
      )}

      {/* ARCHITECTURE & DOUBLE-LINE PROMPT */}
      {activeSection === 'architecture' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-yellow uppercase font-bold tracking-wider">Terminal UI</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Double-Line Prompt & TUI Loop</h1>
          </div>

          <div className="p-5 rounded-2xl bg-[#090d16] border border-cyber-border font-mono text-xs md:text-sm space-y-2 text-gray-200">
            <div className="text-cyber-pink font-bold flex items-center space-x-2">
              <span>r.outers &gt;</span>
              <span className="text-gray-300 font-normal">buatkan script crawler anime</span>
            </div>
            <div className="text-gray-500 text-xs border-t border-cyber-border/60 pt-1.5 flex items-center space-x-2">
              <span className="text-cyber-yellow font-semibold">⚡ Nemotron 3 Super 120B</span>
              <span>·</span>
              <span className="text-cyber-cyan">Auto Tool Calling</span>
              <span>·</span>
              <span className="text-cyber-green">Ready</span>
            </div>
          </div>
        </section>
      )}

      {/* HISTORY NAVIGATION */}
      {activeSection === 'history-navigation' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-cyan uppercase font-bold tracking-wider">Keyboard Navigation</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Arrow Key History Cycling</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Navigate past prompts with <kbd className="px-1.5 py-0.5 rounded bg-cyber-card border border-cyber-border font-mono text-xs">UP</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-cyber-card border border-cyber-border font-mono text-xs">DOWN</kbd> arrow keys without losing your current typed draft.
            </p>
          </div>
        </section>
      )}

      {/* AUTONOMOUS TOOLS SECTION */}
      {activeSection === 'tools' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-green uppercase font-bold tracking-wider">Tool Execution Engine</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Autonomous Tool Calling Pipeline</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyber-cyan">READ & WRITE</span>
              <p className="text-xs text-gray-400">
                <code className="text-gray-200 font-mono">RTS &gt; Reading &#123;file&#125;</code><br/>
                <code className="text-gray-200 font-mono">RTS &gt; Writing &#123;file&#125;</code>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyber-yellow">SHELL EXECUTION</span>
              <p className="text-xs text-gray-400">
                <code className="text-gray-200 font-mono">⚡ RTS &gt; Running &#123;command&#125;</code>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* NVIDIA NIM & MODELS */}
      {activeSection === 'nvidia-nim' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-yellow uppercase font-bold tracking-wider">AI Infrastructure</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">NVIDIA NIM 80+ Model Router</h1>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('models')}
              className="px-4 py-2 rounded-xl bg-cyber-yellow text-black text-xs font-bold flex items-center space-x-2"
            >
              <span>Explore All 80+ Models Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* REASONING ENGINE */}
      {activeSection === 'reasoning-engine' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-purple uppercase font-bold tracking-wider">Chain of Thought</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Deep Reasoning Token Engine</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              r.outers natively parses <code className="text-cyber-purple font-mono">reasoning_content</code> from models like DeepSeek-R1 and GLM-5.3 with extended 180s HTTP timeout buffers.
            </p>
          </div>
        </section>
      )}

      {/* SKILLS SECTION */}
      {activeSection === 'skills' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-purple uppercase font-bold tracking-wider">Dynamic Plugins</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Anti-Slop & Prompt Skills</h1>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('skills')}
              className="px-4 py-2 rounded-xl bg-cyber-purple text-white text-xs font-bold flex items-center space-x-2"
            >
              <span>View Full Skill Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* SLASH COMMANDS */}
      {activeSection === 'commands' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyber-yellow uppercase font-bold tracking-wider">Reference</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Slash Commands Cheatsheet</h1>
          </div>

          <div className="overflow-x-auto rounded-xl border border-cyber-border bg-cyber-card">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#090d16] text-gray-400 border-b border-cyber-border uppercase text-[10px]">
                <tr>
                  <th className="p-3">Command</th>
                  <th className="p-3">Usage</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border/50 text-gray-300">
                <tr>
                  <td className="p-3 font-bold text-cyber-yellow">/setup</td>
                  <td className="p-3 text-gray-400">/setup</td>
                  <td className="p-3 font-sans">Configure API keys & provider routing</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-cyber-cyan">/model</td>
                  <td className="p-3 text-gray-400">/model [id]</td>
                  <td className="p-3 font-sans">Switch or search active LLM model</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-cyber-pink">/provider</td>
                  <td className="p-3 text-gray-400">/provider [id]</td>
                  <td className="p-3 font-sans">Switch AI provider backend</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-cyber-purple">/skills</td>
                  <td className="p-3 text-gray-400">/skills</td>
                  <td className="p-3 font-sans">List active dynamic skills</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-cyber-green">/add-skill</td>
                  <td className="p-3 text-gray-400">/add-skill &lt;url&gt;</td>
                  <td className="p-3 font-sans">Install skill from Git repo</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-300">/memory</td>
                  <td className="p-3 text-gray-400">/memory</td>
                  <td className="p-3 font-sans">View active context tokens & turns</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-red-400">/clear</td>
                  <td className="p-3 text-gray-400">/clear</td>
                  <td className="p-3 font-sans">Reset conversation context window</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-400">/exit</td>
                  <td className="p-3 text-gray-400">/exit</td>
                  <td className="p-3 font-sans">Save history and exit CLI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQ & TROUBLESHOOTING */}
      {activeSection === 'faq' && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-gray-400 uppercase font-bold tracking-wider">Support</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Troubleshooting & FAQs</h1>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border space-y-1.5">
              <h3 className="text-sm font-bold text-white">Q: Cursor or terminal display looks strange after exit?</h3>
              <p className="text-xs text-gray-400">
                Run <code className="text-cyber-cyan font-mono">stty sane</code> or <code className="text-cyber-cyan font-mono">reset</code> in your terminal.
              </p>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
