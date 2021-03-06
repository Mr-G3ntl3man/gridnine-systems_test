import React, {ChangeEvent} from 'react';
import styles from "../styles/app.module.scss";
import {useAppSelector} from "../../bll/store";
import {useDispatch} from "react-redux";
import {AirlinesT, appSlice, filterFlightsCard, FilterT, PriceT, SortT} from "../../bll/app-slice";

export const SearchOptions = () => {
   const dispatch = useDispatch()

   const {
      priceMin,
      priceMax,
      priceMaxCurrent,
      priceMinCurrent
   } = useAppSelector<PriceT>(state => state.app.sortOptions.price)
   const uniqueAirlines = useAppSelector<{ caption: string, price: number }[]>(state => state.app.sortOptions.uniqueAirlines)
   const filterByTransfer = useAppSelector<FilterT[]>(state => state.app.sortOptions.filter)
   const filterByAirlines = useAppSelector<AirlinesT[]>(state => state.app.sortOptions.airlines)

   const setMinPrice = (e: ChangeEvent<HTMLInputElement>) => dispatch(filterFlightsCard(appSlice.actions.setMinPrice(+e.currentTarget.value)))
   const setMaxPrice = (e: ChangeEvent<HTMLInputElement>) => dispatch(filterFlightsCard(appSlice.actions.setMaxPrice(+e.currentTarget.value)))
   const sortFlightsCard = (e: ChangeEvent<HTMLInputElement>) => dispatch(appSlice.actions.sortFlightsCard(e.currentTarget.value as SortT))
   const onFilterByTransferChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(filterFlightsCard(appSlice.actions.setFilterByTransfer({
         filter: e.currentTarget.value,
         active: e.currentTarget.checked
      })))
   }
   const onFilterByAirlinesChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(filterFlightsCard(appSlice.actions.setFilterByArline({
            caption: e.currentTarget.value,
            active: e.currentTarget.checked
         })
      ))
   }

   const airlines = uniqueAirlines.map(el =>
      <div key={el.caption} className={styles.airlinesInput}>
         <input checked={filterByAirlines.filter(a => a.caption === el.caption)[0].active}
                onChange={onFilterByAirlinesChange}
                value={el.caption}
                type="checkbox"
                id={el.caption}/>
         <label htmlFor={el.caption}>
            <span className={styles.caption}> - {el.caption}</span>
            <span className={styles.airlinesPrice}>???? {el.price}??.</span>
         </label>
      </div>)

   return (
      <>
         <div className={styles.sort}>
            <span className={styles.sortTitle}>??????????????????????</span>
            <div className={styles.radio}>
               <input
                  defaultChecked={true}
                  onChange={sortFlightsCard}
                  name={'sort'}
                  value={'ascendingPrice'}
                  type="radio"
                  id="field1"/>
               <label htmlFor="field1">- ???? ?????????????????????? ????????</label>
            </div>

            <div className={styles.radio}>
               <input
                  onChange={sortFlightsCard}
                  name={'sort'}
                  value={'descendingPrice'}
                  type="radio" id="field2"/>
               <label htmlFor="field2">- ???? ???????????????? ????????</label>
            </div>

            <div className={styles.radio}>
               <input
                  onChange={sortFlightsCard}
                  name={'sort'}
                  value={'travelTime'}
                  type="radio"
                  id="field3"/>
               <label htmlFor="field3">- ???? ?????????????? ?? ????????</label>
            </div>
         </div>

         <div className={styles.filter}>
            <span className={styles.filterTitle}>??????????????????????</span>
            <div className={styles.radio}>
               <input
                  checked={filterByTransfer[0].active}
                  onChange={onFilterByTransferChange}
                  value={'oneTransfer'}
                  type="checkbox"
                  id="field4"/>
               <label htmlFor="field4">- 1 ??????????????????</label>
            </div>

            <div className={styles.radio}>
               <input
                  checked={filterByTransfer[1].active}
                  onChange={onFilterByTransferChange}
                  value={'withoutTransfer'}
                  type="checkbox"
                  id="field5"/>
               <label htmlFor="field5">- ?????? ??????????????????</label>
            </div>
         </div>

         <div className={styles.price}>
            <span className={styles.priceTitle}>????????</span>
            <div className={styles.priceInput}>
               ????
               <input
                  onChange={setMinPrice}
                  min={priceMin}
                  max={priceMax}
                  value={priceMinCurrent}
                  type="number"/>
            </div>

            <div className={styles.priceInput}>
               ????
               <input
                  onChange={setMaxPrice}
                  value={priceMaxCurrent}
                  min={priceMin}
                  max={priceMax}
                  type="number"/>
            </div>
         </div>

         <div className={styles.airlines}>
            <span className={styles.airlinesTitle}>????????????????????????</span>
            {airlines}
         </div>
      </>
   );
};

