import '../sass/style.sass';
import $ from 'jquery';
import emergence from 'emergence.js';
import SmoothScroll from 'smooth-scroll';
import { init } from 'ityped';
import validator from 'validator';
import 'particles.js';

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

// フォーム
const myForm = document.getElementById('contact-form');
myForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let type = myForm.elements[1];
  let name = myForm.elements[3];
  let email = myForm.elements[4];
  let contents = myForm.elements[6];
  if (validator.equals(type.value, '未選択')) {
    type.parentNode.nextElementSibling.textContent =
      'ご用件の選択をお願いいたします。';
    type.parentNode.nextElementSibling.style.color = 'red';
    type.style.borderColor = 'red';
  } else {
    type.parentNode.nextElementSibling.textContent = '';
    type.style.borderColor = '#404040';
  }
  if (validator.isEmpty(name.value)) {
    name.nextElementSibling.textContent = 'お名前の欄は必須となっております。';
    name.nextElementSibling.style.color = 'red';
    name.style.borderColor = 'red';
  } else {
    name.nextElementSibling.textContent = '例：鈴木 太郎';
    name.nextElementSibling.style.color = '#404040';
    name.style.borderColor = '#404040';
  }
  if (validator.isEmpty(email.value)) {
    email.nextElementSibling.textContent =
      'メールアドレスの欄は必須となっております。';
    email.nextElementSibling.style.color = 'red';
    email.style.borderColor = 'red';
  } else if (!validator.isEmail(email.value)) {
    email.nextElementSibling.textContent =
      '正しいメールアドレスをご入力お願いいたします。';
    email.nextElementSibling.style.color = 'red';
    email.style.borderColor = 'red';
  } else {
    email.nextElementSibling.textContent = '例：example@email.jp';
    email.nextElementSibling.style.color = '#404040';
    email.style.borderColor = '#404040';
  }
  if (validator.isEmpty(contents.value)) {
    contents.nextElementSibling.textContent =
      'お問い合わせ内容のご入力をお願いいたします。';
    contents.nextElementSibling.style.color = 'red';
    contents.style.borderColor = 'red';
  } else {
    contents.nextElementSibling.textContent = '';
    contents.style.borderColor = '#404040';
  }

  if (
    !validator.equals(type.value, '未選択') &&
    !validator.isEmpty(name.value) &&
    !validator.isEmpty(email.value) &&
    validator.isEmail(email.value) &&
    !validator.isEmpty(contents.value)
  ) {
    let formData = new FormData(myForm);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    }).catch((error) => alert(error));
    myForm.classList.add('disappear');
    $('p.thanks').addClass('appear');
    $('html,body')
      .delay(1500)
      .animate({
        scrollTop: $('#contact').offset().top - 80,
      });
  } else {
    $('html,body').animate({
      scrollTop: $('#contact-form').offset().top - 80,
    });
  }
}

// パーティクル(MV)
particlesJS('mv', require('./particlesjs-config.json'), function () {
  console.log('callback - particles.js config loaded');
});
