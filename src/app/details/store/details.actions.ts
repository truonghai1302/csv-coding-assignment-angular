import { DETAILS_STATE_NAME as STATE_NAME } from './index';
import { Task } from 'src/app/backend.service';

const ACTIONS = {
  LOAD_EDIT_TASK: `[${STATE_NAME}] LOAD EDIT TASK`,
  UPDATE_TASK: `[${STATE_NAME}] GET TASK`,
  RESET_STATE: `[${STATE_NAME}] RESET_STATE`,
};


export class LoadEditTask {
  static readonly type = ACTIONS.LOAD_EDIT_TASK;
  constructor(public readonly task: Task) {}
}

export class UpdateTask {
  static readonly type = ACTIONS.UPDATE_TASK;
  constructor(public readonly payload: Task) {}
}

export class ResetDetailsState {
  static readonly type = ACTIONS.RESET_STATE;
}