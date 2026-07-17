import { BlocklyWorkspace } from 'react-blockly';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { registerAllScratchBlocks, SCRATCH_COLORS } from '../blocks/scratchBlocks';
import { registerGenerators } from '../blocks/generators';
import { THREE_COLORS } from '../blocks/threeBlocks';
import { PEN_COLORS } from '../blocks/penBlocks';
import { AI_COLORS } from '../blocks/aiBlocks';
import React, { Component, type ErrorInfo } from 'react';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("BlockEditor Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#ef4444', padding: '20px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
          <div>
            <h3>Error Loading Workspace</h3>
            <p>Please check if all blocks in the active tab are registered.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Register all custom blocks and generators
registerAllScratchBlocks();
registerGenerators();

// Define some custom themes/blocks if needed later
const toolboxCategories = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Motion',
      colour: SCRATCH_COLORS.motion,
      contents: [
        { kind: 'block', type: 'motion_movesteps', inputs: { STEPS: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'motion_turnright', inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 15 } } } } },
        { kind: 'block', type: 'motion_turnleft', inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 15 } } } } },
        { kind: 'block', type: 'motion_goto' },
        { kind: 'block', type: 'motion_gotoxy', inputs: { X: { shadow: { type: 'math_number', fields: { NUM: 0 } } }, Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } } } },
        { kind: 'block', type: 'motion_glidesecstoxy', inputs: { SECS: { shadow: { type: 'math_number', fields: { NUM: 1 } } }, X: { shadow: { type: 'math_number', fields: { NUM: 0 } } }, Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } } } },
        { kind: 'block', type: 'motion_set_xyz', inputs: { X: { shadow: { type: 'math_number', fields: { NUM: 0 } } }, Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } }, Z: { shadow: { type: 'math_number', fields: { NUM: 0 } } } } },
      ],
    },
    {
      kind: 'category',
      name: 'Looks',
      colour: SCRATCH_COLORS.looks,
      contents: [
        { kind: 'block', type: 'looks_sayforsecs', inputs: { MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } }, SECS: { shadow: { type: 'math_number', fields: { NUM: 2 } } } } },
        { kind: 'block', type: 'looks_say', inputs: { MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } } } },
        { kind: 'block', type: 'looks_thinkforsecs', inputs: { MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hmm...' } } }, SECS: { shadow: { type: 'math_number', fields: { NUM: 2 } } } } },
        { kind: 'block', type: 'looks_think', inputs: { MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hmm...' } } } } },
        { kind: 'block', type: 'looks_switchcostumeto' },
        { kind: 'block', type: 'looks_nextcostume' },
        { kind: 'block', type: 'looks_switchbackdropto' },
        { kind: 'block', type: 'looks_nextbackdrop' },
        { kind: 'block', type: 'looks_changesizeby', inputs: { CHANGE: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'looks_setsizeto', inputs: { SIZE: { shadow: { type: 'math_number', fields: { NUM: 100 } } } } },
        { kind: 'block', type: 'looks_changeeffectby', inputs: { CHANGE: { shadow: { type: 'math_number', fields: { NUM: 25 } } } } },
        { kind: 'block', type: 'looks_seteffectto', inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 0 } } } } },
        { kind: 'block', type: 'looks_cleargraphiceffects' },
        { kind: 'block', type: 'looks_show' },
        { kind: 'block', type: 'looks_hide' },
      ],
    },
    {
      kind: 'category',
      name: 'Events',
      colour: SCRATCH_COLORS.events,
      contents: [
        { kind: 'block', type: 'event_whenflagclicked' },
        { kind: 'block', type: 'event_whenkeypressed' },
        { kind: 'block', type: 'event_whenthisspriteclicked' },
        { kind: 'block', type: 'event_whenbackdropswitchesto' },
        { kind: 'block', type: 'event_whengreaterthan', inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'event_whenbroadcastreceived' },
        { kind: 'block', type: 'event_broadcast' },
        { kind: 'block', type: 'event_broadcastandwait' },
      ],
    },
    {
      kind: 'category',
      name: 'Control',
      colour: SCRATCH_COLORS.control,
      contents: [
        { kind: 'block', type: 'control_wait', inputs: { DURATION: { shadow: { type: 'math_number', fields: { NUM: 1 } } } } },
        { kind: 'block', type: 'control_repeat', inputs: { TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'control_forever' },
        { kind: 'block', type: 'control_if' },
        { kind: 'block', type: 'control_if_else' },
        { kind: 'block', type: 'control_wait_until' },
        { kind: 'block', type: 'control_repeat_until' },
        { kind: 'block', type: 'control_stop' },
        { kind: 'block', type: 'control_start_as_clone' },
        { kind: 'block', type: 'control_create_clone_of' },
        { kind: 'block', type: 'control_delete_this_clone' },
      ],
    },
    {
      kind: 'category',
      name: 'Sensing',
      colour: SCRATCH_COLORS.sensing,
      contents: [
        { kind: 'block', type: 'sensing_touchingobject' },
        { kind: 'block', type: 'sensing_touchingcolor' },
        { kind: 'block', type: 'sensing_distanceto' },
        { kind: 'block', type: 'sensing_askandwait', inputs: { QUESTION: { shadow: { type: 'text', fields: { TEXT: 'What\'s your name?' } } } } },
        { kind: 'block', type: 'sensing_answer' },
        { kind: 'block', type: 'sensing_keypressed' },
        { kind: 'block', type: 'sensing_mousedown' },
        { kind: 'block', type: 'sensing_mousex' },
        { kind: 'block', type: 'sensing_mousey' },
        { kind: 'block', type: 'sensing_setdragmode' },
        { kind: 'block', type: 'sensing_loudness' },
        { kind: 'block', type: 'sensing_timer' },
        { kind: 'block', type: 'sensing_resettimer' },
      ],
    },
    {
      kind: 'category',
      name: 'Operators',
      colour: SCRATCH_COLORS.operators,
      contents: [
        { kind: 'block', type: 'operator_add' },
        { kind: 'block', type: 'operator_subtract' },
        { kind: 'block', type: 'operator_multiply' },
        { kind: 'block', type: 'operator_divide' },
        { kind: 'block', type: 'operator_random', inputs: { FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } }, TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'operator_gt', inputs: { OPERAND1: { shadow: { type: 'text', fields: { TEXT: '' } } }, OPERAND2: { shadow: { type: 'math_number', fields: { NUM: 50 } } } } },
        { kind: 'block', type: 'operator_lt', inputs: { OPERAND1: { shadow: { type: 'text', fields: { TEXT: '' } } }, OPERAND2: { shadow: { type: 'math_number', fields: { NUM: 50 } } } } },
        { kind: 'block', type: 'operator_equals', inputs: { OPERAND1: { shadow: { type: 'text', fields: { TEXT: '' } } }, OPERAND2: { shadow: { type: 'math_number', fields: { NUM: 50 } } } } },
        { kind: 'block', type: 'operator_and' },
        { kind: 'block', type: 'operator_or' },
        { kind: 'block', type: 'operator_not' },
        { kind: 'block', type: 'operator_join', inputs: { STRING1: { shadow: { type: 'text', fields: { TEXT: 'apple ' } } }, STRING2: { shadow: { type: 'text', fields: { TEXT: 'banana' } } } } },
        { kind: 'block', type: 'operator_letter_of', inputs: { LETTER: { shadow: { type: 'math_number', fields: { NUM: 1 } } }, STRING: { shadow: { type: 'text', fields: { TEXT: 'apple' } } } } },
        { kind: 'block', type: 'operator_length', inputs: { STRING: { shadow: { type: 'text', fields: { TEXT: 'apple' } } } } },
        { kind: 'block', type: 'operator_contains', inputs: { STRING1: { shadow: { type: 'text', fields: { TEXT: 'apple' } } }, STRING2: { shadow: { type: 'text', fields: { TEXT: 'a' } } } } },
      ],
    },
    {
      kind: 'category',
      name: 'Variables',
      colour: SCRATCH_COLORS.variables,
      contents: [
        { kind: 'block', type: 'data_setvariableto', inputs: { VALUE: { shadow: { type: 'text', fields: { TEXT: '0' } } } } },
        { kind: 'block', type: 'data_changevariableby', inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 1 } } } } },
        { kind: 'block', type: 'data_showvariable' },
        { kind: 'block', type: 'data_hidevariable' },
      ],
    },
  ],
};

