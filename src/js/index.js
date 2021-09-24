import '../sass/style.sass';
import $ from 'jquery';
import emergence from 'emergence.js';
import SmoothScroll from 'smooth-scroll';
import { init } from 'ityped';
import 'particles.js';
import './modules/form.js';
import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    googleAnalytics({
      trackingId: 'G-S8BSCPYMQT',
    }),
  ],
});

analytics.page();

// pace.start({});

// スクロールアニメーション
emergence.init({
  reset: false,
  offsetTop: 100,
});

// スムーススクロール
var scroll = new SmoothScroll('a[href*="#"]', {
  header: null,
  easing: 'easeInOutCubic',
  speed: 800,
  header: '#header',
  speedAsDuration: true,
});

// タイピングアニメーション(MV)
const mvText = document.querySelector('#mv-text');
const mvText2 = document.querySelector('#mv-text-2');
const mvText3 = document.querySelector('#mv-text-3');
init(mvText, {
  strings: ['こんにちは、世界。'],
  typeSpeed: 200,
  startDelay: 1000,
  showCursor: false,
  disableBackTyping: true,
  onFinished: function () {
    mvText.classList.add('disappear');
  },
});
init(mvText2, {
  strings: [
    '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Yusaku Shibata Portfolio</title>\n<script defer src="js/bundle.js"></script>\n</head>\n<body id="top">\n<header id="header">\n<div class="inner">\n<h1><a href="#top">Yusaku Shibata</a></h1>\n<nav>\n<ul>\n<li><a data-scroll href="#skill">できること</a></li>\n<li><a data-scroll href="#policy">制作物へのお約束</a></li>......',
  ],
  typeSpeed: 30,
  startDelay: 6000,
  showCursor: false,
  disableBackTyping: true,
  onFinished: function () {
    mvText2.classList.add('disappear');
  },
});
init(mvText3, {
  strings: [
    'こちらは\nフロントエンドエンジニア\n柴田裕朔の\nポートフォリオサイト\nです🙇‍♂️',
  ],
  typeSpeed: 200,
  startDelay: 25000,
  showCursor: false,
  disableBackTyping: true,
});

// 円形配置(技術スタック)
$(function () {
  var item_num = $('.bubbles .round h5').length;
  var deg = 360.0 / item_num;
  var red = (deg * Math.PI) / 180.0;
  var circle_r = $('.bubbles .round h5').width() * 2.5;
  var circle_half = $('.bubbles .round h5').width() * 0.5;
  $('.bubbles .round h5').each(function (i, elem) {
    var x = Math.cos(red * i) * circle_r - circle_half;
    var y = Math.sin(red * i) * circle_r - circle_half;
    $(elem).css('left', x);
    $(elem).css('top', y);
  });
});
$(function () {
  var item_num = $('.bubbles .center h5').length;
  var deg = 360.0 / item_num;
  var red = (deg * Math.PI) / 180.0;
  var circle_r = $('.bubbles .center h5').width() * 0.58;
  var circle_half = $('.bubbles .center h5').width() * 0.5;
  $('.bubbles .center h5').each(function (i, elem) {
    var x = Math.cos(red * i) * circle_r - circle_half;
    var y = Math.sin(red * i) * circle_r - circle_half;
    $(elem).css('left', x);
    $(elem).css('top', y);
  });
});

// パーティクル(MV)
particlesJS('mv', require('./particlesjs-config.json'), function () {
  console.log('callback - particles.js config loaded');
});

// ハンバーガー
const hamBtn = document.getElementById('ham-btn');
const hamMenu = document.getElementById('ham-menu');
hamBtn.addEventListener('click', () => {
  if (hamMenu.classList.contains('show')) {
    hamBtn.classList.remove('show');
    hamMenu.classList.remove('show');
  } else {
    hamBtn.classList.add('show');
    hamMenu.classList.add('show');
  }
});
$('#ham-menu a').on('click', () => {
  hamBtn.classList.remove('show');
  hamMenu.classList.remove('show');
});
