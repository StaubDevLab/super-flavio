import {configureStore} from '@reduxjs/toolkit'
import dialogSlice from "@/stores/dialog-slice";



const store = configureStore({
    reducer: {
        dialog: dialogSlice,

    } as any,
})

export default store;