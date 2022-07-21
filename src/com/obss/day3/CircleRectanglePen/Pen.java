package com.obss.day3.CircleRectanglePen;

public class Pen {

    private Pen() {
    }

    static void draw(Rectangle r) {
        System.out.println("Area of the rectangle is:" + r.getArea());
    }

    static void draw(Circle c) {
        System.out.println("Area of the circle is:" + c.getArea());

    }

    static void  changeColor(String color, Rectangle r) {
        r.setColor(color);
        System.out.println("New color of the rectangle is: " + r.getColor());
    }

    static void changeColor(String color, Circle c) {
        c.setColor(color);
        System.out.println("New color of the circle is: " + c.getColor());
    }

}
