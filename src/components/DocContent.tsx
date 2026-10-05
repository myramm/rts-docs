import React from 'react';
import { CodeBlock } from './CodeBlock';

interface DocContentProps {
  activeSection: string;
}

export const DocContent: React.FC<DocContentProps> = ({ activeSection }) => {
  return (
    <article className="max-w-3xl space-y-10 py-6 text-zinc-300 text-sm leading-relaxed">

      {/* INTRODUCTION */}
      {activeSection === 'introduction' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">r.outers (rts)</h1>
          <p className="text-zinc-400">
            Autonomous AI coding assistant designed specifically for <b>Android Termux</b> and <b>Linux</b>. Features sub-second latency tool execution, 80+ NVIDIA NIM models, anti-slop dynamic filtering, and interactive TUI prompts.
          </p>

          <div className="pt-2">
            <h2 className="text-base font-semibold text-white mb-2">Core Specifications</h2>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li>Runtime: Python 3.10+ (Native Termux & Linux, zero heavy dependencies)</li>
              <li>Engine: NVIDIA NIM (Nemotron 3 Super, DeepSeek R1, Qwen 2.5), Clouvia, Atria, Custom OpenAI</li>
              <li>TUI: Raw Terminal Mode with persistent UP/DOWN arrow history and 2-line layout</li>
              <li>Config: Fully centralized in <code className="text-zinc-200">~/.routers_config.json</code></li>
            </ul>
          </div>
        </section>
      )}

      {/* QUICKSTART */}
      {activeSection === 'quickstart' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Quickstart Installation</h1>
          <p className="text-zinc-400">
            Run the 1-line installation script in your Termux or Linux terminal:
          </p>

          <CodeBlock
            language="bash"
            code="curl -fsSL https://raw.githubusercontent.com/myramm/r.outers/main/install.sh | bash"
          />

          <div className="pt-2 space-y-2">
            <h2 className="text-base font-semibold text-white">Manual Setup</h2>
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Manual JSON Configuration</h1>
          <p className="text-zinc-400">
            All models, providers, custom OpenAI-compatible endpoints (Ollama, vLLM, DeepInfra), API keys, and timeouts are configured in <code className="text-zinc-200">~/.routers_config.json</code>.
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
            <h2 className="text-base font-semibold text-white mb-2">Edit Command</h2>
            <CodeBlock language="bash" code="nano ~/.routers_config.json" />
          </div>
        </section>
      )}

      {/* UNINSTALLATION */}
      {activeSection === 'uninstall' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Uninstallation</h1>
          <p className="text-zinc-400">
            To cleanly remove r.outers, symlinks, and configuration:
          </p>
          <CodeBlock
            language="bash"
            code="curl -fsSL https://raw.githubusercontent.com/myramm/r.outers/main/uninstall.sh | bash"
          />
        </section>
      )}

      {/* DOUBLE-LINE PROMPT */}
      {activeSection === 'double-line' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Double-Line Prompt Layout</h1>
          <p className="text-zinc-400">
            r.outers separates the user input and system telemetry into two distinct lines:
          </p>

          <CodeBlock
            language="text"
            filename="Terminal Prompt"
            code={`r.outers > [Your input / prompt here]
⚡ Nemotron 3 Super 120B  ·  Auto  ·  Ready`}
          />

          <ul className="list-disc list-inside space-y-1 text-zinc-400 pt-2">
            <li><b>Line 1:</b> Active input area with multi-line editing and history cycling.</li>
            <li><b>Line 2:</b> Formatted model name, tool status, and execution state.</li>
          </ul>
        </section>
      )}

      {/* ARROW HISTORY */}
      {activeSection === 'history' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Arrow History Cycling</h1>
          <p className="text-zinc-400">
            Previous commands and conversation prompts are stored in <code className="text-zinc-200">~/.routers_history</code>.
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            <li><kbd className="px-1 py-0.5 rounded bg-zinc-800 text-xs text-zinc-300">UP</kbd>: Stashes current input and loads previous prompt.</li>
            <li><kbd className="px-1 py-0.5 rounded bg-zinc-800 text-xs text-zinc-300">DOWN</kbd>: Moves forward in history; restores your original stashed draft at the end.</li>
          </ul>
        </section>
      )}

      {/* AUTONOMOUS TOOLS */}
      {activeSection === 'tool-execution' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Autonomous Tools & Shell Execution</h1>
          <p className="text-zinc-400">
            Tool actions are standardized and logged with exact file line counts and live streaming:
          </p>

          <div className="space-y-2 text-xs font-mono bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-zinc-300">
            <div>READ     → RTS &gt; Reading &#123;file&#125; (120 lines)</div>
            <div>WRITE    → RTS &gt; Writing &#123;file&#125; (45 lines)</div>
            <div>EDIT     → RTS &gt; Editing &#123;file&#125; (lines 10-25)</div>
            <div>SHELL    → ⚡ RTS &gt; Running &#123;command&#125; (live stdout/stderr)</div>
            <div>CONFIRM  → RTS &gt; Interactive keyboard selection modal (UP/DOWN/ENTER)</div>
          </div>
        </section>
      )}

      {/* MODELS GUIDE */}
      {activeSection === 'models-guide' && (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">NVIDIA NIM & Providers</h1>
          <p className="text-zinc-400">
            Switch models instantly via <code className="text-zinc-200">/model &lt;name&gt;</code>:
          </p>

          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 text-xs">
            <table className="w-full text-left">
              <thead className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 text-[11px] uppercase">
                <tr>
                  <th className="p-2.5">Model</th>
                  <th className="p-2.5">Context</th>
                  <th className="p-2.5">Speed</th>
                  <th className="p-2.5">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300 font-mono">
                <tr>
                  <td className="p-2.5 font-semibold text-white">nemotron-3-super-120b</td>
                  <td className="p-2.5">128k</td>
                  <td className="p-2.5 text-emerald-400">&lt;1.2s</td>
                  <td className="p-2.5 font-sans">Flagship coding & tool calling</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">gpt-oss-20b</td>
                  <td className="p-2.5">32k</td>
                  <td className="p-2.5 text-emerald-400">&lt;400ms</td>
                  <td className="p-2.5 font-sans">Zero-lag lightweight agent</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">deepseek-r1</td>
                  <td className="p-2.5">64k</td>
                  <td className="p-2.5 text-amber-400">Thinking</td>
                  <td className="p-2.5 font-sans">Deep logic & math reasoning</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">qwen2.5-coder-32b</td>
                  <td className="p-2.5">32k</td>
                  <td className="p-2.5 text-emerald-400">Fast</td>
                  <td className="p-2.5 font-sans">Python, Go, TypeScript refactoring</td>
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
            Skills are markdown instructions placed in <code className="text-zinc-200">~/.agents/skills/&lt;skill-name&gt;/SKILL.md</code>.
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
                  <td className="p-2.5 font-sans">Interactive setup wizard</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/model</td>
                  <td className="p-2.5 text-zinc-400">/model [id]</td>
                  <td className="p-2.5 font-sans">Switch AI model</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/provider</td>
                  <td className="p-2.5 text-zinc-400">/provider [name]</td>
                  <td className="p-2.5 font-sans">Switch provider backend</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/skills</td>
                  <td className="p-2.5 text-zinc-400">/skills</td>
                  <td className="p-2.5 font-sans">List active skill modules</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/memory</td>
                  <td className="p-2.5 text-zinc-400">/memory</td>
                  <td className="p-2.5 font-sans">View context window token usage</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/clear</td>
                  <td className="p-2.5 text-zinc-400">/clear</td>
                  <td className="p-2.5 font-sans">Reset conversation context</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">/exit</td>
                  <td className="p-2.5 text-zinc-400">/exit</td>
                  <td className="p-2.5 font-sans">Save history and exit CLI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

    </article>
  );
};
