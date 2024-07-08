package com.server.flowchartwebserver.utils;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

/**
 * @author Dr.Awe
 * @date 2023-11-11 10:00
 */


public class RandomStringUtils {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom random = new SecureRandom();

    public static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }
}
