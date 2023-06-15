class Tasks {
  constructor() {
    this.inputTask = document.querySelector(".input-task");
    this.allTaskWrp = document.querySelector(".all-task-wrp");
    this.pinTask = document.querySelector(".pin-task");
    this.tasDef = document.querySelector(".task-def");
  }

  newTask() {
    this.inputTask.addEventListener("keyup", (event) => {
      event.preventDefault();
      let target = event.target;
      this.inputValue = target.value.toLowerCase();
      this.sort(this.inputValue);
      if (event.keyCode === 13 && this.inputValue != "") {
        this.addTask(this.inputValue);
        event.target.value = "";
      }
    });
  }

  addTask(task) {
    if (typeof task !== "undefined") {
      this.divAllTaskItem = document.createElement("div"); //div
      this.divAllTaskItem.classList.add("all-task-item");

      let taskText = document.createElement("p");
      taskText.textContent = `${task}`;
      taskText.classList.add("icon");
      let divP = document.createElement("img");
      divP.src = "https://img.icons8.com/badges/20/add.png";
      divP.classList.add("task");

      this.divAllTaskItem.appendChild(taskText);
      this.divAllTaskItem.appendChild(divP);
      this.divAllTaskItem.setAttribute(
        "style",
        "width:100%; height:30px;box-sizing:border-box; color:red; border: 1px solid blue;margin:5px auto;display:flex;justify-content:space-between;padding:5px; align-items:center;"
      );
      this.allTaskWrp.appendChild(this.divAllTaskItem);
    }
  }
  pinned() {
    this.wrpListen = document
      .querySelector(".wrp")
      .addEventListener("click", (event) => {
        event = event.target;
        let parent = event.parentElement;
        let parpar = parent.parentElement;

        if (parpar.classList.contains("all-task-wrp")) {
          this.allTaskWrp.removeChild(parent);
          this.pinTask.appendChild(parent);
        }
        if (parpar.classList.contains("pin-task")) {
          this.pinTask.removeChild(parent);
          this.allTaskWrp.appendChild(parent);
        }

        if (this.pinTask.childElementCount > 1) {
          this.tasDef.remove();
        } else {
          this.pinTask.appendChild(this.tasDef);
        }
      });
  }

  sort(value) {
    let arrChildren = [...this.allTaskWrp.children];
    for (let i = 0; i < arrChildren.length; i++) {
      if (arrChildren[i].firstElementChild.textContent.startsWith(value)) {
        this.allTaskWrp.insertBefore(arrChildren[i], arrChildren[0]);
      } else {
        this.inputTask.placeholder = "No tasks found";
      }
    }
  }
}

new Tasks().newTask();
new Tasks().addTask();
new Tasks().pinned();
new Tasks().sort();
