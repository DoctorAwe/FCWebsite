package com.server.flowchartwebserver.service.impl;

import com.server.flowchartwebserver.dao.IndustryRepository;
import com.server.flowchartwebserver.dao.SubIndustryRepository;
import com.server.flowchartwebserver.pojo.industry.Industry;
import com.server.flowchartwebserver.pojo.industry.SubIndustry;
import com.server.flowchartwebserver.service.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Dr.Awe
 * @date 2023-11-26 10:47
 */
@Service
public class IndustryServiceImpl implements IndustryService {

    @Autowired
    private IndustryRepository repository;
    @Autowired
    private SubIndustryRepository sub_repository;
    @Override
    public void addIndustry(String name) {
        Industry industry = new Industry();
        industry.setName(name);
        repository.save(industry);
    }

    @Override
    public void addSubIndustry(String name, String super_name) {
        Industry industry = repository.getIndustryByName(super_name);
        SubIndustry subIndustry = new SubIndustry();
        subIndustry.setName(name);
        subIndustry.setSuper_id(industry);
        sub_repository.save(subIndustry);
    }

    @Override
    public List<Industry> getAllIndustry() {
        return repository.findAll();
    }

    @Override
    public SubIndustry getSubIndustryById(Long id) {
        return sub_repository.getSubIndustryById(id).get();
    }

    @Override
    public List<SubIndustry> getAllSubIndustry() {
        return sub_repository.findAll();
    }
}
