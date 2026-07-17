import * as Blockly from 'blockly/core';

export const THREE_COLORS = {
  main: '#4287f5'
};

export function registerThreeBlocks() {
  Blockly.Blocks['three_createcube'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('create 3D cube');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(THREE_COLORS.main);
    },
  };

  Blockly.Blocks['three_rotate'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('rotate 3D object by')
        .appendField(new Blockly.FieldNumber(1, 0), 'DEGREES')
        .appendField('degrees on')
        .appendField(new Blockly.FieldDropdown([['x-axis', 'X'], ['y-axis', 'Y'], ['z-axis', 'Z']]), 'AXIS');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(THREE_COLORS.main);
    },
  };
}
