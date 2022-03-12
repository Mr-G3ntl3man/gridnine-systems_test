import React, {FC} from 'react';
import {formatFlightTime} from "../../utils/formatFlightTime";
import {getFormatTime} from "../../utils/formatTimeAndDate";
import {LegsT} from "../../bll/dateTypes";
import styles from "../styles/flightTicket.module.scss";
import clock from '../images/clock.png'

type FlightTicketT = {
   ticket: LegsT
}

export const FlightTicket: FC<FlightTicketT> = ({ticket}) => {
   const durationFlight = formatFlightTime(ticket.duration)
   const departureDate = getFormatTime(ticket.segments[0].departureDate)
   const arrivalDate = ticket.segments[1] ? getFormatTime(ticket.segments[1].arrivalDate) : getFormatTime(ticket.segments[0].arrivalDate)

   return (
      <div className={styles.desc}>
         <div className={styles.descDirection}>
            <div className={styles.directionWrap}>
               {ticket.segments[0].departureCity && <span>{ticket.segments[0].departureCity.caption}</span>},
               <span>{ticket.segments[0].departureAirport.caption}</span>
               <span className={styles.uid}>({ticket.segments[0].departureAirport.uid})</span>
            </div>

            <span className={styles.arrow}>→</span>

            <div className={styles.directionWrap}>
               {ticket.segments[1]
                  ? <>
                     {ticket.segments[1].arrivalCity &&
                     <span>{ticket.segments[1].arrivalCity.caption}</span>},
                     <span>{ticket.segments[1].arrivalAirport.caption}</span>
                     <span className={styles.uid}>({ticket.segments[0].arrivalAirport.uid})</span>
                  </>
                  : <>
                     {ticket.segments[0].arrivalCity &&
                     <span>{ticket.segments[0].arrivalCity.caption}</span>},
                     <span>{ticket.segments[0].arrivalAirport.caption}</span>
                     <span className={styles.uid}>({ticket.segments[0].arrivalAirport.uid})</span>
                  </>}
            </div>
         </div>

         <div className={styles.descTime}>
            <div className={styles.descTimeWrap}>
               <div className={styles.departureDate}>
                  <span>{departureDate.formatTime}</span>
                  <span>{departureDate.formatDate}</span>
               </div>

               <div className={styles.duration}>
                  <img src={clock} alt="clock"/>
                  <span>{durationFlight}</span>
               </div>

               <div className={styles.arrivalDate}>
                  <span>{arrivalDate.formatDate}</span>
                  <span>{arrivalDate.formatTime}</span>
               </div>
            </div>

            <span className={styles.transfer}>
               {ticket.segments[1] && '1 пересадка'}
            </span>
         </div>

         <div className={styles.flightOperator}>
            Рейс исполняет: <span>{ticket.segments[0].airline.caption}</span>
         </div>
      </div>
   )
}

