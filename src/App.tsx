import { useState, useEffect, useRef } from 'react';
import { Play, Square, Save, FolderOpen, Code2, Settings, Sun, Moon, Plus, Puzzle } from 'lucide-react';
import { BlockEditor } from './components/BlockEditor';
import { GameStage, type SpriteData, type LineData } from './components/GameStage';
import { ThreeStage, type ThreeStageHandle } from './components/ThreeStage';
import { AddonsModal } from './components/Addons';
import { SpriteEditorModal } from './components/SpriteEditorModal';
import './index.css';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);
  const [enabledAddons, setEnabledAddons] = useState<string[]>([]);
  const threeStageRef = useRef<ThreeStageHandle>(null);
  const linesRef = useRef<LineData[]>([]);
  const [lines, setLines] = useState<LineData[]>([]);

  const toggleAddon = (id: string) => {
    setEnabledAddons(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const [sprites, setSprites] = useState<SpriteData[]>([
    {
      id: 'sprite1',
      name: 'Player',
      xml: '',
      code: '',
      state: { x: 0, y: 0, rotation: 90, color: '0x6366f1', zIndex: 0, penDown: false, penColor: '#ff0000', penSize: 4 }
    },
    {
      id: 'sprite2',
      name: 'Enemy',
      xml: '',
      code: '',
      state: {
        x: 100,
        y: -50,
        rotation: 90,
        color: '0xec4899',
        zIndex: 0,
        penDown: false,
        penColor: '#ec4899',
        penSize: 4,
      }
    }
  ]);
  const [activeSpriteId, setActiveSpriteId] = useState('sprite1');
  const [isSpriteEditorOpen, setIsSpriteEditorOpen] = useState(false);
  const [editingSprite, setEditingSprite] = useState<SpriteData | null>(null);

  const [backdrops, setBackdrops] = useState([
    { id: 'b1', name: 'Stage 1', texture: '' }
  ]);
  const [activeBackdropId, setActiveBackdropId] = useState('b1');
  const [workspaceTab, setWorkspaceTab] = useState<'blocks' | 'code'>('blocks');
  const [assetTab, setAssetTab] = useState<'sprites' | 'backdrops'>('sprites');

  // Change body class when theme changes
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  const handlePlay = async () => {
    // Reset 3D stage
    if (threeStageRef.current) threeStageRef.current.reset();

    const promises = sprites.map(async (sprite) => {
      if (!sprite.code) return;

      const spriteAPI = {
        moveSteps: async (steps: number) => {
          let oldX = 0, oldY = 0, newX = 0, newY = 0;
          let penDown = false, penColor = '#ff0000', penSize = 4;
          setSprites(prev => prev.map(s => {
            if (s.id !== sprite.id) return s;
            const rad = (s.state.rotation - 90) * (Math.PI / 180);
            oldX = s.state.x;
            oldY = s.state.y;
            newX = s.state.x + Math.cos(rad) * steps;
            newY = s.state.y + Math.sin(rad) * steps;
            penDown = !!s.state.penDown;
            penColor = s.state.penColor || '#ff0000';
            penSize = s.state.penSize || 4;
            return { ...s, state: { ...s.state, x: newX, y: newY } };
          }));
          if (penDown) {
            linesRef.current.push({ startX: oldX, startY: oldY, endX: newX, endY: newY, color: penColor, size: penSize });
            setLines([...linesRef.current]);
          }
          await new Promise(r => setTimeout(r, 16));
        },
        turnRight: async (degrees: number) => {
          setSprites(prev => prev.map(s => s.id === sprite.id ? { ...s, state: { ...s.state, rotation: s.state.rotation + degrees } } : s));
          await new Promise(r => setTimeout(r, 16));
        },
        turnLeft: async (degrees: number) => {
          setSprites(prev => prev.map(s => s.id === sprite.id ? { ...s, state: { ...s.state, rotation: s.state.rotation - degrees } } : s));
          await new Promise(r => setTimeout(r, 16));
        },
        goToXY: async (x: number, y: number) => {
          let oldX = 0, oldY = 0;
          let penDown = false, penColor = '#ff0000', penSize = 4;
          setSprites(prev => prev.map(s => {
            if (s.id !== sprite.id) return s;
            oldX = s.state.x;
            oldY = s.state.y;
            penDown = !!s.state.penDown;
            penColor = s.state.penColor || '#ff0000';
            penSize = s.state.penSize || 4;
            return { ...s, state: { ...s.state, x, y } };
          }));
          if (penDown) {
            linesRef.current.push({ startX: oldX, startY: oldY, endX: x, endY: y, color: penColor, size: penSize });
            setLines([...linesRef.current]);
          }
          await new Promise(r => setTimeout(r, 16));
        },
        setXYZ: async (x: number, y: number, z: number) => {
          let oldX = 0, oldY = 0;
          let penDown = false, penColor = '#ff0000', penSize = 4;
          setSprites(prev => prev.map(s => {
            if (s.id !== sprite.id) return s;
            oldX = s.state.x;
            oldY = s.state.y;
            penDown = !!s.state.penDown;
            penColor = s.state.penColor || '#ff0000';
            penSize = s.state.penSize || 4;
            return { ...s, state: { ...s.state, x, y, zIndex: z } };
          }));
          if (penDown) {
            linesRef.current.push({ startX: oldX, startY: oldY, endX: x, endY: y, color: penColor, size: penSize });
            setLines([...linesRef.current]);
          }
          await new Promise(r => setTimeout(r, 16));
        },
        goTo: async (dest: string) => {
          let destX = 0, destY = 0;
          if (dest === '_random_') {
            destX = Math.random() * 200 - 100;
            destY = Math.random() * 200 - 100;
          }
          await spriteAPI.goToXY(destX, destY);
        },
        glideToXY: async (secs: number, x: number, y: number) => {
          const fps = 30;
          const frames = secs * fps;
          let curX = 0, curY = 0;
          setSprites(prev => {
            const s = prev.find(sp => sp.id === sprite.id);
            if (s) { curX = s.state.x; curY = s.state.y; }
            return prev;
          });
          const dx = (x - curX) / frames;
          const dy = (y - curY) / frames;
          for (let i = 0; i < frames; i++) {
            await spriteAPI.moveSteps(0); // Dummy wait
            await spriteAPI.goToXY(curX + dx * (i + 1), curY + dy * (i + 1));
          }
        },
        create3DCube: async () => {
          if (threeStageRef.current) threeStageRef.current.createCube();
          await new Promise(resolve => setTimeout(resolve, 50));
        },
        rotate3D: async (degrees: number, axis: 'X' | 'Y' | 'Z') => {
          if (threeStageRef.current) threeStageRef.current.rotateObject(degrees, axis);
          await new Promise(resolve => setTimeout(resolve, 50));
        },
        penDown: async () => {
          setSprites(prev => prev.map(s => s.id === sprite.id ? { ...s, state: { ...s.state, penDown: true } } : s));
        },
        penUp: async () => {
          setSprites(prev => prev.map(s => s.id === sprite.id ? { ...s, state: { ...s.state, penDown: false } } : s));
        },
        penClear: async () => {
          linesRef.current = [];
          setLines([]);
        },
        setPenColor: async (color: string) => {
          setSprites(prev => prev.map(s => s.id === sprite.id ? { ...s, state: { ...s.state, penColor: color } } : s));
        },
        askAI: async (question: string) => {
          await new Promise(r => setTimeout(r, 600)); // Simulating AI thinking
          const responses = [
            `I processed "${question}"... Fascinating!`,
            "Based on my Sparkcode training, yes absolutely.",
            "That's a tough one, let me think about it.",
            "My neural networks predict a highly positive outcome."
          ];
          return responses[Math.floor(Math.random() * responses.length)];
        },
        analyzeSentiment: async (text: string) => {
          await new Promise(r => setTimeout(r, 400));
          const lower = text.toLowerCase();
          if (lower.match(/good|great|happy|love|excellent|awesome/)) return 'Positive';
          if (lower.match(/bad|sad|angry|hate|terrible|awful/)) return 'Negative';
          return 'Neutral';
        },
        touchingObject: async (_obj: string) => false,
        touchingColor: async (_color: string) => false,
        distanceTo: async (_menu: string) => 0,
        askAndWait: async (question: string) => {
          console.log("Asking:", question);
          await new Promise(r => setTimeout(r, 1000));
        },
        getAnswer: async () => "",
        keyPressed: async (_key: string) => false,
        mouseDown: async () => false,
        mouseX: async () => 0,
        mouseY: async () => 0,
        setDragMode: async (_mode: string) => { },
        getLoudness: async () => 0,
        getTimer: async () => 0,
        resetTimer: async () => { }
      };

      const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
      try {
        const runCode = new AsyncFunction('spriteAPI', sprite.code);
        await runCode(spriteAPI);
      } catch (e) {
        console.error("Error evaluating code:", e);
      }
    });

    await Promise.all(promises);
  };

  const activeSprite = sprites.find(s => s.id === activeSpriteId);

  return (
    <div className={`app-container ${theme === 'light' ? 'theme-light' : ''}`}>

      {/* Top Navbar */}
      <nav className="navbar glass-panel-nav">
        <div className="nav-brand">
          <Code2 className="text-primary glow-icon" size={28} />
          <h1>Spark<span className="text-primary">code</span></h1>
        </div>

        <div className="nav-center">
          <button className="btn-nav">
            <FolderOpen size={16} /> Open
          </button>
          <button className="btn-nav">
            <Save size={16} /> Save
          </button>
        </div>

        <div className="nav-right">
          <div className="copyright-tag">
            (C) prathameshshenoy
          </div>
          <button className="btn-icon" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="btn-icon" onClick={() => setIsAddonsOpen(true)}>
            <Puzzle size={20} />
          </button>
          <button className="btn-icon">
            <Settings size={20} />
          </button>
          <div className="user-avatar glow-shadow">
            U
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="main-layout">

        {/* Workspace (Left & Center) */}
        <div className="workspace">
          <div className="workspace-panel glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', padding: '8px', borderBottom: '1px solid var(--border-color)', gap: '8px' }}>
              <button
                className={`btn-nav ${workspaceTab === 'blocks' ? 'active' : ''}`}
                style={workspaceTab === 'blocks' ? { background: 'var(--primary)', color: 'white' } : {}}
                onClick={() => setWorkspaceTab('blocks')}
              >
                Blocks
              </button>
              <button
                className={`btn-nav ${workspaceTab === 'code' ? 'active' : ''}`}
                style={workspaceTab === 'code' ? { background: 'var(--primary)', color: 'white' } : {}}
                onClick={() => setWorkspaceTab('code')}
              >
                JavaScript
              </button>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
              {activeSprite && (
                <div style={{ display: workspaceTab === 'blocks' ? 'block' : 'none', width: '100%', height: '100%' }}>
                  <BlockEditor
                    key={activeSprite.id}
                    xml={activeSprite.xml}
                    theme={theme}
                    enabledAddons={enabledAddons}
                    onXmlChange={(newXml) => {
                      setSprites(prev => prev.map(s => s.id === activeSpriteId ? { ...s, xml: newXml } : s));
                    }}
                    onCodeChange={(newCode) => {
                      setSprites(prev => prev.map(s => s.id === activeSpriteId ? { ...s, code: newCode } : s));
                    }}
                  />
                </div>
              )}
              {workspaceTab === 'code' && activeSprite && (
                <pre style={{ margin: 0, padding: '24px', color: '#10b981', fontFamily: 'monospace', fontSize: '1rem', overflow: 'auto', height: '100%', boxSizing: 'border-box' }}>
                  {activeSprite.code || '// No code generated yet'}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel (Game Stage & Asset Manager) */}
        <div className="right-panel">

          {/* Game Stage */}
          <div className="game-stage-container">
            <div className="panel-header">
              <h2 className="panel-title">Preview</h2>
              <div className="control-bar">
                <button className="btn-play" onClick={handlePlay}>
                  <Play size={16} fill="currentColor" />
                  Play
                </button>
                <button className="btn-stop">
                  <Square size={16} fill="currentColor" />
                  Stop
                </button>
              </div>
            </div>
            <div className="stage-wrapper glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
              <GameStage sprites={sprites} lines={lines} backdropTexture={backdrops.find(b => b.id === activeBackdropId)?.texture} />
              {enabledAddons.includes('threejs') && <ThreeStage ref={threeStageRef} />}
            </div>
          </div>

          {/* Sprite & Asset Manager */}
          <div className="asset-manager">
            <div className="panel-header" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', width: '100%', paddingBottom: '8px' }}>
                <button
                  className={`panel-title ${assetTab === 'sprites' ? 'active' : ''}`}
                  style={{
                    background: 'none', border: 'none', padding: '4px 8px', cursor: 'pointer',
                    color: assetTab === 'sprites' ? 'var(--text-main)' : 'var(--text-muted)',
                    borderBottom: assetTab === 'sprites' ? '2px solid var(--primary)' : 'none',
                    fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px'
                  }}
                  onClick={() => setAssetTab('sprites')}
                >
                  Sprites
                </button>
                <button
                  className={`panel-title ${assetTab === 'backdrops' ? 'active' : ''}`}
                  style={{
                    background: 'none', border: 'none', padding: '4px 8px', cursor: 'pointer',
                    color: assetTab === 'backdrops' ? 'var(--text-main)' : 'var(--text-muted)',
                    borderBottom: assetTab === 'backdrops' ? '2px solid var(--primary)' : 'none',
                    fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px'
                  }}
                  onClick={() => setAssetTab('backdrops')}
                >
                  Backdrops
                </button>
              </div>

              {assetTab === 'sprites' ? (
                <button className="btn-primary-small" style={{ marginLeft: 'auto' }}>
                  <Plus size={14} style={{ marginRight: 4 }} /> New Sprite
                </button>
              ) : (
                <label className="btn-primary-small" style={{ cursor: 'pointer', marginLeft: 'auto' }}>
                  <Plus size={14} style={{ marginRight: 4 }} /> Upload
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            const newId = 'b' + Date.now();
                            setBackdrops(prev => [...prev, { id: newId, name: 'Backdrop ' + (prev.length + 1), texture: ev.target!.result as string }]);
                            setActiveBackdropId(newId);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {assetTab === 'sprites' ? (
              <div className="asset-grid glass-panel" style={{ flex: 1, minHeight: '150px' }}>
                {sprites.map(sprite => (
                  <div
                    key={sprite.id}
                    className={`sprite-card ${activeSpriteId === sprite.id ? 'active' : ''}`}
                    onClick={() => setActiveSpriteId(sprite.id)}
                    style={{ position: 'relative' }}
                  >
                    <button
                      className="btn-icon"
                      style={{
                        position: 'absolute', top: '8px', right: '8px',
                        width: '24px', height: '24px', zIndex: 10,
                        background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSprite(sprite);
                        setIsSpriteEditorOpen(true);
                      }}
                    >
                      <Settings size={12} />
                    </button>
                    <div className="sprite-preview">
                      {sprite.texture ? (
                        <img src={sprite.texture} alt={sprite.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                      ) : (
                        <div style={{ width: '32px', height: '32px', backgroundColor: sprite.state.color.replace('0x', '#'), borderRadius: '6px' }}></div>
                      )}
                    </div>
                    <span className="sprite-name">{sprite.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="asset-grid glass-panel" style={{ flex: 1, minHeight: '150px' }}>
                {backdrops.map(backdrop => (
                  <div
                    key={backdrop.id}
                    className={`sprite-card ${activeBackdropId === backdrop.id ? 'active' : ''}`}
                    onClick={() => setActiveBackdropId(backdrop.id)}
                  >
                    <div className="sprite-preview">
                      {backdrop.texture ? (
                        <img src={backdrop.texture} alt={backdrop.name} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : (
                        <div style={{ width: '32px', height: '32px', backgroundColor: '#333', borderRadius: '4px' }}></div>
                      )}
                    </div>
                    <span className="sprite-name">{backdrop.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
      {isSpriteEditorOpen && (
        <SpriteEditorModal
          isOpen={isSpriteEditorOpen}
          sprite={editingSprite}
          onClose={() => {
            setIsSpriteEditorOpen(false);
            setEditingSprite(null);
          }}
          onSave={(updated) => {
            setSprites(prev => prev.map(s => s.id === updated.id ? updated : s));
          }}
        />
      )}
      <AddonsModal
        isOpen={isAddonsOpen}
        onClose={() => setIsAddonsOpen(false)}
        enabledAddons={enabledAddons}
        toggleAddon={toggleAddon}
      />
    </div>
  );
}

export default App;
