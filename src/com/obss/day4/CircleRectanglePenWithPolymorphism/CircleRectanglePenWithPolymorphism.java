package com.obss.day4.CircleRectanglePenWithPolymorphism;

public class CircleRectanglePenWithPolymorphism {

    public static void main(String[] args) {
        Shape rectangle = new Rectangle(5, 2, "blue");
        Shape circle = new Circle(5, "red");

        System.out.println("Circle color before: " + circle.getColor());
        Pen.changeColor(circle, "yellow");
        System.out.println("Circle color after: " + circle.getColor());

        System.out.println("Rectangle color before: " + rectangle.getColor());
        Pen.changeColor(rectangle, "purple");
        System.out.println("Rectangle color after: " + rectangle.getColor());


        Pen.drawShape(rectangle);
        Pen.drawShape(circle);


    }

}
