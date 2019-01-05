import { equals } from 'ramda';
import { Subject, Observable, Subscription } from 'rxjs';
import { filter, pluck, scan, tap } from 'rxjs/operators';

export interface IWarehouse {
  dispatch: (...args: any) => void;
  getState: (...args: any) => any;
  subscribe: (...args: any) => Subscription;
  slice: (...args: any) => Observable<any>;
}
/**
 * State Managemnt with Rxjs
 * @param initState
 */
export function createWarehouse(initState = {}): IWarehouse {
  const subject = new Subject();
  const obs = subject.pipe(scan((acc, curr) => ({ ...acc, ...curr }), initState));

  let state: any;
  obs.subscribe(s => (state = s));
  const getState = () => state;

  return {
    dispatch: subject.next.bind(subject),
    getState,
    subscribe(o) {
      return obs.subscribe(o);
    },
    slice(...selector) {
      let prev: any;
      return obs.pipe(
        pluck(...selector),
        filter(s => !equals(prev, s)),
        tap(s => (prev = s))
      );
    }
  };
}
