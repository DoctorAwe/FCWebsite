package com.server.flowchartwebserver.service.impl;

import com.server.flowchartwebserver.dao.ServiceRepository;
import com.server.flowchartwebserver.pojo.business.ThirdService;
import com.server.flowchartwebserver.pojo.industry.SubIndustry;
import com.server.flowchartwebserver.service.IndustryService;
import com.server.flowchartwebserver.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Dr.Awe
 * @date 2024-01-02 20:21
 */
@Service
public class ServiceServiceImpl implements ServiceService {
    @Autowired
    private ServiceRepository repository;
    @Autowired
    private IndustryService industryService;


    @Override
    public void addService(String name, String url, String des, SubIndustry industry) {
        ThirdService service = new ThirdService();
        service.setName(name);
        service.setImage_url(url);
        service.setDescription(des);
        service.setIndustry(industry);
        repository.save(service);
    }

    @Override
    public List<ThirdService> getServiceBySubIndustry(Long subIndustry_id) {
        SubIndustry subIndustry = industryService.getSubIndustryById(subIndustry_id);
        return repository.findAllByIndustry(subIndustry);
    }
}
