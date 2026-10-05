import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="relative my-3 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-[13px] leading-relaxed overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800 bg-zinc-900/60 text-xs text-zinc-400">
          <span>{filename}</span>
          <span className="text-[11px] text-zinc-500 lowercase">{language}</span>
        </div>
      )}

      <div className="relative p-3.5 overflow-x-auto text-zinc-200">
        <button
          onClick={handleCopy}
          className="absolute right-2.5 top-2.5 p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          title="Copy"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        <pre className="pr-10 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
