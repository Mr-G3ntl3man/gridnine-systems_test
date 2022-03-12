export type DataT = {
   result: {
      bestPrices: BestPricesT
      flights: FlightsT[]
   }
}

export type FlightsT = {
   flight: FlightT
   flightToken: string
   hasExtendedFare: boolean
}

type FlightT = {
   legs: LegsT[]
   price: PriceT
   refund: RefundT
   seats: SeatsT[]
   exchange: ExchangeT
   international: boolean
   servicesStatuses: ServicesStatusesT
   isTripartiteContractDiscountApplied: boolean
   carrier: { uid: string, caption: string, airlineCode: string }
}

type ServicesStatusesT = {
   baggage: { uid: string, caption: string }
   exchange: { uid: string, caption: string }
   refund: { uid: string, caption: string }
}

type SeatsT = {
   count: number
   type: { uid: string, caption: string }
}

type RefundT = {
   ADULT: { refundableBeforeDeparture: boolean, refundableAfterDeparture: boolean }
}

type ExchangeT = {
   ADULT: {
      exchangeAfterDeparture: { amount: string, currency: string, currencyCode: string }
      exchangeBeforeDeparture: { amount: string, currency: string, currencyCode: string }
      exchangeableAfterDeparture: boolean
      exchangeableBeforeDeparture: boolean
   }
}

type PriceT = {
   passengerPrices: PassengerPricesT
   total: { amount: string, currency: string, currencyCode: string }
   totalFeeAndTaxes: { amount: string, currency: string, currencyCode: string }
   rates: {
      totalEur: { amount: string, currencyCode: string }
      totalUsd: { amount: string, currencyCode: string }
   }
}

type PassengerPricesT = {
   feeAndTaxes: { amount: string, currency: string, currencyCode: string }
   passengerCount: number
   passengerType: { uid: string, caption: string }
   singlePassengerTotal: { amount: string, currency: string, currencyCode: string }
   tariff: { amount: string, currency: string, currencyCode: string }
   total: { amount: string, currency: string, currencyCode: string }
}

export type LegsT = {
   duration: number
   segments: SegmentsT[]
}

type SegmentsT = {
   aircraft: { uid: string, caption: string }
   airline: { uid: string, caption: string, airlineCode: string }
   arrivalAirport: { uid: string, caption: string }
   arrivalCity?: { uid: string, caption: string }
   arrivalDate: string
   classOfService: { uid: string, caption: string }
   classOfServiceCode: string
   departureAirport: { uid: string, caption: string }
   departureCity?: { uid: string, caption: string }
   departureDate: string
   flightNumber: string
   servicesDetails: ServicesDetailsT
   starting: boolean
   stops: number
   techStopInfos: []
   travelDuration: number
}

type ServicesDetailsT = {
   fareBasis: { ADULT: string }
   freeCabinLuggage: {}
   freeLuggage: {
      ADULT: {
         nil: boolean
         pieces: number
         unit: string
      }
   }
   paidCabinLuggage: {}
   paidLuggage: {}
   tariffName: string
}

type BestPricesT = {
   DIRECT: {
      bestFlights: BestFlightsT[]
   }
   ONE_CONNECTION: {
      bestFlights: BestFlightsT[]
   }
}

type BestFlightsT = {
   carrier: { uid: string, caption: string, airlineCode: string }
   price: { amount: string, currency: string, currencyCode: string }
}