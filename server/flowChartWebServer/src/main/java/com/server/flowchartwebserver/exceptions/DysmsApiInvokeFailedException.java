package com.server.flowchartwebserver.exceptions;

/**
 * @author Dr.Awe
 * @date 2023-11-10 20:40
 */

public class DysmsApiInvokeFailedException extends Exception{
    public DysmsApiInvokeFailedException(String msg){
        super(msg);
    }
}
