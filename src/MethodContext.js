import { EventEmitter } from './EventEmitter';

export const obj = {
    count: 0,
    callback: function() {
        this.count++;
    },
    subscribe() {
        EventEmitter.on('click', this.callback.bind(this));
    },
    unsubscribe() {
        EventEmitter.off('click', this.callback.bind(this));
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
            const handlerIndex = existingHandlers.find(
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