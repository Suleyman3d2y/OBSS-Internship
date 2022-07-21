package com.obss.day3.BusReservation;

public class Bus {

    private Destination destination;
    private Passenger[] passengers;

    Bus(Destination destination, Passenger[] passengers) {
        this.destination = destination;
        this.passengers = passengers;


    }

    Destination getDestination() {
        return destination;
    }

    void setDestination(Destination destination) {
        this.destination = destination;
    }

    Passenger[] getPassengers() {
        return passengers;
    }

    void setPassengers(Passenger[] passengers) {
        this.passengers = passengers;
    }

    void insertPassenger(Passenger passenger) {
        boolean full = true;
        int emptyIndex = 0;
        //Check if bus is full.
        for (int i = 0; i < passengers.length; i++) {
            if (passengers[i] == null) {
                full = false;
                emptyIndex = i;
                break;
            }
        }

        //If destination is correct and the bus has empty places.
        if (destination == passenger.getDestination() && !full) {
            passengers[emptyIndex] = passenger;
            System.out.println("Passenger inserted");
        //If destination is correct but the is full.
        } else if (destination == passenger.getDestination() && full) {
            System.out.println("The bus is full");
        //If destination is not correct.
        } else {
            System.out.println("Destinations do not match.");
        }

    }

}
