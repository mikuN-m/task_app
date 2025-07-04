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


//タスクページ
const $taskAddBtn = document.getElementById('js-add-btn');
const $taskHidden = document.getElementById('js-task-hidden');

$taskAddBtn.addEventListener('click',()=>{
  document.getElementById('js-task-add-container').style.display = "block";
});
$taskHidden.addEventListener('click',()=> {
  document.getElementById('js-task-add-container').style.display = "none";
})

const $taskDelete = document.getElementById('js-delete-btn');
const $taskDeleteHidden = document.getElementById('task-delete-hidden');

$taskDelete.addEventListener('click',()=>{
  document.getElementById('task-delete').style.display = 'block';
  document.getElementById('task-all').style.display = 'none';
});
$taskDeleteHidden.addEventListener('click',()=> {
  document.getElementById('task-delete').style.display = 'none';
  document.getElementById('task-all').style.display = 'block';

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
})