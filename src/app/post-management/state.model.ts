export type StatusNotification = 'OK' | 'ERROR' | 'INIT';

export class State<T> {
  value?: T
  error?: any
  status: StatusNotification

  constructor(status: StatusNotification, value?: T, error?: any) {
    this.value = value;
    this.error = error;
    this.status = status;
  }
}
