import * as Blockly from 'blockly/core';
import { SCRATCH_COLORS } from './scratchBlocks';

export function registerOperatorBlocks() {
  Blockly.Blocks['operator_add'] = {
    init: function () {
      this.appendValueInput('NUM1').setCheck('Number');
      this.appendValueInput('NUM2').setCheck('Number').appendField('+');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_subtract'] = {
    init: function () {
      this.appendValueInput('NUM1').setCheck('Number');
      this.appendValueInput('NUM2').setCheck('Number').appendField('-');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_multiply'] = {
    init: function () {
      this.appendValueInput('NUM1').setCheck('Number');
      this.appendValueInput('NUM2').setCheck('Number').appendField('*');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_divide'] = {
    init: function () {
      this.appendValueInput('NUM1').setCheck('Number');
      this.appendValueInput('NUM2').setCheck('Number').appendField('/');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_random'] = {
    init: function () {
      this.appendValueInput('FROM').setCheck('Number').appendField('pick random');
      this.appendValueInput('TO').setCheck('Number').appendField('to');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_gt'] = {
    init: function () {
      this.appendValueInput('OPERAND1').setCheck(['Number', 'String']);
      this.appendValueInput('OPERAND2').setCheck(['Number', 'String']).appendField('>');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_lt'] = {
    init: function () {
      this.appendValueInput('OPERAND1').setCheck(['Number', 'String']);
      this.appendValueInput('OPERAND2').setCheck(['Number', 'String']).appendField('<');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_equals'] = {
    init: function () {
      this.appendValueInput('OPERAND1').setCheck(['Number', 'String']);
      this.appendValueInput('OPERAND2').setCheck(['Number', 'String']).appendField('=');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_and'] = {
    init: function () {
      this.appendValueInput('OPERAND1').setCheck('Boolean');
      this.appendValueInput('OPERAND2').setCheck('Boolean').appendField('and');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_or'] = {
    init: function () {
      this.appendValueInput('OPERAND1').setCheck('Boolean');
      this.appendValueInput('OPERAND2').setCheck('Boolean').appendField('or');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_not'] = {
    init: function () {
      this.appendValueInput('OPERAND').setCheck('Boolean').appendField('not');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_join'] = {
    init: function () {
      this.appendValueInput('STRING1').setCheck('String').appendField('join');
      this.appendValueInput('STRING2').setCheck('String');
      this.setInputsInline(true);
      this.setOutput(true, 'String');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_letter_of'] = {
    init: function () {
      this.appendValueInput('LETTER').setCheck('Number').appendField('letter');
      this.appendValueInput('STRING').setCheck('String').appendField('of');
      this.setInputsInline(true);
      this.setOutput(true, 'String');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_length'] = {
    init: function () {
      this.appendValueInput('STRING').setCheck('String').appendField('length of');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };

  Blockly.Blocks['operator_contains'] = {
    init: function () {
      this.appendValueInput('STRING1').setCheck('String');
      this.appendValueInput('STRING2').setCheck('String').appendField('contains');
      this.appendDummyInput().appendField('?');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(SCRATCH_COLORS.operators);
    },
  };
}
