//ログインページ
const $login = document.getElementById('login');
const $signIn = document.getElementById('signIn');
const $loginToggle = document.getElementById('toggle-login');
const $signInToggle = document.getElementById('toggle-signIn');

$loginToggle.addEventListener('click',()=>{
  $login.style.display = 'block';
  $signIn.style.display = 'none';
});
$signInToggle.addEventListener('click',()=>{
  $signIn.style.display = 'block';
  $login.style.display = 'none';
});
