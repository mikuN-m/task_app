//タスク構築
document.getElementById('loadBtn').addEventListener('click', () => {
  fetch('/task_adjust')
    .then(res => res.json())
    .then(plan => {
      const ul = document.getElementById('planList');
      ul.innerHTML = '';
      plan.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.name}`;
        ul.appendChild(li);
    });
  });
});