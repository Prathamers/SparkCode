import * as Blockly from 'blockly/core';
import { SCRATCH_COLORS } from './scratchBlocks';

export function registerLooksBlocks() {
  Blockly.Blocks['looks_sayforsecs'] = {
    init: function () {
      this.appendValueInput('MESSAGE').appendField('say');
      this.appendValueInput('SECS').appendField('for');
      this.appendDummyInput().appendField('secs');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_say'] = {
    init: function () {
      this.appendValueInput('MESSAGE').appendField('say');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_thinkforsecs'] = {
    init: function () {
      this.appendValueInput('MESSAGE').appendField('think');
      this.appendValueInput('SECS').appendField('for');
      this.appendDummyInput().appendField('secs');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_think'] = {
    init: function () {
      this.appendValueInput('MESSAGE').appendField('think');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_switchcostumeto'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('switch costume to')
        .appendField(new Blockly.FieldDropdown([['costume1', 'COSTUME1'], ['costume2', 'COSTUME2']]), 'COSTUME');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_nextcostume'] = {
    init: function () {
      this.appendDummyInput().appendField('next costume');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_switchbackdropto'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('switch backdrop to')
        .appendField(new Blockly.FieldDropdown([['backdrop1', 'BACKDROP1'], ['next backdrop', 'NEXT']]), 'BACKDROP');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_nextbackdrop'] = {
    init: function () {
      this.appendDummyInput().appendField('next backdrop');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_changesizeby'] = {
    init: function () {
      this.appendValueInput('CHANGE').setCheck('Number').appendField('change size by');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_setsizeto'] = {
    init: function () {
      this.appendValueInput('SIZE').setCheck('Number').appendField('set size to');
      this.appendDummyInput().appendField('%');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_changeeffectby'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('change')
        .appendField(new Blockly.FieldDropdown([['color', 'COLOR'], ['fisheye', 'FISHEYE']]), 'EFFECT');
      this.appendValueInput('CHANGE').setCheck('Number').appendField('effect by');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_seteffectto'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('set')
        .appendField(new Blockly.FieldDropdown([['color', 'COLOR'], ['fisheye', 'FISHEYE']]), 'EFFECT');
      this.appendValueInput('VALUE').setCheck('Number').appendField('effect to');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_cleargraphiceffects'] = {
    init: function () {
      this.appendDummyInput().appendField('clear graphic effects');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_show'] = {
    init: function () {
      this.appendDummyInput().appendField('show');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };

  Blockly.Blocks['looks_hide'] = {
    init: function () {
      this.appendDummyInput().appendField('hide');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.looks);
    },
  };
}
