import { createWarehouse } from '../src/index';

test('Creates a State Warehouse ', () => {
  const warehouse = createWarehouse({});
  // dispatch: (...args: any) => void;
  // getState: (...args: any) => any;
  // subscribe: (...args: any) => Subscription;
  // slice: (...args: any) => Observable<any>;
  expect(typeof warehouse.dispatch).toBe('function');
  expect(typeof warehouse.getState).toBe('function');
  expect(typeof warehouse.subscribe).toBe('function');
  expect(typeof warehouse.slice).toBe('function');
});

test('Dispatch & Subscribe', () => {
  const initialState = {};
  const msg = { person: { name: 'Ham', surname: 'Burgers' } };
  const wh = createWarehouse(initialState);
  const observerMock = jest.fn(val => val);
  wh.subscribe(observerMock);

  wh.dispatch();
  expect(observerMock.mock.calls.length).toBe(1);
  expect(observerMock.mock.calls[0][0]).toEqual(initialState);

  wh.dispatch(msg);
  expect(observerMock.mock.calls.length).toBe(2);
  expect(observerMock.mock.calls[1][0]).toEqual(msg);
});

test('Get Warehouse State', () => {
  const initialState = {};
  const msg = { person: { name: 'Ham', surname: 'Burgers' } };
  const wh = createWarehouse(initialState);
  const observerMock = jest.fn(val => val);
  wh.subscribe(observerMock);

  wh.dispatch(msg);
  expect(wh.getState()).toEqual(msg);

  //   // appState.slice('person').subscribe(v => console.log('[PERSON SLICED]', v));
  //   // appState.dispatch({ person: { age: 30 } });
  //   // appState.dispatch({ a: { b: { c: 'nested' } } });
  //   // appState.dispatch({ a: { b: { c: 'nested' }, d: true } });
  //   // appState.dispatch({ ramdom: Math.random() });
  //   // appState.dispatch({ names: ['Homer', 'Marge'] });
  //   // appState.dispatch({ names: ['ale', 'fabi', 'bart'] });
  //   // appState.dispatch({ names: ['ale', 'fabi', 'bart'] });
  //   // appState.dispatch({ names: ['ale', 'fabi'] });
  //   // appState.dispatch({ ramdom: Math.random() });
  //   // appState.dispatch({ ramdom: Math.random() });
  //   // console.log(appState.getState());

  //   // const names = appState.slice('names');
  //   // names.subscribe(v => console.log('[NAMES SLICED]', v));
  //   // names.next({ names: ['ale'] });
});
