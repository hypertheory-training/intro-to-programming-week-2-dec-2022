import { createReducer, on } from "@ngrx/store";
import { CounterCommands } from "../actions/count-actions";


export interface CountState {
    current: number;
}

const initialState:CountState = {
    current: 0
}

export const reducer = createReducer(initialState,
    on(CounterCommands.incremented, (currentState) => {
        return {
            current: currentState.current + 1
        }
    }),
    on(CounterCommands.decremented, (s) => ({...s, current: s.current -1}))
);