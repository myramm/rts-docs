import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DocContent } from './components/DocContent';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ModelExplorer } from './components/ModelExplorer';
import { SearchModal } from './components/SearchModal';

export function App() {
  const [activeTab, setActiveTab] = useState<'docs' | 'simulator' | 'models'>('docs');
  const [activeSection, setActiveSection] = useState('introduction');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSearchResult = (sectionId: string, tabName?: string) => {
    if (tabName && ['docs', 'simulator', 'models'].includes(tabName)) {
      setActiveTab(tabName as any);
    } else {
      setActiveTab('docs');
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as any)}
        onOpenSearch={() => setSearchOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 flex">
        {/* Sidebar always rendered so mobile drawer works on any view */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeTab={activeTab}
          setActiveTab={(t) => setActiveTab(t as any)}
        />

        {activeTab === 'docs' && (
          <main className="flex-1 md:pl-8 py-2 overflow-y-auto">
            <DocContent activeSection={activeSection} />
          </main>
        )}

        {activeTab === 'simulator' && (
          <main className="flex-1 md:pl-8 py-4 w-full">
            <TerminalSimulator />
          </main>
        )}

        {activeTab === 'models' && (
          <main className="flex-1 md:pl-8 py-4 w-full">
            <ModelExplorer />
          </main>
        )}
      </div>

      <footer className="border-t border-zinc-900 py-6 text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <span>r.outers (rts) v2.4.0</span>
          <a
            href="https://github.com/myramm/r.outers"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
