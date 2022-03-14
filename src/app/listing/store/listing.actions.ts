import { LISTING_STATE_NAME as STATE_NAME } from './listing-state.model';
import { Task, User } from 'src/app/backend.service';

const ACTIONS = {
  GET_TASKS: `[${STATE_NAME}] GET TASKS`,
  GET_USERS: `[${STATE_NAME}] GET USERS`,
  COMPLETE_TASK: `[${STATE_NAME}] COMPLETE TASK`,
  NEW_TASK: `[${STATE_NAME}] NEW TASK`,
  UPDATE_TASK_IN_LIST: `[${STATE_NAME}] UPDATE TASK IN LIST`,
};

export class GetTasks {
  static readonly type = ACTIONS.GET_TASKS;
  constructor(public readonly tasks: Task[]) {}
}

export class GetUsers {
  static readonly type = ACTIONS.GET_USERS;
  constructor(public readonly users: User[]) {}
}

export class CompleteTask {
  static readonly type = ACTIONS.COMPLETE_TASK;
  constructor(public readonly taskId: number, public readonly completed: boolean) {}
}

export class NewTask {
  static readonly type = ACTIONS.NEW_TASK;
  constructor(public readonly newTask: Task) {}
}

export class UpdateTaskInList {
  static readonly type = ACTIONS.UPDATE_TASK_IN_LIST;
  constructor(public readonly newTask: Task) {}
}