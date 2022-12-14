import { createActionGroup, emptyProps } from "@ngrx/store";

export const CounterCommands = createActionGroup({
    source: 'Counter Commands',
    events: {
        incremented: emptyProps(),
        decremented: emptyProps()
    }
})