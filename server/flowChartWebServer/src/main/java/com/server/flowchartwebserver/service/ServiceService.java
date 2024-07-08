package com.server.flowchartwebserver.service;

import com.server.flowchartwebserver.pojo.business.ThirdService;
import com.server.flowchartwebserver.pojo.industry.SubIndustry;

import java.util.List;

/**
 * @author Dr.Awe
 * @date 2024-01-02 20:19
 */

public interface ServiceService {
    void addService(String name, String url, String des, SubIndustry industry);
    List<ThirdService> getServiceBySubIndustry(Long subIndustry_id);
}
