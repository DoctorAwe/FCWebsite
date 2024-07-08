package com.server.flowchartwebserver.exceptions;

/**
 * @author Dr.Awe
 * @date 2023-11-10 20:02
 */

public class RedisQueryFailedException extends Exception{
    public RedisQueryFailedException(String msg){
        super(msg);
    }

}
