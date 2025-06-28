import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Listen for global toggle events
  useEffect(() => {
    const handleToggle = (event) => {
      setOpen(event.detail.open);
    };

    window.addEventListener('toggleCommandPalette', handleToggle);
    return () => window.removeEventListener('toggleCommandPalette', handleToggle);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  const commands = [
    {
      id: 'go-hero',
      label: 'Go to Hero',
      action: () => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      category: 'Navigation'
    },
    {
      id: 'go-experiments',
      label: 'Go to Experiments',
      action: () => {
        document.getElementById('experiments')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      category: 'Navigation'
    },
    {
      id: 'go-specimens',
      label: 'Go to Specimens',
      action: () => {
        document.getElementById('specimens')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      category: 'Navigation'
    },
    {
      id: 'go-formulations',
      label: 'Go to Formulations',
      action: () => {
        document.getElementById('formulations')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      category: 'Navigation'
    },
    {
      id: 'go-library',
      label: 'Go to Library',
      action: () => {
        document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      category: 'Navigation'
    },
    {
      id: 'go-contact',
      label: 'Go to Contact',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      category: 'Navigation'
    },
    {
      id: 'read-latest',
      label: 'Read Latest Formulation',
      action: () => {
        window.location.href = '/formulations';
        setOpen(false);
      },
      category: 'Content'
    },
    {
      id: 'toggle-theme',
      label: 'Toggle Theme',
      action: () => {
        window.toggleTheme();
        setOpen(false);
      },
      category: 'Settings'
    },
    {
      id: 'open-github',
      label: 'Open GitHub Profile',
      action: () => {
        window.open('https://github.com/njerii', '_blank');
        setOpen(false);
      },
      category: 'External'
    },
    {
      id: 'open-maomao',
      label: 'Open Maomao Gallery',
      action: () => {
        window.openMaomaoGallery();
        setOpen(false);
      },
      category: 'Fun'
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 font-mono"
                />
                <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 rounded">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-gray-500 dark:text-gray-400 font-mono">
                  No commands found.
                </Command.Empty>

                {Object.entries(groupedCommands).map(([category, commands]) => (
                  <Command.Group key={category} heading={category} className="mb-4">
                    <div className="px-2 py-1 text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {category}
                    </div>
                    {commands.map((command) => (
                      <Command.Item
                        key={command.id}
                        onSelect={command.action}
                        className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 font-mono text-sm text-gray-900 dark:text-gray-100"
                      >
                        <span className="flex-1">{command.label}</span>
                        {command.id === 'toggle-theme' && (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        )}
                        {command.category === 'Navigation' && (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        )}
                        {command.category === 'External' && (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-mono">
                  <span>Press ↵ to select</span>
                  <span>⌘K to open</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;