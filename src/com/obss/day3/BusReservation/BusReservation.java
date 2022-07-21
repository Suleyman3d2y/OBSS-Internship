package com.obss.day3.BusReservation;

public class BusReservation {


    public static void main(String[] args) {

        Passenger[] busPassengers = new Passenger[1];

        Bus bus1 = new Bus(Destination.ADANA,busPassengers);

        bus1.insertPassenger(new Passenger("Ali",Destination.ADANA));
        bus1.insertPassenger(new Passenger("Veli",Destination.ANKARA));
        bus1.insertPassenger(new Passenger("Mehmet",Destination.ADANA));

    }






}
