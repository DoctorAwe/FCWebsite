package com.server.flowchartwebserver.dao;

import com.server.flowchartwebserver.pojo.industry.SubIndustry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Dr.Awe
 * @date 2023-11-26 10:45
 */

public interface SubIndustryRepository extends JpaRepository<SubIndustry,Long>{
    Optional<SubIndustry>getSubIndustryById(Long id);
}
