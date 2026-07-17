import * as Blockly from 'blockly/core';
import { SCRATCH_COLORS } from './scratchBlocks';

export function registerControlBlocks() {
  Blockly.Blocks['control_wait'] = {
    init: function () {
      this.appendValueInput('DURATION').setCheck('Number').appendField('wait');
      this.appendDummyInput().appendField('secs');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_repeat'] = {
    init: function () {
      this.appendValueInput('TIMES').setCheck('Number').appendField('repeat');
      this.appendStatementInput('SUBSTACK');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_forever'] = {
    init: function () {
      this.appendDummyInput().appendField('forever');
      this.appendStatementInput('SUBSTACK');
      this.setPreviousStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
      // Forever doesn't have a next statement
    },
  };

  Blockly.Blocks['control_if'] = {
    init: function () {
      this.appendValueInput('CONDITION').setCheck('Boolean').appendField('if');
      this.appendDummyInput().appendField('then');
      this.appendStatementInput('SUBSTACK');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_if_else'] = {
    init: function () {
      this.appendValueInput('CONDITION').setCheck('Boolean').appendField('if');
      this.appendDummyInput().appendField('then');
      this.appendStatementInput('SUBSTACK');
      this.appendDummyInput().appendField('else');
      this.appendStatementInput('SUBSTACK2');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_wait_until'] = {
    init: function () {
      this.appendValueInput('CONDITION').setCheck('Boolean').appendField('wait until');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_repeat_until'] = {
    init: function () {
      this.appendValueInput('CONDITION').setCheck('Boolean').appendField('repeat until');
      this.appendStatementInput('SUBSTACK');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_stop'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('stop')
        .appendField(new Blockly.FieldDropdown([['all', 'ALL'], ['this script', 'THIS'], ['other scripts in sprite', 'OTHER']]), 'STOP_OPTION');
      this.setPreviousStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_start_as_clone'] = {
    init: function () {
      this.appendDummyInput().appendField('when I start as a clone');
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_create_clone_of'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('create clone of')
        .appendField(new Blockly.FieldDropdown([['myself', '_myself_']]), 'CLONE_OPTION');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };

  Blockly.Blocks['control_delete_this_clone'] = {
    init: function () {
      this.appendDummyInput().appendField('delete this clone');
      this.setPreviousStatement(true, null);
      this.setColour(SCRATCH_COLORS.control);
    },
  };
}
