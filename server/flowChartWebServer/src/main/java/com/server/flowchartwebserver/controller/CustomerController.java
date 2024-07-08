package com.server.flowchartwebserver.controller;



import com.server.flowchartwebserver.exceptions.*;
import com.server.flowchartwebserver.pojo.business.ThirdService;
import com.server.flowchartwebserver.pojo.customer.CustomerAccount;
import com.server.flowchartwebserver.pojo.flowchart.FlowChart;
import com.server.flowchartwebserver.service.CustomerService;
import com.server.flowchartwebserver.service.FlowChartService;
import com.server.flowchartwebserver.service.IndustryService;
import com.server.flowchartwebserver.service.ServiceService;
import com.server.flowchartwebserver.vo.JsonResult;
import com.server.flowchartwebserver.vo.receive.*;
import com.server.flowchartwebserver.vo.send.NonData;
import com.server.flowchartwebserver.vo.send.ThirdServiceSend;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/user")
@Tag(name = "User Api")
public class CustomerController {
    // 日志
    private final static Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private FlowChartService flowChartService;

    @Autowired
    private ServiceService serviceService;

    @PostConstruct
    public void userInit(){
        customerService.addTestUser();
    }

    @CrossOrigin
    @PostMapping("/sign_up")
    @Operation(summary = "客户注册接口")
    public JsonResult<NonData> signUp(@Validated @RequestBody CustomerSignUp user) {
        try {
            customerService.addCustomer(user);
            return JsonResult.success();
        }
        catch (CustomerAlreadyExistException | EmptyUsernameException | InvalidTelNumberException | RedisQueryFailedException | UnavailableTelNumberException | IncorrectCodeException e){
            return JsonResult.error(1,e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/send_code")
    @Operation(summary = "注册时验证手机")
    public JsonResult<NonData> sendCode(@RequestBody SignUpTelephoneNumber tel) {
        logger.info("send_code");
        try {
            customerService.sendSignCode(tel.getTelNumber());
        }
        catch (InvalidTelNumberException | DysmsApiInvokeFailedException e) {
            return JsonResult.error(1,e.getMessage());
        }

        return JsonResult.success();
    }

    @CrossOrigin
    @PostMapping("/login")
    @Operation(summary = "用户登录",description = "返回会话密钥在header的set-cookie中")
    public JsonResult<NonData> login(@RequestBody CustomerLoginAuthentication data, HttpServletResponse response){
        try {
            Map<String, String> cookies = customerService.loginByAuthentication(data);
            response.addCookie(new Cookie("session",cookies.get("session")));
            response.addCookie(new Cookie("uid",cookies.get("uid")));
            return JsonResult.success();
        } catch (InvalidUsernameOrPasswordException e) {
            return JsonResult.error(1,e.getMessage());
        }

    }

    @CrossOrigin
    @PostMapping("/send_token")
    @Operation(summary = "登录时验证手机")
    public JsonResult<NonData> sendToken(@RequestBody SignUpTelephoneNumber tel) {
        logger.info("send_token");
        try {
            customerService.sendLoginCode(tel.getTelNumber());
            return JsonResult.success();
        }
        catch (InvalidTelNumberException | DysmsApiInvokeFailedException | UnregisteredTelException e) {
            return JsonResult.error(1,e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/login_token")
    @Operation(summary = "用户登录/验证码",description = "返回会话密钥在header的set-cookie中")
    public JsonResult<NonData> loginToken(@RequestBody CustomerLoginMessageToken data, HttpServletResponse response){
        try {
            Map<String, String> cookies = customerService.loginByMessageToken(data);
            response.addCookie(new Cookie("session",cookies.get("session")));
            response.addCookie(new Cookie("uid",cookies.get("uid")));
            return JsonResult.success();
        } catch (InvalidUsernameOrPasswordException e) {
            return JsonResult.error(1,e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/username_check")
    @Operation(summary = "检验用户名是否可用")
    public JsonResult<NonData> IsUsernameAvailable(@RequestBody @Valid CustomerName data){
        if (customerService.isUsernameAvailable(data.getUsername())){
            return JsonResult.success();
        }
        else return JsonResult.error(1,"already be used");
    }

    @CrossOrigin
    @PostMapping("/create_flowchart")
    @Operation(summary = "创建流程图")
    public JsonResult<NonData> createFlowchart(@RequestBody @Valid FlowChartCreate data, HttpServletRequest request){

//        if (customerService.isUsernameAvailable(data.getUsername())){
//            return JsonResult.success();
//        }
        try {
            CustomerAccount account = customerService.sessionCheck(request);


            FlowChart flowChart = flowChartService.createFlowChart(data);

            customerService.addFlowChat(account,flowChart);
            return JsonResult.success();
        }
        catch (Exception e){
            return JsonResult.error(1,e.getMessage());
        }
    }


    @CrossOrigin
    @PostMapping("/get_flowchart")
    @Operation(summary = "获取所有流程图")
    public JsonResult<List<FlowChart>> getAllFlowchart(HttpServletRequest request){

//        if (customerService.isUsernameAvailable(data.getUsername())){
//            return JsonResult.success();
//        }
        try{

            CustomerAccount account = customerService.sessionCheck(request);
            return JsonResult.success(account.getFc_list());
        }
        catch (Exception e){
            return JsonResult.error(1,e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/user_info")
    @Operation(summary = "用户基本信息")
    public JsonResult<CustomerAccount> getInfo(HttpServletRequest request) {

//        if (customerService.isUsernameAvailable(data.getUsername())){
//            return JsonResult.success();
//        }
        try {
            CustomerAccount account = customerService.sessionCheck(request);
            return JsonResult.success(account);
        } catch (Exception e) {
            return JsonResult.error(1, e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/get_service")
    @Operation(summary = "获取服务列表")
    public JsonResult<List<ThirdServiceSend>> getService(long subIndustry_id) {

        try {
            List<ThirdServiceSend> list = new ArrayList<>();
            for (ThirdService service:serviceService.getServiceBySubIndustry(subIndustry_id)
                 ) {
                list.add(ThirdServiceSend.convert(service));
            }
            return JsonResult.success(list);
        } catch (Exception e) {
            return JsonResult.error(1, e.getMessage());
        }
    }


}





