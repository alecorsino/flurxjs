# flurxjs
Proof of concept:

Flux made with Rxjs similar Redux api
It has change detection to only notify those observers that need to instead of all all the time
import { Subject } from 'rxjs';
import { scan ,pluck, filter, tap} from 'rxjs/operators';
import {equals} from 'ramda'; 

function createStore(initState = {}){
  const subject = new Subject();
  const reducer = subject.pipe(
    scan((acc, curr) => Object.assign({}, acc, curr), initState)
  );

  let state;
  reducer.subscribe(s => state = s);
  const getState = () => state;

  return{
    r:reducer,
    dispatch:subject.next.bind(subject),
    subscribe(o){
      return reducer.subscribe(o);
    },
    getState
  }
}
const store = createStore({names:[]});
function subStore(...path){
  let prev;
  const names = store.r.pipe(
    pluck(...path),
    filter( s => !equals(prev,s))
    );
  names.subscribe(val => {
    prev = val
    console.log('[PLUCKED]',val)
  })
}

// subStore('names');
subStore('a','b','c');

store.dispatch({ name: 'Joe' }); 
store.dispatch({ age: 30 });
store.dispatch({ a:{b:{c:'nested'}} });
store.dispatch({ a:{b:{c:'nested'},d:true} });
store.dispatch({ ramdom: Math.random() });  
store.dispatch({names:['ale','fabi','frani']} )  ;
store.dispatch({ ramdom: Math.random() });  
store.dispatch({names:['ale','fabi','frani','tony']} )  ;
store.dispatch({ ramdom: Math.random() });   
store.dispatch({names:[]} )  ;
console.log(store.getState())  



