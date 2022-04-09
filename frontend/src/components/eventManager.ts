import { Alert, Toast } from "../interfaces";

export const enum Event {
  CreateToast,
  DeleteToast,
  SetAlert,
  DeleteAlert,
}

type OnCreateToastCallback = ({ type, message }: Pick<Toast, "type" | "message">) => void;
type OnDeleteToastCallback = (id: number) => void;
type OnSetAlertCallback = ({ text, action }: Alert) => void;
type OnDeleteAlertCallback = () => void;

type Callback = OnCreateToastCallback | OnDeleteToastCallback | OnSetAlertCallback | OnDeleteAlertCallback;

export interface EventManager {
  list: Map<Event, Callback[]>;
  on(event: Event.CreateToast, callback: OnCreateToastCallback): EventManager;
  on(event: Event.DeleteToast, callback: OnDeleteToastCallback): EventManager;
  on(event: Event.SetAlert, callback: OnSetAlertCallback): EventManager;
  on(event: Event.DeleteAlert, callback: OnDeleteAlertCallback): EventManager;
  off(event: Event, callback?: Callback): EventManager;
  emit(event: Event.CreateToast, { type, message }: Pick<Toast, "type" | "message">): void;
  emit(event: Event.DeleteToast, id: number): void;
  emit(event: Event.SetAlert, { text, action }: Alert): void;
  emit(event: Event.DeleteAlert): void;
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
  },
};
