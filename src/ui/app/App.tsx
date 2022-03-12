import React, {useEffect} from 'react';
import styles from '../styles/app.module.scss'
import {appSlice} from "../../bll/app-slice";
import {useDispatch} from "react-redux";
import {DataT, FlightsT} from "../../bll/dateTypes";
import {useAppSelector} from "../../bll/store";
import {FlightsCard} from "../components/FlightsCard";
import {SearchOptions} from "../components/SearchOptions";
import jsonData from "../../dal/flights.json"

export const App = () => {
   const dispatch = useDispatch()

   const data = useAppSelector<FlightsT[]>(state => state.app.data)
   const currentData = useAppSelector<FlightsT[]>(state => state.app.currentData)

   const setData = () => dispatch(appSlice.actions.setData({data: jsonData as unknown as DataT}))
   const flightsCards = currentData.map((flightsCard, index) => <FlightsCard key={index} flightsCard={flightsCard}/>)

   useEffect(() => {
      dispatch(appSlice.actions.setData({data: jsonData as unknown as DataT, limit: 50}))
   }, [])

   useEffect(() => {
      dispatch(appSlice.actions.setOptions())
   }, [data])

   return (
      <div className={styles.container}>
         <div className={styles.column}>
            <div className={styles.leftColumn}>
               <SearchOptions/>
            </div>

            <div className={styles.rightColumn}>
               {flightsCards}

               {!currentData.length &&
               <span className={styles.notFound}>Ничего не найдено, измените опции поиска!</span>}

               {!!currentData.length &&
               <button onClick={setData} className={styles.showMore}>Показать еще</button>}
            </div>
         </div>
      </div>
   )
}

