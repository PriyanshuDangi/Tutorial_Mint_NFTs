import {createSlice} from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        connected: false,
        pkh: null,
    },
    reducers: {
        setPKH: (state, address) => {
            state.connected = true;
            state.pkh = address.payload;
        },
        removePKH: (state) => {
            state.connected = false;
            state.pkh = null;
        },
    },
});

export const {setPKH, removePKH} = walletSlice.actions;

export const selectConnected = (state) => state.wallet.connected;
export const selectPKH = (state) => state.wallet.pkh;

export default walletSlice.reducer;
