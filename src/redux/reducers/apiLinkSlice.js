import { createSlice } from "@reduxjs/toolkit";

let apiLinkSlice = createSlice({
    name: 'apiLink',
    initialState: {
        // link: 'https://e-learning-api-amber.vercel.app'
        // link:'http://localhost:5000'
        link:'https://e-learning-api-react.vercel.app'
    },
    reducers: {
    }
})

export let apiLinkReducer = apiLinkSlice.reducer;
