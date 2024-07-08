package com.server.flowchartwebserver;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.flowchartwebserver.dao.CustomerRepository;
import com.server.flowchartwebserver.pojo.customer.CustomerAccount;
import com.server.flowchartwebserver.pojo.customer.CustomerAuthentication;
import com.server.flowchartwebserver.vo.receive.CustomerSignUp;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;


@SpringBootTest
class FlowChartWebServerApplicationTests {
    @Autowired
    CustomerRepository customerRepository;



    @Test
    void contextLoads() {
    }

    @Test

    void test(){
        try {
            // 指定JSON文件的路径
            File jsonFile = new File("src/main/resources/json/industry");

            // 创建ObjectMapper实例
            ObjectMapper objectMapper = new ObjectMapper();

            // 使用ObjectMapper读取JSON文件并将其映射为JsonNode对象
            JsonNode jsonNode = objectMapper.readTree(jsonFile);

            // 遍历所有的键
            Iterator<Map.Entry<String, JsonNode>> fields = jsonNode.fields();
            while (fields.hasNext()) {
                Map.Entry<String, JsonNode> entry = fields.next();
                String key = entry.getKey();
                JsonNode valueNode = entry.getValue();

                // 如果值是一个列表，则遍历列表
                if (valueNode.isArray()) {
                    System.out.println("Key: " + key);
                    System.out.println("Values:");

                    for (JsonNode element : valueNode) {
                        // 对列表中的每个元素进行操作，这里假设元素是字符串
                        String elementValue = element.asText();
                        System.out.println("- " + elementValue);
                    }

                    System.out.println();
                }
            }
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }



}
