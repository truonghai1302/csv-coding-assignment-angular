import { Task, User } from 'src/app/backend.service';

export const LISTING_STATE_NAME = 'Listing';

export type ListingStateModel = {
  tasks: Task[]
  users: User[];
};

export const LISTING_INITIAL_STATE: ListingStateModel = {
  tasks: [],
  users: []
};