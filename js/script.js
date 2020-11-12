'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage(){
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);

    if (todo.completed){
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
    // console.log(todo);
    // console.log(li.key);
  }

  addTodo(e){
    e.preventDefault();

    while (this.input.value === ''){
      alert('Пустая строка в список дел не добавляется!');
      return;
    }

    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.input.value = '';
      this.render();
    }
  }

  generateKey() {
    return Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(target){
    target = target.closest('.todo-item');
    this.todoData.delete(target.key);
    // this.addToStorage();
    this.render();
  }

  completedItem(target){
    target = target.closest('.todo-item');
    this.todoData.forEach((todoElem) => {
      if (todoElem.key === target.key) {
        todoElem.completed = !todoElem.completed;
      }
    });
    this.render(); 
  }

  handler(){
    const todoContainer = document.querySelector('.todo-container');
    todoContainer.addEventListener('click', (event) => {
      let target = event.target;
      // console.log(target.closest('.todo-item'));
      // console.log(target.closest('.todo-item').key);
      if (target.matches('.todo-remove')) {
        this.deleteItem(target);
      } else if (target.matches('.todo-complete')) {
        this.completedItem(target);
      }
    });
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.handler();
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();