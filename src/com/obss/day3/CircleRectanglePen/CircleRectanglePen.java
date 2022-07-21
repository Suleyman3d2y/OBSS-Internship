package com.obss.day3.CircleRectanglePen;

public class CircleRectanglePen {

    public static void main(String[] args) {

        Circle circle = new Circle(5,"blue");
        Rectangle rectangle = new Rectangle(5,2,"red");

        System.out.println("Circle color before change: " + circle.getColor());
        System.out.println("Rectangle color before change: " + rectangle.getColor());

        Pen.changeColor("yellow",rectangle);
        Pen.changeColor("green",circle);

        System.out.println();

        Pen.draw(circle);
        Pen.draw(rectangle);


    }
}
