package com.server.flowchartwebserver.service;

import com.server.flowchartwebserver.exceptions.DysmsApiInvokeFailedException;

/**
 * @author Dr.Awe
 * @date 2023-11-11 9:09
 */
@FunctionalInterface
public interface SendSmsService {
    String sendSms(String tel, String msg)  throws DysmsApiInvokeFailedException ;
}
