import { javascriptGenerator, Order } from 'blockly/javascript';

export function registerGenerators() {
  // Control Blocks
  javascriptGenerator.forBlock['control_wait'] = function (block, generator) {
    const duration = generator.valueToCode(block, 'DURATION', Order.ATOMIC) || 0;
    return `await new Promise(resolve => setTimeout(resolve, ${duration} * 1000));\n`;
  };

  javascriptGenerator.forBlock['control_repeat'] = function (block, generator) {
    const times = generator.valueToCode(block, 'TIMES', Order.ATOMIC) || 0;
    let branch = generator.statementToCode(block, 'SUBSTACK');
    branch = generator.addLoopTrap(branch, block) || branch;
    return `for (let i = 0; i < ${times}; i++) {\n${branch}  await new Promise(r => setTimeout(r, 16));\n}\n`;
  };

  javascriptGenerator.forBlock['control_forever'] = function (block, generator) {
    let branch = generator.statementToCode(block, 'SUBSTACK');
    branch = generator.addLoopTrap(branch, block) || branch;
    return `while (true) {\n${branch}  await new Promise(r => setTimeout(r, 16));\n}\n`;
  };

  javascriptGenerator.forBlock['control_if'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE) || 'false';
    const branch = generator.statementToCode(block, 'SUBSTACK');
    return `if (${condition}) {\n${branch}}\n`;
  };

  javascriptGenerator.forBlock['control_if_else'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE) || 'false';
    const branch1 = generator.statementToCode(block, 'SUBSTACK');
    const branch2 = generator.statementToCode(block, 'SUBSTACK2');
    return `if (${condition}) {\n${branch1}} else {\n${branch2}}\n`;
  };

  javascriptGenerator.forBlock['control_wait_until'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE) || 'false';
    return `while (!(${condition})) {\n  await new Promise(r => setTimeout(r, 16));\n}\n`;
  };

  javascriptGenerator.forBlock['control_repeat_until'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE) || 'false';
    let branch = generator.statementToCode(block, 'SUBSTACK');
    branch = generator.addLoopTrap(branch, block) || branch;
    return `while (!(${condition})) {\n${branch}  await new Promise(r => setTimeout(r, 16));\n}\n`;
  };

  javascriptGenerator.forBlock['control_stop'] = function () {
    return 'return;\n';
  };

  javascriptGenerator.forBlock['event_whenflagclicked'] = function () {
    return "";
  };

  javascriptGenerator.forBlock['motion_movesteps'] = function (block, generator) {
    const steps = generator.valueToCode(block, 'STEPS', Order.ATOMIC) || 0;
    return `await spriteAPI.moveSteps(${steps});\n`;
  };

  javascriptGenerator.forBlock['motion_turnright'] = function (block, generator) {
    const degrees = generator.valueToCode(block, 'DEGREES', Order.ATOMIC) || 0;
    return `await spriteAPI.turnRight(${degrees});\n`;
  };

  javascriptGenerator.forBlock['motion_turnleft'] = function (block, generator) {
    const degrees = generator.valueToCode(block, 'DEGREES', Order.ATOMIC) || 0;
    return `await spriteAPI.turnLeft(${degrees});\n`;
  };

  javascriptGenerator.forBlock['motion_goto'] = function (block) {
    const dest = block.getFieldValue('TO');
    return `await spriteAPI.goTo('${dest}');\n`;
  };

  javascriptGenerator.forBlock['motion_gotoxy'] = function (block, generator) {
    const x = generator.valueToCode(block, 'X', Order.ATOMIC) || 0;
    const y = generator.valueToCode(block, 'Y', Order.ATOMIC) || 0;
    return `await spriteAPI.goToXY(${x}, ${y});\n`;
  };

  javascriptGenerator.forBlock['motion_glidesecstoxy'] = function (block, generator) {
    const secs = generator.valueToCode(block, 'SECS', Order.ATOMIC) || 0;
    const x = generator.valueToCode(block, 'X', Order.ATOMIC) || 0;
    const y = generator.valueToCode(block, 'Y', Order.ATOMIC) || 0;
    return `await spriteAPI.glideToXY(${secs}, ${x}, ${y});\n`;
  };

  javascriptGenerator.forBlock['motion_set_xyz'] = function (block, generator) {
    const x = generator.valueToCode(block, 'X', Order.ATOMIC) || '0';
    const y = generator.valueToCode(block, 'Y', Order.ATOMIC) || '0';
    const z = generator.valueToCode(block, 'Z', Order.ATOMIC) || '0';
    return `await spriteAPI.setXYZ(${x}, ${y}, ${z});\n`;
  };

  // 3D Blocks
  javascriptGenerator.forBlock['three_createcube'] = function () {
    return `await spriteAPI.create3DCube();\n`;
  };

  javascriptGenerator.forBlock['three_rotate'] = function (block) {
    const degrees = block.getFieldValue('DEGREES');
    const axis = block.getFieldValue('AXIS');
    return `await spriteAPI.rotate3D(${degrees}, '${axis}');\n`;
  };

  // Pen Blocks
  javascriptGenerator.forBlock['pen_clear'] = function () {
    return `await spriteAPI.penClear();\n`;
  };
  javascriptGenerator.forBlock['pen_down'] = function () {
    return `await spriteAPI.penDown();\n`;
  };
  javascriptGenerator.forBlock['pen_up'] = function () {
    return `await spriteAPI.penUp();\n`;
  };
  javascriptGenerator.forBlock['pen_setcolor'] = function (block) {
    const color = block.getFieldValue('COLOR');
    return `await spriteAPI.setPenColor('${color}');\n`;
  };

  // AI Blocks
  javascriptGenerator.forBlock['ai_ask'] = function (block, generator) {
    const question = generator.valueToCode(block, 'QUESTION', Order.ATOMIC) || "''";
    return [`await spriteAPI.askAI(${question})`, Order.NONE];
  };
  javascriptGenerator.forBlock['ai_sentiment'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || "''";
    return [`await spriteAPI.analyzeSentiment(${text})`, Order.NONE];
  };
  // Sensing Blocks
  javascriptGenerator.forBlock['sensing_touchingobject'] = function (block) {
    const obj = block.getFieldValue('TOUCHINGOBJECTMENU');
    return [`await spriteAPI.touchingObject('${obj}')`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_touchingcolor'] = function (block) {
    const color = block.getFieldValue('COLOR');
    return [`await spriteAPI.touchingColor('${color}')`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_distanceto'] = function (block) {
    const menu = block.getFieldValue('DISTANCETOMENU');
    return [`await spriteAPI.distanceTo('${menu}')`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_askandwait'] = function (block, generator) {
    const question = generator.valueToCode(block, 'QUESTION', Order.ATOMIC) || "''";
    return `await spriteAPI.askAndWait(${question});\n`;
  };
  javascriptGenerator.forBlock['sensing_answer'] = function () {
    return [`await spriteAPI.getAnswer()`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_keypressed'] = function (block) {
    const key = block.getFieldValue('KEY_OPTION');
    return [`await spriteAPI.keyPressed('${key}')`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_mousedown'] = function () {
    return [`await spriteAPI.mouseDown()`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_mousex'] = function () {
    return [`await spriteAPI.mouseX()`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_mousey'] = function () {
    return [`await spriteAPI.mouseY()`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_setdragmode'] = function (block) {
    const mode = block.getFieldValue('DRAG_MODE');
    return `await spriteAPI.setDragMode('${mode}');\n`;
  };
  javascriptGenerator.forBlock['sensing_loudness'] = function () {
    return [`await spriteAPI.getLoudness()`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_timer'] = function () {
    return [`await spriteAPI.getTimer()`, Order.NONE];
  };
  javascriptGenerator.forBlock['sensing_resettimer'] = function () {
    return `await spriteAPI.resetTimer();\n`;
  };
}
