document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const filterAll = document.getElementById('filter-all');
    const filterCompleted = document.getElementById('filter-completed');
    const filterPending = document.getElementById('filter-pending');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const renderTasks = (filter = 'all') => {
      taskList.innerHTML = '';
      let filteredTasks = tasks;
  
      if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
      } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
      }
  
      filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-800', 'p-4', 'rounded-lg', 'mb-2', 'transition', 'hover:bg-gray-700');
        taskItem.innerHTML = `
          <span class="${task.completed ? 'line-through text-gray-500' : ''}">${task.text}</span>
          <div class="flex space-x-2">
            <button class="text-green-500 hover:text-green-600" onclick="toggleComplete(${index})">✔️</button>
            <button class="text-red-500 hover:text-red-600" onclick="deleteTask(${index})">❌</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
    };
  
    const addTask = () => {
      if (taskInput.value.trim() === '') return;
      tasks.push({ text: taskInput.value.trim(), completed: false });
      taskInput.value = '';
      saveTasks();
      renderTasks();
    };
  
    const toggleComplete = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    const deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    filterAll.addEventListener('click', () => renderTasks('all'));
    filterCompleted.addEventListener('click', () => renderTasks('completed'));
    filterPending.addEventListener('click', () => renderTasks('pending'));
  
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  
    renderTasks();
  });
  