import React, { useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';

export const ModelExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const models = [
    { id: 'nvidia/nemotron-3-super-120b-a12b', name: 'Nemotron 3 Super 120B', context: '128k', latency: '<1.2s', tools: 'Yes', category: 'Flagship' },
    { id: 'openai/gpt-oss-20b', name: 'GPT-OSS 20B', context: '32k', latency: '<400ms', tools: 'Yes', category: 'Lightweight' },
    { id: 'deepseek-ai/deepseek-r1', name: 'DeepSeek R1', context: '64k', latency: 'Reasoning', tools: 'Yes', category: 'Reasoning' },
    { id: 'qwen/qwen2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder 32B', context: '32k', latency: 'Fast', tools: 'Yes', category: 'Coding' },
    { id: 'meta/llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct', context: '128k', latency: 'Fast', tools: 'Yes', category: 'General' },
    { id: 'mistralai/mistral-large-2407', name: 'Mistral Large 2', context: '128k', latency: 'Fast', tools: 'Yes', category: 'Multilingual' },
    { id: 'z-ai/glm-5.3', name: 'GLM 5.3 Reasoning', context: '64k', latency: 'Reasoning', tools: 'Yes', category: 'Reasoning' },
    { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B IT', context: '8k', latency: 'Instant', tools: 'Yes', category: 'Compact' }
  ];

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`/model ${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filtered = models.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.id.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 text-zinc-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">NVIDIA NIM 80+ Models Catalog</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Switch any model instantly using <code className="text-zinc-200">/model &lt;id&gt;</code>.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Filter models..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 text-xs">
        <table className="w-full text-left font-mono">
          <thead className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 uppercase text-[11px]">
            <tr>
              <th className="p-3">Model</th>
              <th className="p-3">Category</th>
              <th className="p-3">Context</th>
              <th className="p-3">Speed</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-zinc-900/40">
                <td className="p-3">
                  <span className="font-semibold text-white block">{m.name}</span>
                  <span className="text-[11px] text-zinc-500">{m.id}</span>
                </td>
                <td className="p-3 text-zinc-400 font-sans">{m.category}</td>
                <td className="p-3">{m.context}</td>
                <td className="p-3 text-emerald-400">{m.latency}</td>
                <td className="p-3 text-right font-sans">
                  <button
                    onClick={() => handleCopy(m.id)}
                    className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors text-[11px]"
                  >
                    {copiedId === m.id ? (
                      <span className="flex items-center space-x-1 text-emerald-400">
                        <Check className="w-3 h-3" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <span>Copy command</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
