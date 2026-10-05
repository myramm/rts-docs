import React from 'react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const sections = [
    {
      group: 'Overview',
      items: [
        { id: 'introduction', label: 'Introduction' },
        { id: 'quickstart', label: 'Quickstart (1-Line)' },
        { id: 'json-config', label: 'Manual JSON Setup' },
        { id: 'uninstall', label: 'Uninstallation' }
      ]
    },
    {
      group: 'Architecture',
      items: [
        { id: 'double-line', label: 'Double-Line Prompt' },
        { id: 'history', label: 'Arrow History Cycling' },
        { id: 'tool-execution', label: 'Autonomous Tools & Shell' }
      ]
    },
    {
      group: 'Configuration',
      items: [
        { id: 'models-guide', label: 'NVIDIA NIM & Providers' },
        { id: 'skills-guide', label: 'Anti-Slop & Skills' },
        { id: 'commands-ref', label: 'Slash Commands' }
      ]
    }
  ];

  return (
    <aside className="w-56 shrink-0 py-6 pr-6 border-r border-zinc-800 hidden md:block">
      <div className="space-y-6 text-xs sticky top-20">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-2">
            <span className="font-semibold text-zinc-400 uppercase tracking-wider text-[11px] block">
              {sec.group}
            </span>
            <div className="space-y-0.5">
              {sec.items.map(item => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-zinc-800 text-white font-medium'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
