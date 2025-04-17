import { EventEmitter } from './EventEmitter';

export const obj = {
    count: 0,
    callback() {
        this.count++;
    },
    subscribe() {
        this.boundCallback = this.callback.bind(this);
        EventEmitter.on('click', this.boundCallback);
    },
    unsubscribe() {
        EventEmitter.off('click', this.boundCallback);
    },
};

export const obj1 = {
    first(...args) {
        this.second(...args.reverse());
    },
    second() {
    },
};

export const EventEmitter = {
    handlers: new Map(),
    on(eventName, callback) {
        const existingHandlers = this.handlers.get(eventName);
        if (existingHandlers) {
            existingHandlers.push(callback);
        } else {
            this.handlers.set(eventName, [callback]);
        }
    },
    off(eventName, callback) {
        const existingHandlers = this.handlers.get(eventName);
        if (existingHandlers) {
            const handlerIndex = existingHandlers.findIndex(
                (handler) => handler === callback,
            );
            if (handlerIndex !== -1) {
                existingHandlers.splice(handlerIndex, 1);
            }
            if (existingHandlers.length === 0) {
                this.handlers.delete(eventName);
            }
        }
    },
    emit(eventName) {
        const existingHandlers = this.handlers.get(eventName);
        if (existingHandlers) {
            existingHandlers.forEach((callback) => {
                callback();
            });
        }
    },
};