import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { calendarReducer } from '../reducers/calndarReducer';
import { uiReducer } from '../reducers/uiReducer';

	const reducers = combineReducers({
		ui: uiReducer,
		calendario: calendarReducer
	});

	const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


	export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)) );
