package com.obss.day5;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class OccurencesOfWords {

    public static void main(String[] args) throws IOException {

        String text = Files.readString(Paths.get("C:/Users/Süleyman/IdeaProjects/Java Ignite 2022/src/com/obss/day5/news.txt"));
        text = text.replaceAll("\\p{Punct}", "");
        text = text.toLowerCase();

        TreeMap<String, Integer> wordMap = new TreeMap<>();

        String[] wordArray = text.split(" ");
        for (String word : wordArray) {
            wordMap.put(word, wordMap.getOrDefault(word, 0) + 1);
        }

        for (Map.Entry<String, Integer> entry : wordMap.entrySet()) {
            System.out.println(entry);
        }


    }


}
