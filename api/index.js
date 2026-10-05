import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({
    name: 'r.outers (rts)',
    version: '1.0.0',
    description: 'Fast Mobile & Terminal Vibe Coding Tool (Termux & Linux Ready)',
    status: 'ONLINE',
    author: 'myramm (ラム)',
    muse: 'Akari Watanabe 🌸',
    default_model: 'nvidia/nemotron-3-super-120b-a12b',
    providers: ['nvidia', 'atria', 'openai_compatible'],
    total_models_available: 84,
    runtime: 'Python 3.10+ / Linux & Android Termux',
    config_file: '~/.routers_config.json'
  });
});

app.get('/api/models', (req, res) => {
  const models = [
    {
      id: 'nvidia/nemotron-3-super-120b-a12b',
      name: 'Nemotron 3 Super 120B',
      provider: 'NVIDIA NIM',
      category: 'Flagship Reasoning & Coding',
      context: '128k',
      speed: 'Ultra Fast (<1.2s TTFT)',
      tools: true,
      recommended: true,
      tags: ['Default', 'Fast', 'Precise Tool Calling']
    },
    {
      id: 'openai/gpt-oss-20b',
      name: 'GPT-OSS 20B',
      provider: 'NVIDIA NIM',
      category: 'Lightweight Agentic',
      context: '32k',
      speed: 'Instant (<400ms)',
      tools: true,
      recommended: true,
      tags: ['Zero-Lag', 'Low-Memory', 'Termux-Optimized']
    },
    {
      id: 'deepseek-ai/deepseek-r1',
      name: 'DeepSeek R1',
      provider: 'NVIDIA NIM',
      category: 'Deep Chain-of-Thought Reasoning',
      context: '64k',
      speed: 'Reasoning Mode',
      tools: true,
      recommended: true,
      tags: ['Math & Logic', 'Architecture Planning']
    },
    {
      id: 'qwen/qwen2.5-coder-32b-instruct',
      name: 'Qwen 2.5 Coder 32B',
      provider: 'NVIDIA NIM',
      category: 'Specialized Coding & Refactoring',
      context: '32k',
      speed: 'Very Fast',
      tools: true,
      recommended: true,
      tags: ['Python / Go / TS Master', 'Diffs']
    }
  ];
  res.json({ count: models.length, models });
});

app.get('/api/skills', (req, res) => {
  const skills = [
    {
      name: 'antislop',
      author: 'Official',
      description: 'Anti Slop: Core filter to eliminate generic AI patterns, fake copy, and boilerplate.',
      modes: ['DURING (Live filter while coding)', 'AFTER (Post-audit numbered checklist)'],
      category: 'Quality & Aesthetics'
    },
    {
      name: 'superpowers',
      author: 'Community',
      description: 'Dynamic meta-skills framework providing systematic debugging, planning, and TDD.',
      modes: ['Automatic Invocation', 'Subagent Dispatch'],
      category: 'Core Agentic'
    },
    {
      name: 'apktool',
      author: 'myramm',
      description: 'Android APK unpacking, resource extraction, smali bytecode modification, and rebuilding.',
      modes: ['Smali Patches', 'Manifest Decompile'],
      category: 'Reverse Engineering'
    }
  ];
  res.json({ count: skills.length, skills });
});

app.get('/api/commands', (req, res) => {
  const commands = [
    { command: '/setup', description: 'Configure API keys and providers' },
    { command: '/model', description: 'Switch active LLM model or search 80+ NIM models' },
    { command: '/provider', description: 'Switch active AI provider' },
    { command: '/skills', description: 'List active dynamic prompt skills' },
    { command: '/add-skill', description: 'Install skill from Git repo' },
    { command: '/memory', description: 'View active conversation memory' },
    { command: '/clear', description: 'Reset conversation context window' },
    { command: '/exit', description: 'Save history and exit CLI' }
  ];
  res.json({ count: commands.length, commands });
});

app.post('/api/terminal/execute', (req, res) => {
  const { input, currentModel = 'nvidia/nemotron-3-super-120b-a12b' } = req.body;
  const trimmed = (input || '').trim();

  if (trimmed === '/help') {
    return res.json({
      output: `\x1b[36m/setup\x1b[0m      Configure API keys and providers\n\x1b[36m/model\x1b[0m      Switch active AI model\n\x1b[36m/skills\x1b[0m     List active skill prompt extensions\n\x1b[36m/clear\x1b[0m      Reset conversation context`,
      newModel: currentModel
    });
  }

  if (trimmed.startsWith('/model')) {
    const mod = trimmed.replace('/model', '').trim() || 'nvidia/nemotron-3-super-120b-a12b';
    return res.json({
      output: `\x1b[32m✔ Model switched to:\x1b[0m \x1b[1m${mod}\x1b[0m`,
      newModel: mod
    });
  }

  return res.json({
    output: `\x1b[35mRTS > Planning task execution...\x1b[0m\n\x1b[33mRTS > Writing code.py\x1b[0m\n\x1b[32m✔ RTS > Completed task successfully!\x1b[0m`,
    newModel: currentModel
  });
});

export default app;
