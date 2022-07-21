package com.obss.day4.CircleRectanglePenWithPolymorphism;

public class Rectangle extends Shape {

    private int width;
    private int height;
    private String color;

    Rectangle(int width, int height, String color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    int getWidth() {
        return width;
    }

    void setWidth(int width) {
        this.width = width;
    }

    int getHeight() {
        return height;
    }

    void setHeight(int height) {
        this.height = height;
    }

    String getColor() {
        return color;
    }

    void setColor(String color) {
        this.color = color;
    }

    double getArea() {
        return height * width * 0.5;

    }

}
