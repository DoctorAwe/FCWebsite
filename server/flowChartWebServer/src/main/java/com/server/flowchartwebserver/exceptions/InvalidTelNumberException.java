package com.server.flowchartwebserver.exceptions;

/**
 * @author Dr.Awe
 * @date 2023-11-10 19:43
 */

public class InvalidTelNumberException extends Exception{
    public InvalidTelNumberException(String msg){
        super(msg);
    }
}
