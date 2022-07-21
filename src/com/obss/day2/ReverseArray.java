package com.obss.day2;

public class ReverseArray {
    //Method for reversing arrays.
    public static int[] reverseArray(int[] arr) {
        int size = arr.length;
        int[] reversed = new int[size];
        for (int i = 0; i < size; i++) {
            reversed[i] = arr[size - i - 1];
        }
        return reversed;
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int size = 10;
        int[] array = new int[size];
        //Fill the array with random ints between 0 and 10.
        for (int i = 0; i < size; i++) {
            array[i] = (int) (Math.random() * 10);
        }
        //Reverse and print unchanged version and reversed version.
        int[] reversedArray = reverseArray(array);
        System.out.println("Unchanged Array: ");
        printArray(array);

        System.out.println("\nReversed Array: ");
        printArray(reversedArray);

    }
}
