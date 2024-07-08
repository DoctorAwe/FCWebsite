package com.server.flowchartwebserver.exceptions;

/**
 * @author Dr.Awe
 * @date 2023-11-11 9:51
 */

public class InvalidUsernameOrPasswordException extends Exception{
    public InvalidUsernameOrPasswordException(String msg){
        super(msg);
    }
}
