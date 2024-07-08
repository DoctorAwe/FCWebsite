package com.server.flowchartwebserver.exceptions;

/**
 * @author Dr.Awe
 * @date 2023-11-10 19:39
 */

public class EmptyUsernameException extends Exception{
    public EmptyUsernameException(String msg){
        super(msg);
    }
}
