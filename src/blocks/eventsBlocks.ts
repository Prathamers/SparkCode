import * as Blockly from 'blockly/core';
import { SCRATCH_COLORS } from './scratchBlocks';

export function registerEventsBlocks() {
  Blockly.Blocks['event_whenflagclicked'] = {
    init: function () {
      this.appendDummyInput().appendField('when ⚑ clicked');
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.events);
      this.setStyle('hat_blocks');
    },
  };

  Blockly.Blocks['event_whenkeypressed'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('when')
        .appendField(new Blockly.FieldDropdown([['space', 'SPACE'], ['up arrow', 'UP'], ['down arrow', 'DOWN'], ['any', 'ANY']]), 'KEY')
        .appendField('key pressed');
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.events);
      this.setStyle('hat_blocks');
    },
  };

  Blockly.Blocks['event_whenthisspriteclicked'] = {
    init: function () {
      this.appendDummyInput().appendField('when this sprite clicked');
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.events);
      this.setStyle('hat_blocks');
    },
  };

  Blockly.Blocks['event_whenbackdropswitchesto'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('when backdrop switches to')
        .appendField(new Blockly.FieldDropdown([['backdrop1', 'BACKDROP1']]), 'BACKDROP');
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.events);
      this.setStyle('hat_blocks');
    },
  };

  Blockly.Blocks['event_whengreaterthan'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('when')
        .appendField(new Blockly.FieldDropdown([['loudness', 'LOUDNESS'], ['timer', 'TIMER']]), 'WHATEVER')
        .appendField('>');
      this.appendValueInput('VALUE').setCheck('Number');
      this.setInputsInline(true);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.events);
      this.setStyle('hat_blocks');
    },
  };

  Blockly.Blocks['event_whenbroadcastreceived'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('when I receive')
        .appendField(new Blockly.FieldDropdown([['message1', 'MESSAGE1']]), 'BROADCAST_OPTION');
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.events);
      this.setStyle('hat_blocks');
    },
  };

  Blockly.Blocks['event_broadcast'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('broadcast')
        .appendField(new Blockly.FieldDropdown([['message1', 'MESSAGE1']]), 'BROADCAST_OPTION');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.events);
    },
  };

  Blockly.Blocks['event_broadcastandwait'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('broadcast')
        .appendField(new Blockly.FieldDropdown([['message1', 'MESSAGE1']]), 'BROADCAST_OPTION')
        .appendField('and wait');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(SCRATCH_COLORS.events);
    },
  };
}
