import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Address, Place } from '../../types/types';
import axios from '../../api/api';

type PlaceState = {
    places: Place[];
    currentPlace?: Place;
    currentAddress?: CurrentAddress;
}

type CurrentAddress = {
    lat?: number
    lng?: number
}

const initialState: PlaceState | {} = {
    places: [],
    currentAddress: {},
    currentPlace: {}
}

export const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        selectLocation: (state, action: PayloadAction<Address>) => {
            console.log(action)
            state.currentAddress = {
                lat: action.payload.lat,
                lng: action.payload.lng,
            }
        },
        getPlaces: (state, action) => {
            console.log(action.payload)
            state.places = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.places = action.payload
        })
        builder.addCase(getData.rejected, (state, action) => {
            state.places = []
        })
    },
})

export const getData = createAsyncThunk(
    'place/getData',
    async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('/place/', {
                headers: {
                    Authorization: token
                }
            })
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)


export const { selectLocation, getPlaces } = placeSlice.actions

export default placeSlice.reducer