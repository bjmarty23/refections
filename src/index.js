import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery,call,put} from 'redux-saga/effects';
import axios from 'axios';

const sagaMiddleware = createSagaMiddleware();

//---------sagas------------

function* rootSaga() {
    console.log('root saga loaded');
    yield takeEvery('REFLECTION_LIST', getReflectionSaga);
}

function* getReflectionSaga(action) {
    try {
        console.log('in getReflectionSaga')
        const reflectionList = yield call(axios.get, '/api/reflection');
        yield put({
            type: 'REFLECTION_LIST',
            payload: reflectionList.data
        })
    } catch (error) {
        console.log('an error in getMenuSaga ', error);
    }
}




//---------reducers-----------

// reducer getting current data from db
const reflectionListReducer = (state = [], action) => {
    switch (action.type) {
        case 'REFLECTION_LIST':
            return action.payload;
        default:
            return state;
    }

}
// posting new reflect to db
// const newReflectionReducer = (state=[], action)=> {
//     switch(action.type) {
//         case 'NEW_REFLECTION' :
//             return[...state,action.payload];
//     }
// }





//----------store----------
const store = createStore(
   combineReducers({
    reflectionListReducer }),
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga);



ReactDOM.render(<Provider store = {store}>< App /></Provider>, document.getElementById('root'));
registerServiceWorker();
