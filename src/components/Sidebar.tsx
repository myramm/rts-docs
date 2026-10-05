import React from 'react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeTab,
  setActiveTab
}) => {
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
    },
    {
      group: 'Developers & API',
      items: [
        { id: 'endpoints', label: 'REST API Endpoints' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-14 left-0 z-40 w-72 md:w-56 shrink-0 h-[calc(100vh-3.5rem)] overflow-y-auto bg-zinc-950 md:bg-transparent p-5 md:py-6 md:px-0 md:pr-6 border-r border-zinc-800 transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 text-xs">
          
          {/* Mobile Tab Switcher */}
          <div className="md:hidden space-y-1.5 pb-4 border-b border-zinc-800">
            <span className="font-semibold text-zinc-500 uppercase tracking-wider text-[10px] block">
              Navigation
            </span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => {
                  setActiveTab('docs');
                  setMobileMenuOpen(false);
                }}
                className={`px-2 py-1.5 rounded text-center text-xs font-medium ${
                  activeTab === 'docs' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                Docs
              </button>
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  setMobileMenuOpen(false);
                }}
                className={`px-2 py-1.5 rounded text-center text-xs font-medium ${
                  activeTab === 'simulator' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                CLI
              </button>
              <button
                onClick={() => {
                  setActiveTab('models');
                  setMobileMenuOpen(false);
                }}
                className={`px-2 py-1.5 rounded text-center text-xs font-medium ${
                  activeTab === 'models' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                Models
              </button>
            </div>
          </div>

          {/* Doc Sections Hierarchy */}
          {sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <span className="font-semibold text-zinc-500 uppercase tracking-wider text-[11px] block">
                {sec.group}
              </span>
              <div className="space-y-0.5">
                {sec.items.map(item => {
                  const isActive = activeSection === item.id && activeTab === 'docs';
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab('docs');
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors ${
                        isActive
                          ? 'bg-zinc-800 text-white font-semibold'
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
    </>
  );
};
