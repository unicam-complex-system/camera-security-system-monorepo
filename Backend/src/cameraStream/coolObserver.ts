/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Subject } from 'rxjs';

export default class CoolObserver<T> {
  subject: Subject<T[]> = new Subject<T[]>();

  get(id: number): Subject<T> {
    if (this.subject[id] === undefined) {
      this.subject[id] = new Subject<T>();
    }
    return this.subject[id];
  }

  add(id: number, data: T) {
    this.get(id).next(data);
  }
}
