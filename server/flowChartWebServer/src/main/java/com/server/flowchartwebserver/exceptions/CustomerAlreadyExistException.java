package com.server.flowchartwebserver.exceptions;

/**
 * @author Dr.Awe
 * @date 2023-11-10 12:29
 */

public class CustomerAlreadyExistException extends Exception{
    public CustomerAlreadyExistException(String message) {
        super(message);
    }
}
