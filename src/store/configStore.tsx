import {createStore} from 'redux';
import {rootReducer} from '../reducer/rootReducer'

const configStore = () => createStore(rootReducer);

export {configStore}
