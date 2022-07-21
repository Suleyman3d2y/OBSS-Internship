package com.obss.day3.CircleRectanglePen;

public class Circle {
    private int radius;
    private String color;

    Circle(int radius, String color) {
        this.radius = radius;
        this.color = color;
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

    double getArea() {
        return Math.PI*radius*radius;
    }
}
