import '../sass/style.sass';
import $ from 'jquery';
import emergence from 'emergence.js';
import SmoothScroll from 'smooth-scroll';
import { init } from 'ityped';
import validator from 'validator';
import particlesJS from './modules/particles.min.js';

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
window.onload = function () {
  const myForm = document.getElementById('contact-form');
  myForm.addEventListener('submit', handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();
    let type = myForm.elements[0];
    let name = myForm.elements[2];
    let email = myForm.elements[3];
    let contents = myForm.elements[5];
    if (validator.equals(type.value, '未選択')) {
      type.parentNode.nextElementSibling.textContent =
        'ご用件の選択をお願いいたします。';
      type.parentNode.nextElementSibling.style.color = 'red';
      type.style.borderColor = 'red';
    }
    // else {
    //   type.parentNode.nextElementSibling.textContent = '';
    //   type.style.borderColor = '#404040';
    // }
    if (validator.isEmpty(name.value)) {
      name.nextElementSibling.textContent =
        'お名前の欄は必須となっております。';
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
      console.log('success');
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => console.log('Form successfully submitted'))
        .catch((error) => alert(error));
    } else {
      $('html,body').animate({
        scrollTop: $('#contact-form').offset().top - 80,
      });
    }
  }
};

// パーティクル(MV)
window.particlesJS(
  'mv',
  {
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#1b1e34',
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
        },
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 4,
        random: false,
        anim: {
          enable: true,
          speed: 10,
          size_min: 80,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 400,
        color: '#ffffff',
        opacity: 1,
        width: 2,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'bounce',
        attract: {
          enable: true,
          rotateX: 1500,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'repulse',
        },
        onclick: {
          enable: false,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  },
  function () {
    console.log('callback - particles.js config loaded');
  }
);
