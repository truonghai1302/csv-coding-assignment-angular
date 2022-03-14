import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { ResetDetailsState } from "src/app/details/store/details.actions";
import { UpdateTaskInList } from "src/app/listing/store";
import {
  DetailsStateModel as StateModel,
  DETAILS_STATE_NAME as STATE_NAME,
  DETAILS_INITIAL_STATE as INITIAL_STATE,
  UpdateTask,
  LoadEditTask,
} from './index';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class DetailsState implements NgxsOnInit {
  @Selector()
  static task({ task }: StateModel) {
    return task;
  }
  
  constructor() {}

  ngxsOnInit(ctx?: StateContext<any>) {}

  @Action(LoadEditTask)
  getTasks({ patchState, }: StateContext<StateModel>, { task }: LoadEditTask) {
    patchState({ task });
  }

  @Action(UpdateTask)
  updateTask({ dispatch }: StateContext<StateModel>, { payload }: UpdateTask) {
    dispatch(new UpdateTaskInList(payload));
    // patchState({ task });
  }

  @Action(ResetDetailsState)
  resetState({ setState }: StateContext<StateModel>) {
    setState(INITIAL_STATE)
    // patchState({ task });
  }




 }