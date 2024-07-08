package com.server.flowchartwebserver.service.impl;


import com.google.gson.Gson;
import com.server.flowchartwebserver.exceptions.DysmsApiInvokeFailedException;
import com.server.flowchartwebserver.service.SendSmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aliyun.tea.*;
import java.util.concurrent.CompletableFuture;

/**
 * @author Dr.Awe
 * @date 2023-11-11 9:10
 */

@Service
public class SendSmsServiceImpl implements SendSmsService {

    public SendSmsServiceImpl() throws Exception {
    }

    public static com.aliyun.dysmsapi20170525.Client createClient(String accessKeyId, String accessKeySecret) throws Exception {
        com.aliyun.teaopenapi.models.Config config = new com.aliyun.teaopenapi.models.Config()
                // 必填，您的 AccessKey ID
                .setAccessKeyId(accessKeyId)
                // 必填，您的 AccessKey Secret
                .setAccessKeySecret(accessKeySecret);
        // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
        config.endpoint = "dysmsapi.aliyuncs.com";
        return new com.aliyun.dysmsapi20170525.Client(config);
    }


    @Override
    public String sendSms(String tel, String msg) throws DysmsApiInvokeFailedException {
        try {
            com.aliyun.dysmsapi20170525.Client client = createClient("appkey", "secretKey");
            com.aliyun.dysmsapi20170525.models.SendSmsRequest sendSmsRequest = new com.aliyun.dysmsapi20170525.models.SendSmsRequest()
                    .setSignName("王鑫磊的短信")
                    .setTemplateCode("SMS_463790378")
                    .setPhoneNumbers(tel)
                    .setTemplateParam("{\"code\":\"" + msg + "\"}");
            com.aliyun.teautil.models.RuntimeOptions runtime = new com.aliyun.teautil.models.RuntimeOptions();

                // 复制代码运行请自行打印 API 的返回值
            com.aliyun.dysmsapi20170525.models.SendSmsResponse response = client.sendSmsWithOptions(sendSmsRequest, runtime);
            return response.getBody().getMessage();
            // Asynchronous processing of return values
        /*response.thenAccept(resp -> {
            System.out.println(new Gson().toJson(resp));
        }).exceptionally(throwable -> { // Handling exceptions
            System.out.println(throwable.getMessage());
            return null;
        });*/
            // Finally, close the client

        } catch (Exception e) {
            throw new DysmsApiInvokeFailedException("dysmsApi invoke failed");
        }

    }
}
