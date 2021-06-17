import { Injectable } from '@angular/core';

@Injectable()
export class HC_Storage {
    public STORE_LOCALSTORAGE = window.localStorage;

    public storeType:any = this.STORE_LOCALSTORAGE;

    constructor() {

    }
    public isSet(key){
        return this.storeType.getItem(key) !== null;
    };
    
    public get (key) {
        if (!this.isSet(key)) {
            return undefined;
        }
        var obj = JSON.parse(this.storeType.getItem(key));
        if (obj.type === "date") {
            return new Date(obj.value);
        }
        return obj.value;
    };

    public set (key, val) {
        var obj = {
            type: val instanceof Date
                ? "date"
                : typeof val,
            value: val
        };
        this.storeType.setItem(key, JSON.stringify(obj));
    };
    
    
    public clear () {
        this.storeType.clear();
    };
}