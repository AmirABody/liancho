import { Toast } from "../interfaces";

export const enum Event {
  Create,
  Delete,
}

type OnCreateCallback = ({ type, message }: Pick<Toast, "type" | "message">) => void;
type OnDeleteCallback = (id: number) => void;

type Callback = OnCreateCallback | OnDeleteCallback;

export interface EventManager {
  list: Map<Event, Callback[]>;
  on(event: Event.Create, callback: OnCreateCallback): EventManager;
  on(event: Event.Delete, callback: OnDeleteCallback): EventManager;
  off(event: Event, callback?: Callback): EventManager;
  emit(event: Event.Create, { type, message }: Pick<Toast, "type" | "message">): void;
  emit(event: Event.Delete, id: number): void;
}

export const eventManager: EventManager = {
  list: new Map(),

  on(event: Event, callback: Callback) {
    this.list.get(event) || this.list.set(event, []);
    this.list.get(event)!.push(callback);
    return this;
  },

  off(event, callback) {
    if (callback) {
      const remainingCallbacks = this.list.get(event)!.filter((cb) => cb !== callback);
      this.list.set(event, remainingCallbacks);
      return this;
    }
    this.list.delete(event);
    return this;
  },

  emit(event: Event, ...args: any[]) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback: Callback) => {
        // @ts-ignore
        callback(...args);
      });
  }
};
