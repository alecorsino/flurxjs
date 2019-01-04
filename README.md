# flurxjs
Proof of concept:

Flux made with Rxjs similar Redux api
It has change detection to only notify those observers that need to instead of all all the time  

##
`import { equals } from 'ramda';
import { Subject } from 'rxjs';
import { filter, pluck, scan, tap } from 'rxjs/operators';

/**
 * State Managemnt with Rxjs
 * @param initState
 */
function createObservable(initState = {}) {
    const subject = new Subject();
    const obs = subject.pipe(scan((acc, curr) => ({ ...acc, ...curr }), initState));

    let state;
    obs.subscribe(s => (state = s));
    const getState = () => state;

    return {
        dispatch: subject.next.bind(subject),
        getState,
        subscribe(o) {
            return obs.subscribe(o);
        },
        slice(...selector) {
            let prev;
            return obs.pipe(
                pluck(...selector),
                filter(s => !equals(prev, s)),
                tap(s => (prev = s))
            );
        },
    };
}
const appState = createObservable({ names: [] });
const healthState = createObservable({ params: { list: [] }, values: 'Good health' });

healthState.subscribe(v => console.log('[HEALTH]', v));
healthState.dispatch({});

appState.slice('person').subscribe(v => console.log('[PERSON SLICED]', v));
appState.dispatch({ person: { name: 'Ham', surname: 'Burgers' } });
appState.dispatch({ person: { age: 30 } });
appState.dispatch({ a: { b: { c: 'nested' } } });
appState.dispatch({ a: { b: { c: 'nested' }, d: true } });
appState.dispatch({ ramdom: Math.random() });
appState.dispatch({ names: ['Homer', 'Marge'] });
appState.dispatch({ names: ['ale', 'fabi', 'bart'] });
appState.dispatch({ names: ['ale', 'fabi', 'bart'] });
appState.dispatch({ names: ['ale', 'fabi'] });
appState.dispatch({ ramdom: Math.random() });
appState.dispatch({ ramdom: Math.random() });
console.log(appState.getState());

const names = appState.slice('names');
names.subscribe(v => console.log('[NAMES SLICED]', v));
names.next({ names: ['ale'] });
`
