import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs";
import { selectCountData } from "..";
import { CountData } from "../../models";
import { CounterCommands, CounterDocuments } from "../actions/count-actions";
import { CountState, initialState } from "../reducers/count-reducer";

@Injectable()
export class CounterDataEffects {

    private readonly COUNT_DATA_KEY = 'count-data';
    // CounterCommandsLoad => ?? => CounterDocuments.counter
    loadCountData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CounterCommands.load), // we only care about this action
            map(() => localStorage.getItem(this.COUNT_DATA_KEY)), // check local storage, this going to be null | "string"
            map((storedData) => storedData === null ? initialState : JSON.parse(storedData) as CountState), // CountState
            map((data) => CounterDocuments.counter({payload: data }))

        )
    }, {dispatch: true}) 

    saveCountData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CounterCommands.countby, CounterCommands.decremented, CounterCommands.incremented, CounterCommands.reset), // stop here if it isn't one of these.
            concatLatestFrom(() => this.store.select(selectCountData)), // => subscribed observable of our data returned from selectCountData
            map(([, data]) => JSON.stringify(data) ), // turn that data into a string so I can write it local storage
            tap(data => localStorage.setItem(this.COUNT_DATA_KEY, data)) // write that sucker to localstorage
            
        )
    }, {dispatch: false}) // whatever emerges here has to be action, and it is sent to the store.

   
    constructor(private actions$: Actions, private store:Store) {}
}