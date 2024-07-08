package com.server.flowchartwebserver.dao;

import com.server.flowchartwebserver.pojo.business.ThirdService;
import com.server.flowchartwebserver.pojo.industry.SubIndustry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Dr.Awe
 * @date 2024-01-02 20:22
 */

public interface ServiceRepository extends JpaRepository<ThirdService,Long> {
    List<ThirdService> findAllByIndustry(SubIndustry subIndustry);
}
