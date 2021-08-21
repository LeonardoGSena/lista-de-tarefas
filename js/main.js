
const Main = {

    tasks: [],

    init: function () {
        this.cacheSelectors();
        this.bindEvents();
        this.getStoraged();
        this.buildTasks();
    },

    cacheSelectors: function () {
        this.$checkButtons = document.querySelectorAll('.check');
        this.$inputTask = document.querySelector('#inputTask');
        this.$list = document.querySelector('#list');
        this.$removeButtons = document.querySelectorAll('.remove');
    },

    bindEvents: function () {
        const self = this;

        this.$checkButtons.forEach(button => {
            button.onclick = self.Events.checkButton_click;
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypresss.bind(this);

        this.$removeButtons.forEach(button => {
            button.onclick = self.Events.removeButton_click.bind(self);
        })
    },

    getStoraged: function () {
        const tasks = localStorage.getItem('tasks');
        this.tasks = JSON.parse(tasks);
    },

    getTaskHTML: (task) =>
        `
        <li>
            <div class="check"></div>
            <label class="task">
                ${task}
            </label>
            <button class="remove" data-task="${task}"></button>
        </li>
    `
    ,

    buildTasks: function () {
        let html = '';

        this.tasks.forEach(item => {
            html += this.getTaskHTML(item.task)
        })

        this.$list.innerHTML = html;

        this.cacheSelectors();
        this.bindEvents();
    },

    Events: {
        checkButton_click: function (e) {
            const li = e.target.parentElement;
            const isDone = li.classList.contains('done')

            return (!isDone ? li.classList.add('done') : li.classList.remove('done'));
        },

        inputTask_keypresss: function (e) {
            const key = e.key;
            const value = e.target.value;


            if (key === 'Enter') {
                this.$list.innerHTML += this.getTaskHTML(value);

                e.target.value = '';

                const savedTasks = localStorage.getItem('tasks');
                const savedTasksObj = JSON.parse(savedTasks);

                const obj = [
                    { task: value },
                    ...savedTasksObj
                ]

                localStorage.setItem('tasks', JSON.stringify(obj));
            }
        },

        removeButton_click: function (e) {
            const li = e.target.parentElement;
            const value = e.target.dataset['task'];


            const newTasksState = this.tasks.filter(item => item.task !== value);
            console.log(newTasksState);


            localStorage.setItem('tasks', JSON.stringify(newTasksState));

            li.classList.add('removed');

            setTimeout(() => {
                li.classList.add('hidden')
            }, 300);
        }

    }
}

Main.init();

