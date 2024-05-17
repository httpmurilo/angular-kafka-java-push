import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AddMessageAction } from './kafka.actions';
import { Selector } from '@ngxs/store';

export class KafkaStateModel {
  public items: any[] = [];
}

const defaults = {
  items: []
};

@State<KafkaStateModel>({
  name: 'kafka',
  defaults: {items: []}
})
@Injectable()
export class KafkaState {

  @Selector()
  static messages(state: KafkaStateModel): string[] {
    return state.items;
  }

  @Action(AddMessageAction)
  add({ getState, setState }: StateContext<KafkaStateModel>, action: AddMessageAction) {
    const state = getState();
    setState({ items: [ ...state.items, action.message ] });
  }
}
