document.addEventListener('DOMContentLoaded', loadTasks);
function addTask() {
   const taskInput = document.getElementById('newTask');
   const dateInput = document.getElementById('taskDate');
   const task = taskInput.value.trim();
   const date = dateInput.value;
   if (task.length < 3 || task.length > 255) {
       alert('Task must be between 3 and 255 characters.');
       return;
   }
   if (date && new Date(date) < new Date()) {
       alert('The date must be in the future.');
       return;
   }
   const tasks = getTasks();
   tasks.push({ text: task, date });
   saveTasks(tasks);
   displayTasks(tasks);
   taskInput.value = '';
   dateInput.value = '';
}
function getTasks() {
   return JSON.parse(localStorage.getItem('tasks') || '[]');
}
function saveTasks(tasks) {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
   displayTasks(getTasks());
}
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    const searchQuery = document.getElementById('search').value.toLowerCase();
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        // Highlight the search term in the task text using a span
        const highlightedText = highlightSearch(task.text, searchQuery);
        const textSpan = document.createElement('span');
        textSpan.innerHTML = highlightedText;
        textSpan.className = 'task-text';
        textSpan.onclick = () => startEditingText(textSpan, index);
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.value = task.date || '';
        dateInput.onblur = () => saveEdit(index, 'date', dateInput);
        dateInput.onfocus = () => startEditing(dateInput);
        dateInput.className = 'date-input';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        listItem.appendChild(textSpan);
        listItem.appendChild(dateInput);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
 }
 function startEditingText(textSpan, index) {
    const tasks = getTasks();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = tasks[index].text;
    input.className = 'task-input';
    input.onblur = () => saveEdit(index, 'text', input);
    input.onfocus = () => startEditing(input);
    textSpan.replaceWith(input);
    input.focus();
 }
function deleteTask(index) {
   const tasks = getTasks();
   tasks.splice(index, 1);
   saveTasks(tasks);
   displayTasks(tasks);
}
function editTask(index) {
   const tasks = getTasks();
   const task = tasks[index];
   const newTask = prompt('Edit your task:', task.text);
   if (newTask !== null && newTask.trim().length >= 3 && newTask.trim().length <= 255) {
       task.text = newTask.trim();
       saveTasks(tasks);
       displayTasks(tasks);
   }
}
function editDate(index) {
   const tasks = getTasks();
   const task = tasks[index];
   const newDate = prompt('Edit the date (YYYY-MM-DD):', task.date || '');
   if (newDate !== null && (new Date(newDate) >= new Date() || newDate === '')) {
       task.date = newDate;
       saveTasks(tasks);
       displayTasks(tasks);
   } else {
       alert('The date must be in the future or empty.');
   }
}
function filterTasks() {
   const searchQuery = document.getElementById('search').value.toLowerCase();
   const tasks = getTasks();
   const filteredTasks = tasks.filter(task =>
       task.text.toLowerCase().includes(searchQuery)
   );
   displayTasks(filteredTasks);
}
function highlightSearch(text) {
   const searchQuery = document.getElementById('search').value;
   if (searchQuery.length < 2) return text;
   const regex = new RegExp(`(${searchQuery})`, 'gi');
   return text.replace(regex, '<span class="highlight">$1</span>');
}
function saveEdit(index, field, inputElement) {
   const tasks = getTasks();
   if (field === 'text') {
       const newText = inputElement.value.trim();
       if (newText.length >= 3 && newText.length <= 255) {
           tasks[index].text = newText;
       } else {
           alert('Task must be between 3 and 255 characters.');
       }
   } else if (field === 'date') {
       const newDate = inputElement.value;
       if (!newDate || new Date(newDate) >= new Date()) {
           tasks[index].date = newDate;
       } else {
           alert('The date must be in the future.');
       }
   }
   saveTasks(tasks);
   displayTasks(tasks);
}