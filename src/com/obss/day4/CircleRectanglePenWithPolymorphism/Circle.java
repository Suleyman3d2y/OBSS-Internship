package com.obss.day4.CircleRectanglePenWithPolymorphism;

public class Circle extends Shape {

    private int radius;
    private String color;

    Circle(int radius, String color) {
        this.radius = radius;
        this.color = color;
    }

    double getArea() {
        return radius * Math.PI * Math.PI;

    }

    int getRadius() {
        return radius;
    }

    void setRadius(int radius) {
        this.radius = radius;
    }

    String getColor() {
        return color;
    }

    void setColor(String color) {
        this.color = color;
    }
}
