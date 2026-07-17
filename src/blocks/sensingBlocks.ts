import * as Blockly from 'blockly/core';
import { SCRATCH_COLORS } from './scratchBlocks';

export function registerSensingBlocks() {
  Blockly.Blocks['sensing_touchingobject'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('touching')
        .appendField(new Blockly.FieldDropdown([['mouse-pointer', '_mouse_'], ['edge', '_edge_']]), 'TOUCHINGOBJECTMENU')
        .appendField('?');
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_touchingcolor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('touching color')
        .appendField(new Blockly.FieldTextInput('#ff0000'), 'COLOR')
        .appendField('?');
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_distanceto'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('distance to')
        .appendField(new Blockly.FieldDropdown([['mouse-pointer', '_mouse_']]), 'DISTANCETOMENU');
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_askandwait'] = {
    init: function () {
      this.appendValueInput('QUESTION').appendField('ask');
      this.appendDummyInput().appendField('and wait');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_answer'] = {
    init: function () {
      this.appendDummyInput().appendField('answer');
      this.setOutput(true, 'String');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_keypressed'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('key')
        .appendField(new Blockly.FieldDropdown([['space', 'SPACE'], ['up arrow', 'UP'], ['down arrow', 'DOWN'], ['any', 'ANY']]), 'KEY_OPTION')
        .appendField('pressed?');
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_mousedown'] = {
    init: function () {
      this.appendDummyInput().appendField('mouse down?');
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_mousex'] = {
    init: function () {
      this.appendDummyInput().appendField('mouse x');
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_mousey'] = {
    init: function () {
      this.appendDummyInput().appendField('mouse y');
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_setdragmode'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('set drag mode')
        .appendField(new Blockly.FieldDropdown([['draggable', 'draggable'], ['not draggable', 'not draggable']]), 'DRAG_MODE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_loudness'] = {
    init: function () {
      this.appendDummyInput().appendField('loudness');
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_timer'] = {
    init: function () {
      this.appendDummyInput().appendField('timer');
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };

  Blockly.Blocks['sensing_resettimer'] = {
    init: function () {
      this.appendDummyInput().appendField('reset timer');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.sensing);
    },
  };
}
