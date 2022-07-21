package com.obss.day4.CircleRectanglePenWithPolymorphism;

public class Pen {

    static void drawShape(Shape s) {
        System.out.println("Area of the shape is: " + s.getArea());
    }

    static void changeColor(Shape s, String color) {
        s.setColor(color);
    }


}
