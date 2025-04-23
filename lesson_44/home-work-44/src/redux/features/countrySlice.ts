import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CountryState} from "../types.ts";


const initialState: CountryState = {
    value: '-',
};

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountry: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;