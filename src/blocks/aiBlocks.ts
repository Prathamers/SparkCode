import * as Blockly from 'blockly/core';

export const AI_COLORS = {
  main: '#a855f7'
};

export function registerAiBlocks() {
  Blockly.Blocks['ai_ask'] = {
    init: function () {
      this.appendValueInput('QUESTION')
          .setCheck('String')
          .appendField('ask AI');
      this.setOutput(true, 'String');
      this.setColour(AI_COLORS.main);
    },
  };

  Blockly.Blocks['ai_sentiment'] = {
    init: function () {
      this.appendValueInput('TEXT')
          .setCheck('String')
          .appendField('analyze sentiment of');
      this.setOutput(true, 'String');
      this.setColour(AI_COLORS.main);
    },
  };
}
