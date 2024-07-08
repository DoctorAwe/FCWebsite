package com.server.flowchartwebserver.utils;

import org.springframework.stereotype.Component;

import java.util.Random;

/**
 * @author Dr.Awe
 * @date 2023-11-10 20:34
 */


public class RandomCodeGenerator {
    public static String generateRandomCode() {
        Random random = new Random();
        int randomNumber = random.nextInt(10000); // 生成 0 到 9999 之间的随机整数
        return String.format("%04d", randomNumber); // 保证生成的数字是四位，不足四位在前面补零
    }
}
