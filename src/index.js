import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery,call,put} from 'redux-saga/effects';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

const sagaMiddleware = createSagaMiddleware();

//---------sagas------------

function* rootSaga() {
    console.log('Im Groot');
    yield takeEvery('GET_REFLECTION', getReflectionSaga);
    yield takeEvery('ADD_REFLECTION', postSaga);
}

function* getReflectionSaga(action) {
    console.log('in getReflectionSaga', action)
    try {
        const reflectionList = yield call(axios.get, '/api/reflection');
        yield put({
            type: 'REFLECTION_LIST',
            payload: reflectionList.data
        })
    } catch (error) {
        console.log('an error in getSaga ', error);
    }

}
 function* postSaga(action) {
   console.log('post saga triggered', action)
   try {
     yield call(axios.put, '/api/reflection', action.payload);
     yield put({
       type: 'GET_REFLECTION'
     })
   } catch (error) {}
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
const newReflectionReducer = (state=[], action)=> {
    switch(action.type) {
        case 'NEW_REFLECTION' :
            return[...state, action.payload];
        case 'REMOVE_REFLECTION':
            return state.filter((order) => {
            return order.id !== action.payload.id
        })
    default:
        return state;
    }
}

//----------store----------
const store = createStore(
   combineReducers({
    reflectionListReducer }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store = {store}>< App /></Provider>, document.getElementById('root'));
registerServiceWorker();
