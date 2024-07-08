package com.server.flowchartwebserver.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.flowchartwebserver.pojo.industry.Industry;
import com.server.flowchartwebserver.pojo.industry.SubIndustry;
import com.server.flowchartwebserver.service.IndustryService;
import com.server.flowchartwebserver.service.ServiceService;
import com.server.flowchartwebserver.vo.JsonResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/industry")
@Tag(name = "test Api")
public class TestController {
    @Autowired
    IndustryService industryService;
    @Autowired
    ServiceService serviceService;

    @PostConstruct
    public String industryInit() {
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
                industryService.addIndustry(key);

                JsonNode valueNode = entry.getValue();

                // 如果值是一个列表，则遍历列表
                if (valueNode.isArray()) {
                    for (JsonNode element : valueNode) {
                        // 对列表中的每个元素进行操作，这里假设元素是字符串
                        String elementValue = element.asText();
                        industryService.addSubIndustry(elementValue,key);
                    }
                 }
            }
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        // 初始化服务测试
        try {
            List<SubIndustry> list = industryService.getAllSubIndustry();
            for (SubIndustry industry:list
            ) {
                for (int i = 0; i < 10; i++) {
                    serviceService.addService(industry.getName()+"服务"+Integer.toString(i),"https://www.dmoe.cc/random.php","这里是示例描述文本",industry);
                }

            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }


        return "success";
    }






    @CrossOrigin
    @GetMapping("/get-all")
    @Operation(summary = "get all")
    public JsonResult<List<Industry>> getAll() {

        return JsonResult.success(industryService.getAllIndustry());
    }



}
