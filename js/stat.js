'use strict';

var fillRect = {
  WIDTH: 420,
  HEIGHT: 270,
  LEFT: 100,
  TOP: 10,
  SHADOW_OFFEST: 10
};

var bar = {
  WIDTH: 40,
  HEIGHT: 150,
  INDENT: 90,
  MAX_HEIGHT: 120,
  LEFT: 150,
  TOP: 240,
  LINE_HEIGHT: 20,
  COLOR_TEXT: '#000',
  YOUR: 'вы'
};

var renderRect = function (context, coord, fill) {
  context.fillStyle = fill;
  context.fillRect(coord.LEFT, coord.TOP, coord.WIDTH, coord.HEIGHT);
};
var renderText = function (context, textStyle) {
  context.fillStyle = textStyle.color;
  context.font = textStyle.font;
  context.fillText(textStyle.text, textStyle.LEFT, textStyle.TOP);
};
var getOpacity = function (min, max) {
  return min - 0.5 + Math.random() * (max - min + 1);
};
window.renderStatistics = function (ctx, names, times) {
  var color;
  renderRect(ctx, {
    LEFT: fillRect.LEFT + fillRect.SHADOW_OFFEST,
    TOP: fillRect.TOP + fillRect.SHADOW_OFFEST,
    WIDTH: fillRect.WIDTH,
    HEIGHT: fillRect.HEIGHT
  }, '#000');
  renderRect(ctx, fillRect, 'rgba(255,255,255, 1)');
  renderText(ctx, {
    color: '#000',
    font: '16px PT Mono',
    text: 'Ура вы победили!',
    LEFT: fillRect.LEFT + 20,
    TOP: fillRect.TOP + 30
  });
  renderText(ctx, {
    color: '#000',
    font: '16px PT Mono',
    text: 'Список результатов:',
    LEFT: fillRect.LEFT + 20,
    TOP: fillRect.TOP + 30 + bar.LINE_HEIGHT
  });
  for (var i = 0; i < names.length; i++) {
    color = names[i].toLowerCase() === bar.YOUR ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255,' + getOpacity(0.65, 1) + ')';
    renderRect(ctx, {
      LEFT: bar.LEFT + bar.INDENT * i,
      TOP: bar.TOP,
      WIDTH: bar.WIDTH,
      HEIGHT: (-times[i] / Math.max.apply(null, times)) * bar.MAX_HEIGHT
    }, color);
    renderText(ctx, {
      color: '#000',
      font: '16px PT Mono',
      text: names[i],
      LEFT: bar.LEFT + bar.INDENT * i,
      TOP: bar.TOP + bar.LINE_HEIGHT
    });
    renderText(ctx, {
      color: '#000',
      font: '16px PT Mono',
      text: Math.floor(times[i]),
      LEFT: bar.LEFT + bar.INDENT * i,
      TOP: bar.TOP - times[i] / Math.max.apply(null, times) * bar.MAX_HEIGHT - bar.LINE_HEIGHT
    });
  }
};

