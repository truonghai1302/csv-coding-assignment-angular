import { Task, User } from 'src/app/backend.service';

export const DETAILS_STATE_NAME = 'Details';

export type DetailsStateModel = {
  task: Task;
};

export const DETAILS_INITIAL_STATE: DetailsStateModel = {
  task: null
};