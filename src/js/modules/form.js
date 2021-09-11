import $ from 'jquery';
import validator from 'validator';

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
    // let formData = new FormData(myForm);
    // fetch('/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams(formData).toString(),
    // }).catch((error) => alert(error));
    // myForm.classList.add('disappear');
    // $('p.thanks').addClass('appear');
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
