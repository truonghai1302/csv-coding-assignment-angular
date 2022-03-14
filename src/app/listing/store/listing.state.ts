import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import {
  ListingStateModel as StateModel, 
  LISTING_INITIAL_STATE as INITIAL_STATE,
  LISTING_STATE_NAME,
  CompleteTask, GetTasks, GetUsers, NewTask, UpdateTaskInList,
} from 'src/app/listing/store';
import { append, patch, updateItem } from '@ngxs/store/operators';
import {Task} from 'src/app/backend.service';


@State<StateModel>({
  name: LISTING_STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class ListingState implements NgxsOnInit { 
  @Selector()
  static tasks({ tasks }: StateModel) {
    return tasks ?? [];
  }

  @Selector()
  static users({ users }: StateModel) {
    return users ?? [];
  }

  @Selector()
  static completedTasks({tasks}: StateModel) {
    return tasks.filter(t => t.completed);
  }

  @Selector()
  static incompleteTasks({tasks}: StateModel) {
    return tasks.filter(t => !t.completed);
  }

  constructor() {}

  ngxsOnInit(ctx?: StateContext<StateModel>) {
    // ctx && ctx.dispatch(new GetTasks(ctx.getState().tasks ?? []));
  }

  @Action(GetTasks)
  getTasks({ patchState }: StateContext<StateModel>, { tasks }: GetTasks) {
    patchState({ tasks });
  }

  @Action(GetUsers)
  getUsers({ patchState }: StateContext<StateModel>, { users }: GetUsers) {
    patchState({ users });
  }

  @Action(CompleteTask)
  completeTask(ctx: StateContext<StateModel>, action: CompleteTask) {
    const {taskId, completed} = action;
    const task = ctx.getState().tasks.find(t => t.id === taskId);
    const newTask = {...task, completed}
    ctx.setState(
      patch({
        tasks: updateItem<Task>(t => t.id === taskId, newTask)
      }))
  }

  @Action(NewTask)
  newTask({ setState }: StateContext<StateModel>, { newTask }: NewTask) {
    setState(
      patch({
        tasks: append([newTask])
      }))
  }
  
  @Action(UpdateTaskInList)
  updateTaskInList({ setState }: StateContext<StateModel>, { newTask }: UpdateTaskInList) {
    setState(
      patch({
        tasks: updateItem<Task>(t => t.id === newTask.id, newTask)
      }))
  }
  

}
