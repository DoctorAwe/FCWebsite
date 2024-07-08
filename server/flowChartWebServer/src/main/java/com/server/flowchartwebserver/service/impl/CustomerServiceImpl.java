package com.server.flowchartwebserver.service.impl;

import com.server.flowchartwebserver.dao.CustomerRepository;
import com.server.flowchartwebserver.dao.FlowChartRepository;
import com.server.flowchartwebserver.exceptions.*;
import com.server.flowchartwebserver.pojo.customer.CustomerAccount;
import com.server.flowchartwebserver.pojo.customer.CustomerAuthentication;
import com.server.flowchartwebserver.pojo.flowchart.FlowChart;
import com.server.flowchartwebserver.service.CustomerService;
import com.server.flowchartwebserver.service.FlowChartService;
import com.server.flowchartwebserver.service.SendSmsService;
import com.server.flowchartwebserver.utils.RandomCodeGenerator;
import com.server.flowchartwebserver.utils.RandomStringUtils;
import com.server.flowchartwebserver.utils.RedisUtils;
import com.server.flowchartwebserver.vo.receive.CustomerLoginAuthentication;
import com.server.flowchartwebserver.vo.receive.CustomerLoginMessageToken;
import com.server.flowchartwebserver.vo.receive.CustomerSignUp;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository repository;

    @Autowired
    private RedisUtils redisUtils;

    @Autowired
    FlowChartRepository flowChartRepository;

    @Autowired
    private SendSmsService sendSmsService;

    @Override
    public void addCustomer(CustomerSignUp data) throws CustomerAlreadyExistException, EmptyUsernameException, InvalidTelNumberException, RedisQueryFailedException, UnavailableTelNumberException, IncorrectCodeException {
        // 参数检查
//        if(data.getUsername()==null||data.getTel()==null||data.getEncrypted()==null||data.getCode()==null)
//            throw new EmptyUsernameException("dddd");
        // 用户名合法检验
        if (!data.getUsername().matches("[a-zA-Z0-9_]+")) {
            throw new EmptyUsernameException("invalid username");
        }
        //
        if (data.getTel().length() != 11) {
            throw new InvalidTelNumberException("invalid telephone number");

        }

        Optional<CustomerAccount> queryResult = repository.getCustomerAccountByUsername(data.getUsername());
        if (queryResult.isPresent()) {
            throw new CustomerAlreadyExistException("username already exist");
        }


        String code = null;
        try {
            code = redisUtils.getAvailable(data.getTel());
            code = code.substring(code.length() - 4);
            if (code == null) {
                throw new UnavailableTelNumberException("unavailable telephone number");
            }
        } catch (RuntimeException e) {
            throw new RedisQueryFailedException("redis query failed");
        }


        if (Objects.equals(data.getCode(), code)) {
            CustomerAccount account = new CustomerAccount();
            account.setUsername(data.getUsername());
            account.setTelNumber(data.getTel());
            CustomerAuthentication authentication = new CustomerAuthentication();
            authentication.setEncrypted(data.getEncrypted());
            account.setAuthentication(authentication);
            repository.save(account);
        } else throw new IncorrectCodeException("incorrect code");

    }

    @Override
    public void sendSignCode(String tel) throws DysmsApiInvokeFailedException, InvalidTelNumberException {
        if (!tel.matches("\\d{11}")) {
            throw new InvalidTelNumberException("invalid telephone number");
        }
        Optional<CustomerAccount> account = repository.getCustomerAccountByTelNumber(tel);
        if(account.isPresent()){
            throw new InvalidTelNumberException("tel already used");
        }

        String code = RandomCodeGenerator.generateRandomCode();

        String result = sendSmsService.sendSms(tel, code);
        if (!Objects.equals(result, "OK")){
            throw new DysmsApiInvokeFailedException(result);
        }
        redisUtils.addAvailable(tel,code);

    }

    @Override
    public void sendLoginCode(String tel) throws DysmsApiInvokeFailedException, InvalidTelNumberException, UnregisteredTelException {
        if (!tel.matches("\\d{11}")) {
            throw new InvalidTelNumberException("invalid telephone number");
        }
        Optional<CustomerAccount> account = repository.getCustomerAccountByTelNumber(tel);
        if (account.isPresent()){
            String code = RandomCodeGenerator.generateRandomCode();
            String result = sendSmsService.sendSms(tel, code);
            if (!Objects.equals(result, "OK")){
                throw new DysmsApiInvokeFailedException(result);
            }
            redisUtils.setToken(tel,code);
        }
        else throw new UnregisteredTelException("unregistered telephone number");
    }

    @Override
    public Map<String, String> loginByAuthentication(CustomerLoginAuthentication data) throws InvalidUsernameOrPasswordException {
        Optional<CustomerAccount> account = repository.getCustomerAccountByUsername(data.getUsername());
        if (account.isPresent()){
            String encrypted =  account.get().getAuthentication().getEncrypted();
            // 时间随机盐
            Objects.equals(RandomStringUtils.generateRandomString(256),data.getEncrypted());
            if(Objects.equals(data.getEncrypted(),encrypted)){
                // 登陆成功
                return getStringStringMap(account);

            }
        }
        throw new InvalidUsernameOrPasswordException("invalid username or password");
    }

    @Override
    public Map<String, String> loginByMessageToken(CustomerLoginMessageToken data) throws InvalidUsernameOrPasswordException {
        String token = null;
        token = redisUtils.getToken(data.getTel());
        if(token==null){
            throw new InvalidUsernameOrPasswordException("invalid tel or token code");
        }
        if(!token.equals(data.getCode())){
            throw new InvalidUsernameOrPasswordException("invalid tel or token code");
        }
        Optional<CustomerAccount> account = repository.getCustomerAccountByTelNumber(data.getTel());
        if (account.isPresent()){
            return getStringStringMap(account);
        }
        else throw new InvalidUsernameOrPasswordException("invalid tel or token code");
    }

    @Override
    public Boolean isUsernameAvailable(String username) {
        if (!username.matches("[a-zA-Z0-9_]+")) return false;
        Optional<CustomerAccount> account = repository.getCustomerAccountByUsername(username);
        return account.isEmpty();
    }

    @Override
    public CustomerAccount sessionCheck(HttpServletRequest request) {
        {
            String session_id = null;
            String uid = null;
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                // Iterate through the cookies
                for (Cookie cookie : cookies) {
                    // Check if the current cookie is the "session_id" cookie
                    if ("session".equals(cookie.getName())) {
                        session_id = cookie.getValue();
                        // Do something with the session_id
                    }

                    // Check if the current cookie is the "uid" cookie
                    if ("uid".equals(cookie.getName())) {
                        uid = cookie.getValue();

                    }
                }
            }
            if (Objects.equals(uid, "") || uid == null) throw new RuntimeException("session timeout");
            String session = redisUtils.getSession(uid);
            if (!Objects.equals(session, session_id)) throw new RuntimeException("session timeout");
            return repository.getCustomerAccountById(Long.valueOf(uid)).get();
        }
    }

    @Override
    public void addFlowChat(CustomerAccount account, FlowChart chart) {
        chart.setCustomer_id(account);
        flowChartRepository.save(chart);
    }

    @Override
    public void deleteFlowChart(CustomerAccount account, FlowChart chart) {
        for (FlowChart i:account.getFc_list()
             ) {
            if (Objects.equals(chart.getId(), i.getId()))
                flowChartRepository.delete(i);
        }

    }

    @Override
    public List<FlowChart> getAllFlowchart(CustomerAccount account) {
        return account.getFc_list();
    }

    @Override
    public void addTestUser() {
        CustomerAccount account = new CustomerAccount();
        account.setUsername("test");
        CustomerAuthentication authentication = new CustomerAuthentication();
        authentication.setEncrypted("123");
        account.setAuthentication(authentication);
        repository.save(account);
    }


    @NotNull
    private Map<String, String> getStringStringMap(Optional<CustomerAccount> account) {
        String session = RandomStringUtils.generateRandomString(128);
        String uid = String.valueOf(account.get().getId());
        redisUtils.setSession(session,uid);
        Map<String, String> keyValueMap = new HashMap<>();
        keyValueMap.put("session", session);
        keyValueMap.put("uid", uid);
        return keyValueMap;
    }


}