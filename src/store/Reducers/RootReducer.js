import { combineReducers } from 'redux';
import { firebaseReducer as firebase} from 'react-redux-firebase';
import { firestoreReducer as firestore } from 'redux-firestore';
import { reducer as fromReducer } from 'redux-form';
import { PostReducer} from './PostReducer';
export const RootReducer = combineReducers({
    firebase,
    firestore,
    form:fromReducer,
    PostReducer
})
