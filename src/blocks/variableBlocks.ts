import * as Blockly from 'blockly/core';
import { SCRATCH_COLORS } from './scratchBlocks';

export function registerVariableBlocks() {
  Blockly.Blocks['data_setvariableto'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('set')
        .appendField(new Blockly.FieldVariable('my variable'), 'VARIABLE');
      this.appendValueInput('VALUE').appendField('to');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.variables);
    },
  };

  Blockly.Blocks['data_changevariableby'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('change')
        .appendField(new Blockly.FieldVariable('my variable'), 'VARIABLE');
      this.appendValueInput('VALUE').setCheck('Number').appendField('by');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.variables);
    },
  };

  Blockly.Blocks['data_showvariable'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('show variable')
        .appendField(new Blockly.FieldVariable('my variable'), 'VARIABLE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.variables);
    },
  };

  Blockly.Blocks['data_hidevariable'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('hide variable')
        .appendField(new Blockly.FieldVariable('my variable'), 'VARIABLE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.variables);
    },
  };
}