const darkTheme = Blockly.Theme.defineTheme('dark', {
  name: 'dark',
  base: Blockly.Themes.Zelos,
  startHats: true,
  componentStyles: {
    workspaceBackgroundColour: 'transparent',
    toolboxBackgroundColour: '#1a1d2d',
    toolboxForegroundColour: '#f1f5f9',
    flyoutBackgroundColour: '#1e2235',
    flyoutForegroundColour: '#f1f5f9',
    flyoutOpacity: 0.9,
    scrollbarColour: '#6366f1',
    insertionMarkerColour: '#fff',
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.4,
    cursorColour: '#d0d0d0',
  },
});

const lightTheme = Blockly.Theme.defineTheme('light', {
  name: 'light',
  base: Blockly.Themes.Zelos,
  startHats: true,
});

export interface BlockEditorProps {
  xml: string;
  theme: 'dark' | 'light';
  enabledAddons: string[];
  onXmlChange: (xml: string) => void;
  onCodeChange: (code: string) => void;
  onInject?: (workspace: Blockly.WorkspaceSvg) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ xml, theme, enabledAddons, onXmlChange, onCodeChange, onInject }) => {
  const getDynamicToolbox = () => {
    const baseToolbox = { ...toolboxCategories };
    baseToolbox.contents = [...baseToolbox.contents];

    if (enabledAddons.includes('threejs')) {
      baseToolbox.contents.push({
        kind: 'category',
        name: '3D Objects',
        colour: THREE_COLORS.main,
        contents: [
          { kind: 'block', type: 'three_createcube' },
          { kind: 'block', type: 'three_rotate' },
        ],
      });
    }

    if (enabledAddons.includes('pen')) {
      baseToolbox.contents.push({
        kind: 'category',
        name: 'Pen',
        colour: PEN_COLORS.main,
        contents: [
          { kind: 'block', type: 'pen_clear' },
          { kind: 'block', type: 'pen_down' },
          { kind: 'block', type: 'pen_up' },
          { kind: 'block', type: 'pen_setcolor' },
        ],
      });
    }

    if (enabledAddons.includes('ai')) {
      baseToolbox.contents.push({
        kind: 'category',
        name: 'Spark AI',
        colour: AI_COLORS.main,
        contents: [
          { kind: 'block', type: 'ai_ask' },
          { kind: 'block', type: 'ai_sentiment' },
        ],
      });
    }

    return baseToolbox;
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <ErrorBoundary>
        <BlocklyWorkspace
          className="fill-height"
          toolboxConfiguration={getDynamicToolbox()}
          initialXml={xml}
          onXmlChange={onXmlChange}
          onWorkspaceChange={(workspace) => {
            try {
              // Generate code on every change
              const code = javascriptGenerator.workspaceToCode(workspace);
              onCodeChange(code);
            } catch (e) {
              console.warn("Could not generate code for some blocks:", e);
            }
          }}
          onInject={onInject}
          workspaceConfiguration={{
            theme: theme === 'dark' ? darkTheme : lightTheme,
            renderer: 'thrasos',
            grid: {
              spacing: 20,
              length: 3,
              colour: theme === 'dark' ? '#333' : '#ccc',
              snap: true
            },
            zoom: {
              controls: true,
              wheel: true,
              startScale: 0.8,
              maxScale: 3,
              minScale: 0.3,
              scaleSpeed: 1.2
            }
          }}
        />
      </ErrorBoundary>
    </div>
  );
};
