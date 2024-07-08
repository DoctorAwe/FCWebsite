package com.server.flowchartwebserver.utils;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/**
 * @author Dr.Awe
 * @date 2023-11-10 17:02
 */
@Component
public class RedisUtils{


    private final String AVAILABLE_PREFIX = "available_";
    private final Long AVAILABLE_TIMEOUT = 3L*60;
    private final String TOKEN_PREFIX = "token_";
    private final Long TOKEN_TIMEOUT = 3L*60;
    private final String SESSION_PREFIX = "session_";
    private final int SESSION_TIMEOUT = 24;

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void addAvailable(String tel, String code) {
        try {
            if (tel != null) {
                redisTemplate
                        .opsForValue()
                        .set(AVAILABLE_PREFIX + tel, code,AVAILABLE_TIMEOUT, TimeUnit.SECONDS);
            }
        } catch (Exception e) {
            throw new RuntimeException("redis set failed");
        }
    }

    public String getAvailable(String tel) {
        try {
            String code = redisTemplate
                    .opsForValue()
                    .get(AVAILABLE_PREFIX + tel);
            return code;
        } catch (Exception e) {
            throw new RuntimeException("failed");
        }
    }
    public void setToken(String tel, String code){
        try {
            if (tel != null) {
                redisTemplate
                        .opsForValue()
                        .set(TOKEN_PREFIX + tel, code,TOKEN_TIMEOUT, TimeUnit.SECONDS);
            }
        } catch (Exception e) {
            throw new RuntimeException("redis set failed");
        }
    }

    public String getToken(String tel) {
        try {
            String code = redisTemplate
                    .opsForValue()
                    .get(TOKEN_PREFIX + tel);
            return code;
        } catch (Exception e) {
            throw new RuntimeException("redis set failed");
        }
    }

    public void setSession(String session, String uid){
        try {
            if (uid != null) {
                redisTemplate
                        .opsForValue()
                        .set(SESSION_PREFIX + uid, session,SESSION_TIMEOUT, TimeUnit.HOURS);
            }
        } catch (Exception e) {
            throw new RuntimeException("redis set failed");
        }
    }

    public String getSession(String uid) {
        try {
            String session = redisTemplate
                    .opsForValue()
                    .get(SESSION_PREFIX + uid);
            return session;
        } catch (Exception e) {
            throw new RuntimeException("redis set failed");
        }
    }
}
