package com.server.flowchartwebserver.service;

import com.server.flowchartwebserver.pojo.industry.Industry;
import com.server.flowchartwebserver.pojo.industry.SubIndustry;

import java.util.List;
import java.util.Optional;

/**
 * @author Dr.Awe
 * @date 2023-11-26 10:46
 */

public interface IndustryService {
    void addIndustry(String name);
    void addSubIndustry(String name, String super_name);
    List<Industry> getAllIndustry();
    SubIndustry getSubIndustryById(Long id);
    List<SubIndustry> getAllSubIndustry();
}
