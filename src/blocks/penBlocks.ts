import * as Blockly from 'blockly';

export const PEN_COLORS = {
  main: '#0fbd8c'
};

export function registerPenBlocks() {
  Blockly.Blocks['pen_clear'] = {
    init: function () {
      this.appendDummyInput().appendField('erase all');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(PEN_COLORS.main);
    },
  };

  Blockly.Blocks['pen_down'] = {
    init: function () {
      this.appendDummyInput().appendField('pen down');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(PEN_COLORS.main);
    },
  };

  Blockly.Blocks['pen_up'] = {
    init: function () {
      this.appendDummyInput().appendField('pen up');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(PEN_COLORS.main);
    },
  };

  Blockly.Blocks['pen_setcolor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('set pen color to')
        .appendField(new Blockly.FieldTextInput('#ff0000'), 'COLOR');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(PEN_COLORS.main);
    },
  };
}
