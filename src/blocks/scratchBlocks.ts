import * as Blockly from 'blockly/core';

// Define Scratch colors
export const SCRATCH_COLORS = {
  motion: '#4C97FF',
  looks: '#9966FF',
  sound: '#CF63CF',
  events: '#FFBF00',
  control: '#FFAB19',
  sensing: '#5CB1D6',
  operators: '#59C059',
  variables: '#FF8C1A',
  myBlocks: '#FF6680',
};

import { registerLooksBlocks } from './looksBlocks';
import { registerEventsBlocks } from './eventsBlocks';
import { registerControlBlocks } from './controlBlocks';
import { registerSensingBlocks } from './sensingBlocks';
import { registerOperatorBlocks } from './operatorBlocks';
import { registerVariableBlocks } from './variableBlocks';
import { registerThreeBlocks } from './threeBlocks';
import { registerPenBlocks } from './penBlocks';
import { registerAiBlocks } from './aiBlocks';

export function registerAllScratchBlocks() {
  registerScratchBlocks(); // Motion
  registerLooksBlocks();
  registerEventsBlocks();
  registerControlBlocks();
  registerSensingBlocks();
  registerOperatorBlocks();
  registerVariableBlocks();
  registerThreeBlocks();
  registerPenBlocks();
  registerAiBlocks();
}

// Register custom Scratch-like blocks
export function registerScratchBlocks() {
  // Motion: move [10] steps
  Blockly.Blocks['motion_movesteps'] = {
    init: function () {
      this.appendValueInput('STEPS')
        .setCheck('Number')
        .appendField('move');
      this.appendDummyInput()
        .appendField('steps');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.motion);
      this.setTooltip('Moves the sprite forward');
      this.setHelpUrl('');
    },
  };

  // Motion: turn right [15] degrees
  Blockly.Blocks['motion_turnright'] = {
    init: function () {
      this.appendValueInput('DEGREES')
        .setCheck('Number')
        .appendField('turn ↻');
      this.appendDummyInput()
        .appendField('degrees');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.motion);
      this.setTooltip('Turn right');
      this.setHelpUrl('');
    },
  };

  // Motion: turn left [15] degrees
  Blockly.Blocks['motion_turnleft'] = {
    init: function () {
      this.appendValueInput('DEGREES')
        .setCheck('Number')
        .appendField('turn ↺');
      this.appendDummyInput()
        .appendField('degrees');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.motion);
      this.setTooltip('Turn left');
      this.setHelpUrl('');
    },
  };

  // Motion: go to [random position v]
  Blockly.Blocks['motion_goto'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('go to')
        .appendField(new Blockly.FieldDropdown([
          ['random position', '_random_'],
          ['mouse-pointer', '_mouse_']
        ]), 'TO');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.motion);
      this.setTooltip('Go to a position');
      this.setHelpUrl('');
    },
  };

  // Motion: go to x: [0] y: [0]
  Blockly.Blocks['motion_gotoxy'] = {
    init: function () {
      this.appendValueInput('X')
        .setCheck('Number')
        .appendField('go to x:');
      this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('y:');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.motion);
      this.setTooltip('Go to specific coordinates');
      this.setHelpUrl('');
    },
  };

  // Motion: glide [1] secs to x: [0] y: [0]
  Blockly.Blocks['motion_glidesecstoxy'] = {
    init: function () {
      this.appendValueInput('SECS')
        .setCheck('Number')
        .appendField('glide');
      this.appendValueInput('X')
        .setCheck('Number')
        .appendField('secs to x:');
      this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('y:');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.motion);
      this.setTooltip('Glide to specific coordinates over time');
      this.setHelpUrl('');
    },
  };

  // Motion: set x, y, z
  Blockly.Blocks['motion_set_xyz'] = {
    init: function () {
      this.appendValueInput('X')
        .setCheck('Number')
        .appendField('set x:');
      this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('y:');
      this.appendValueInput('Z')
        .setCheck('Number')
        .appendField('z layer:');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.motion);
      this.setTooltip('Set x, y, and z layer');
      this.setHelpUrl('');
    },
  };
}
