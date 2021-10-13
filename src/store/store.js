import {configureStore} from '@reduxjs/toolkit';
import walletReducer from './reducers/wallet';
import storageReducer from './reducers/storage';

export default configureStore({
    reducer: {
        wallet: walletReducer,
        storage: storageReducer,
    },
});
