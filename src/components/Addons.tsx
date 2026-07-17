import React from 'react';
import { X, Box, PenTool, Sparkles } from 'lucide-react';

interface Addon {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const ADDONS: Addon[] = [
  {
    id: 'threejs',
    name: 'Three.js 3D',
    description: 'Adds blocks to create and manipulate 3D objects using Three.js',
    icon: <Box size={24} className="text-blue-500" />
  },
  {
    id: 'pen',
    name: 'Pen',
    description: 'Draw on the screen with your sprites. Customize colors and brush sizes!',
    icon: <PenTool size={24} className="text-emerald-500" />
  },
  {
    id: 'ai',
    name: 'Spark AI',
    description: 'Give your sprites intelligence to analyze text and answer questions.',
    icon: <Sparkles size={24} className="text-purple-500" />
  }
];

interface AddonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  enabledAddons: string[];
  toggleAddon: (id: string) => void;
}

export const AddonsModal: React.FC<AddonsModalProps> = ({ isOpen, onClose, enabledAddons, toggleAddon }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl w-full max-w-2xl shadow-[var(--shadow-glow)] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-[var(--border-color)]">
          <h2 className="text-2xl font-bold text-[var(--text-main)] font-outfit">Extensions</h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADDONS.map(addon => {
            const isEnabled = enabledAddons.includes(addon.id);
            return (
              <div 
                key={addon.id} 
                onClick={() => toggleAddon(addon.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-3
                  ${isEnabled 
                    ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                    : 'border-[var(--border-color)] hover:border-[var(--text-muted)]'
                  }`}
              >
                <div className="p-4 rounded-full bg-[var(--bg-dark)] border border-[var(--border-color)]">
                  {addon.icon}
                </div>
                <h3 className="font-bold text-[var(--text-main)] text-lg font-outfit">{addon.name}</h3>
                <p className="text-[var(--text-muted)] text-sm">{addon.description}</p>
                
                <div className={`mt-2 px-4 py-1 rounded-full text-xs font-bold ${isEnabled ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-dark)] text-[var(--text-muted)]'}`}>
                  {isEnabled ? 'ENABLED' : 'DISABLED'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
