package com.obss.day2;

import java.util.Scanner;

public class GradeBookCalculator {

    public static void main(String[] args) {

        double grade;
        double sum = 0;
        int count = 0;
        int lowerLimit = 0;
        int upperLimit = 101;

        do {
            //for validation
            while (true) {
                System.out.println("Enter your grade: (101 to exit)");
                Scanner sc = new Scanner(System.in);
                grade = sc.nextInt();
                if (grade > lowerLimit && grade <= upperLimit) {
                    break;
                }
                System.out.println("Please enter a valid grade between 0-100 and 101 for exit");
            }

            if (grade == 101) {
                break;
            }

            sum += grade;
            count++;


        } while (true);

        if (count != 0) {
            double avgGrade = sum / count;
            System.out.println("Your average grade is: " + avgGrade);
        } else {
            System.out.println("You did not entered any grade");
        }


    }

}
