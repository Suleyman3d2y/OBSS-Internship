package com.obss.day3.BusReservation;

public class Passenger {

    private String name;
    private Destination destination;

    Passenger(String name, Destination destination) {
        this.name = name;
        this.destination = destination;
    }

    String getName() {
        return name;
    }

    void setName(String name) {
        this.name = name;
    }

    Destination getDestination() {
        return destination;
    }

    void setDestination(Destination destination) {
        this.destination = destination;
    }
}
