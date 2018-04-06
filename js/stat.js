'use strict';
var fillRect = {
  width: 420,
  height: 270,
  left: 100,
  top: 10,
  shadowOffest: 10
};

var bar = {
  width: 40,
  Height: 150,
  indent: 90,
  maxHeight: 120,
  left: 150,
  top: 240,
  lineHeight: 20,
  colorText: '#000',
};

var renderRect = function (context, coord, fill) {
  context.fillStyle = fill;
  context.fillRect(coord.left, coord.top, coord.width, coord.height);
};
var renderText = function (context, textStyle) {
  context.fillStyle = textStyle.color;
  context.font = textStyle.font;
  context.fillText(textStyle.text, textStyle.left, textStyle.top);
};
var getOpacity = function (min, max) {
  return min - 0.5 + Math.random() * (max - min + 1);
};
window.renderStatistics = function (ctx, names, times) {
  var color;
  renderRect(ctx, {
    left: fillRect.left + fillRect.shadowOffest,
    top: fillRect.top + fillRect.shadowOffest,
    width: fillRect.width,
    height: fillRect.height
  }, '#000');
  renderRect(ctx, fillRect, 'rgba(255,255,255, 1)');
  renderText(ctx, {
    color: '#000',
    font: '16px PT Mono',
    text: 'Ура вы победили!',
    left: fillRect.left + 20,
    top: fillRect.top + 30
  });
  renderText(ctx, {
    color: '#000',
    font: '16px PT Mono',
    text: 'Список результатов:',
    left: fillRect.left + 20,
    top: fillRect.top + 30 + bar.lineHeight
  });
  for (var i = 0; i < names.length; i++) {
    color = names[i].toLowerCase() === 'вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255,' + getOpacity(0.65, 1) + ')';
    renderRect(ctx, {
      left: bar.left + bar.indent * i,
      top: bar.top,
      width: bar.width,
      height: -times[i] / Math.max.apply(null, times) * bar.maxHeight
    }, color);
    renderText(ctx, {
      color: '#000',
      font: '16px PT Mono',
      text: names[i],
      left: bar.left + bar.indent * i,
      top: bar.top + bar.lineHeight
    });
    renderText(ctx, {
      color: '#000',
      font: '16px PT Mono',
      text: Math.floor(times[i]),
      left: bar.left + bar.indent * i,
      top: bar.top - times[i] / Math.max.apply(null, times) * bar.maxHeight - bar.lineHeight
    });
  }
};
