import React, {FC} from 'react';
import styles from '../styles/flightCard.module.scss'
import defaultLogo from '../images/airline.png'
import {FlightsT} from "../../bll/dateTypes";
import {FlightTicket} from "./FlightTicket";

type FlightsCardT = {
   flightsCard: FlightsT
}

export const FlightsCard: FC<FlightsCardT> = ({flightsCard}) => {
   const tickets = flightsCard.flight.legs.map((ticket, index) => <FlightTicket key={index} ticket={ticket}/>)

   return (
      <div className={styles.wrap}>
         <div className={styles.header}>
            <img src={defaultLogo} alt="default-logo"/>
            <div>
               <span> {flightsCard.flight.price.total.amount} ₽</span>
               <span className={styles.headerInfo}>Стоимость для одного взрослого пассажира.</span>
            </div>
         </div>

         {tickets}

         <button className={styles.chooseFlight}>Выбрать</button>
      </div>
   )
}

