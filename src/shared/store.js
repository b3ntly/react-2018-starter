import { observable, action } from 'mobx';

export default class AppState {
    @observable items= [];
    
    constructor(initialState) {
        console.log(3)
        this.items = initialState && initialState.appstate && initialState.appstate.items ? initialState.appstate.items : [];
    }

    @action
    addItem(item) {
        this.items.push(item);
    }

    toJson() {
        console.log(4);
        return {
            items: this.items
        };
    }
}