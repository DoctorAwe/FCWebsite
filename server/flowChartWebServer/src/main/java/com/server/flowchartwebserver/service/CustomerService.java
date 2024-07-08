package com.server.flowchartwebserver.service;


import com.server.flowchartwebserver.exceptions.*;
import com.server.flowchartwebserver.pojo.customer.CustomerAccount;
import com.server.flowchartwebserver.pojo.flowchart.FlowChart;
import com.server.flowchartwebserver.vo.receive.CustomerLoginAuthentication;
import com.server.flowchartwebserver.vo.receive.CustomerLoginMessageToken;
import com.server.flowchartwebserver.vo.receive.CustomerSignUp;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

/**
 * @author Dr.Awe
 * @date 2023-11-08 16:17
 */

public interface CustomerService {
    void addCustomer(CustomerSignUp data) throws CustomerAlreadyExistException, EmptyUsernameException, InvalidTelNumberException, RedisQueryFailedException, UnavailableTelNumberException, IncorrectCodeException;
    void sendSignCode(String tel)throws DysmsApiInvokeFailedException, InvalidTelNumberException;
    void sendLoginCode(String tel) throws DysmsApiInvokeFailedException, InvalidTelNumberException, UnregisteredTelException;
    Map<String, String> loginByAuthentication(CustomerLoginAuthentication data) throws InvalidUsernameOrPasswordException;
    Map<String, String> loginByMessageToken(CustomerLoginMessageToken data) throws InvalidUsernameOrPasswordException;
    Boolean isUsernameAvailable(String username);
    CustomerAccount sessionCheck(HttpServletRequest request);
    void addFlowChat(CustomerAccount account, FlowChart chart);
    void deleteFlowChart(CustomerAccount account,FlowChart chart);

    List<FlowChart> getAllFlowchart(CustomerAccount account);


    void addTestUser();

}
