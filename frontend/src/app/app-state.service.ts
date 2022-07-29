import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    private appState: any = {}
    private state$: any = {};

    constructor() {
        this.state$ = new BehaviorSubject(this.appState);
    }

    // Restore state from localStorage 
    initState(): void {
        Object.keys(localStorage).forEach(key => {
            if (localStorage[key][0] === "{" || localStorage[key][0] === "[") this.appState[key] = JSON.parse(localStorage[key])
            else this.appState[key] = localStorage[key]
        })

        this.state$.next(this.appState) // inform subscribers
    }

    //Set localstorage state
    setState(key: string, value: any, persist: boolean = false) {
        this.appState[key] = value // in Memory
        this.state$.next(this.appState) // inform subscribers
        if (persist) {
            if (typeof value === "object") localStorage[key] = JSON.stringify(value)
            else localStorage[key] = value
        }
    }

    //Remove state
    removeState(key: string) {
        localStorage.removeItem(key)
    }

    //Retrieve state
    getState(key: string) {
        return this.state$.pipe(map((obj: any) => obj[key]), map((value: any) => {
            if (value) {
                if (value[0] === "{" || value[0] === "[") return JSON.parse(value);
                else return value;
            }
        }));
    }

    //Clear all states    
    clear(): void {
        localStorage.clear()
        this.appState = {}
        this.state$.next(this.appState)
    }

}