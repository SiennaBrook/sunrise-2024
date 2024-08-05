import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  if (tasks.length > 0) {
    tasks.forEach(task => task.completed = true); // Mark all tasks as completed initially
    tasks[0].completed = false; // Only the first task is active initially
  }
}

export function getActiveTasks(): Task[] {
  const highestCompletedGroup = Math.max(0, ...tasks.filter(task => task.completed).map(task => task.group));
  return tasks.filter(task => !task.completed && task.group <= highestCompletedGroup + 1);
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const taskIndex = tasks.findIndex(task => task.title === taskTitle);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;

    // Unlock the next task in the same group
    const nextTaskInGroupIndex = tasks.findIndex((task, index) => index > taskIndex && task.group === tasks[taskIndex].group);
    if (nextTaskInGroupIndex !== -1) {
      tasks[nextTaskInGroupIndex].completed = false;
    } else {
      // If no more tasks in the current group, unlock the first task in the next group
      const nextGroupIndex = tasks.findIndex(task => task.group === tasks[taskIndex].group + 1);
      if (nextGroupIndex !== -1) {
        tasks[nextGroupIndex].completed = false;
      }
    }
  }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask = new Task(
    tasks.length + 1,
    title,
    description,
    persona,
    group,
    false // New tasks start as not completed
  );
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
