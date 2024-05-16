import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { KafkaAction } from './kafka.actions';
import { Selector } from '@ngxs/store';

export class KafkaStateModel {
  public items: string[];
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

  @Action(KafkaAction)
  add({ getState, setState }: StateContext<KafkaStateModel>, { payload }: AddMessageAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
