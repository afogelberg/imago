import { combineReducers } from 'redux';
import layers from './layers';
import sources from './sources';

export default combineReducers({ sources, layers });
