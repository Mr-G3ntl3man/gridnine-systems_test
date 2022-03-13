import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataT, FlightsT} from "./dateTypes";

const initialState: InitialStateT = {
   data: [],
   currentData: [],
   sortOptions: {
      airlines: [],
      uniqueAirlines: [],
      price: {
         priceMax: 0,
         priceMin: 0,
         priceMaxCurrent: 0,
         priceMinCurrent: 0,
      },
      filter: [
         {filter: "oneTransfer", active: true, transfer: 1},
         {filter: "withoutTransfer", active: true, transfer: 0}
      ]
   },
}

export const setDataAndOptions = createAsyncThunk(
   'app/setDataOptions',
   (payload: { data: DataT, limit?: number }, {dispatch}) => {
      dispatch(appSlice.actions.setData({data: payload.data, limit: payload.limit}))
      dispatch(appSlice.actions.setOptions())
   }
)

export const filterFlightsCard = createAsyncThunk(
   'app/filterFlightsCard',
   (action: ActionT, {dispatch}) => {
      dispatch(action)
      dispatch(appSlice.actions.filterFlightsCardByOptions())
   }
)

export const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setData: (state, action: PayloadAction<{ data: DataT, limit?: number }>) => {
         const {limit, data} = action.payload

         if (limit) state.data = data.result.flights.slice(0, limit)
         if (!limit) state.data = data.result.flights

         state.currentData = state.data
      },
      setMaxPrice: (state: InitialStateT, action: PayloadAction<number>) => {
         state.sortOptions.price.priceMaxCurrent = action.payload
      },
      setMinPrice: (state: InitialStateT, action: PayloadAction<number>) => {
         state.sortOptions.price.priceMinCurrent = action.payload
      },
      setFilterByArline: (state: InitialStateT, action: PayloadAction<AirlinesT>) => {
         state.sortOptions.airlines = state.sortOptions.airlines
            .map(el => el.caption === action.payload.caption ? {...el, active: action.payload.active} : el)
      },
      setFilterByTransfer: (state: InitialStateT, action: PayloadAction<{ filter: string, active: boolean }>) => {
         state.sortOptions.filter = state.sortOptions.filter
            .map(el => el.filter === action.payload.filter ? {...el, active: action.payload.active} : el)
      },
      filterFlightsCardByOptions: (state: InitialStateT) => {
         state.currentData = state.data.filter(card => {
            return state.sortOptions.filter.filter(el => el.transfer === (card.flight.legs[0].segments.length - 1))[0].active &&
               state.sortOptions.airlines.filter(el => el.caption === card.flight.carrier.caption)[0].active &&
               +card.flight.price.total.amount >= state.sortOptions.price.priceMinCurrent &&
               +card.flight.price.total.amount <= state.sortOptions.price.priceMaxCurrent
         })
      },
      setOptions: (state: InitialStateT) => {
         const sortArlineAndPrice = state.sortOptions.uniqueAirlines = state.data.map(el => ({
            caption: el.flight.carrier.caption,
            price: +el.flight.price.total.amount
         }))
            .sort((a, b) => a.price - b.price)

         state.sortOptions.price = {
            priceMin: sortArlineAndPrice[0].price,
            priceMinCurrent: sortArlineAndPrice[0].price,
            priceMax: sortArlineAndPrice[sortArlineAndPrice.length - 1].price,
            priceMaxCurrent: sortArlineAndPrice[sortArlineAndPrice.length - 1].price
         }

         state.sortOptions.uniqueAirlines = sortArlineAndPrice.reduce((acc: {
            airline: { [key: string]: boolean },
            uniqueAirlines: { caption: string, price: number }[]
         }, el) => {
            if (acc.airline[el.caption]) return acc

            acc.airline[el.caption] = true
            acc.uniqueAirlines.push(el)

            return acc
         }, {airline: {}, uniqueAirlines: []})
            .uniqueAirlines

         state.sortOptions.airlines = state.sortOptions.uniqueAirlines.map(el => ({
            caption: el.caption,
            active: true
         }))

         state.currentData = state.currentData.sort((a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount)
      },
      sortFlightsCard: (state: InitialStateT, action: PayloadAction<SortT>) => {
         if (action.payload === 'ascendingPrice') state.currentData = state.currentData.sort((a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount)
         if (action.payload === 'descendingPrice') state.currentData = state.currentData.sort((a, b) => +b.flight.price.total.amount - +a.flight.price.total.amount)
         if (action.payload === 'travelTime') state.currentData = state.currentData.sort((a, b) => +a.flight.legs[0].duration - +b.flight.legs[0].duration)
      },
   },
})


type InitialStateT = {
   data: FlightsT[]
   currentData: FlightsT[]
   sortOptions: SortOptionsT
}

type SortOptionsT = {
   price: PriceT
   filter: FilterT[]
   airlines: AirlinesT[]
   uniqueAirlines: UniqueAirlinesT[]
}

export type PriceT = {
   priceMax: number
   priceMin: number
   priceMaxCurrent: number
   priceMinCurrent: number
}

export type AirlinesT = {
   caption: string
   active: boolean
}

type UniqueAirlinesT = {
   caption: string
   price: number
}

export type FilterT = {
   filter: string
   active: boolean
   transfer: number
}

export type SortT = 'ascendingPrice' | 'descendingPrice' | 'travelTime'

type ActionT = ReturnType<typeof appSlice.actions.setFilterByArline>
   | ReturnType<typeof appSlice.actions.setFilterByTransfer>
   | ReturnType<typeof appSlice.actions.setMaxPrice>
   | ReturnType<typeof appSlice.actions.setMinPrice>




