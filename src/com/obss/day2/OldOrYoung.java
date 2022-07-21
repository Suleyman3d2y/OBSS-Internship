package com.obss.day2;

import java.util.Scanner;

public class OldOrYoung {

    public static void main(String[] args) {

        int age = 0;
        int lowerLimit = 1;
        int upperLimit = 120;
        int treshHold = 50;

        //for validation
        while (true) {
            System.out.println("Enter your age:");
            Scanner sc = new Scanner(System.in);
            age = sc.nextInt();
            if ((age > lowerLimit && age < upperLimit)) {
                break;
            } else {
                System.out.println("Please enter a valid age.");
            }
            sc.close();
        }

        if (age < treshHold) {
            System.out.println("You are young");
        } else {
            System.out.println("You are old");
        }


    }

}
