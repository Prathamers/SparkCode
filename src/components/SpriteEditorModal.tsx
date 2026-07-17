import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import type { SpriteData } from './GameStage';

interface SpriteEditorModalProps {
  isOpen: boolean;
  sprite: SpriteData | null;
  onClose: () => void;
  onSave: (updated: SpriteData) => void;
}

export const SpriteEditorModal: React.FC<SpriteEditorModalProps> = ({ isOpen, sprite, onClose, onSave }) => {
  const [name, setName] = useState(sprite?.name || '');
  const [color, setColor] = useState(sprite?.state.color.replace('0x', '#') || '#ffffff');
  const [texture, setTexture] = useState<string | undefined>(sprite?.texture);

  // Update internal state when sprite prop changes
  React.useEffect(() => {
    if (sprite) {
      setName(sprite.name);
      setColor(sprite.state.color.replace('0x', '#'));
      setTexture(sprite.texture);
    }
  }, [sprite]);

  if (!isOpen || !sprite) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setTexture(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const colorHex = color.replace('#', '0x');
    onSave({
      ...sprite,
      name,
      texture,
      state: {
        ...sprite.state,
        color: colorHex
      }
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass-panel" style={{
        width: '400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative'
      }}>
        <button className="btn-icon" onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <X size={20} />
        </button>
        
        <h2 className="panel-title" style={{ margin: 0 }}>Edit Sprite</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            style={{ 
              padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', 
              background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', outline: 'none' 
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tint Color</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input 
              type="color" 
              value={color} 
              onChange={e => setColor(e.target.value)}
              style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'monospace' }}>{color}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Texture (Image)</label>
          {texture && (
            <div style={{ width: '100px', height: '100px', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '8px' }}>
              <img src={texture} alt="Sprite preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          )}
          <label className="btn-nav" style={{ justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border-color)', cursor: 'pointer' }}>
            <Upload size={16} /> Upload Custom Image
            <input type="file" accept="image/png, image/jpeg" style={{ display: 'none' }} onChange={handleImageUpload} />
          </label>
          <button 
            className="btn-nav" 
            onClick={() => setTexture(undefined)}
            style={{ justifyContent: 'center', marginTop: '4px', color: '#ef4444' }}
            disabled={!texture}
          >
            Clear Texture
          </button>
        </div>

        <button className="btn-play" onClick={handleSave} style={{ marginTop: '12px', justifyContent: 'center', background: 'var(--primary)' }}>
          Save Changes
        </button>
      </div>
    </div>
  );
};
