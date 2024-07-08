package com.server.flowchartwebserver.dao;

import com.server.flowchartwebserver.pojo.industry.Industry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Dr.Awe
 * @date 2023-11-26 10:43
 */

public interface IndustryRepository extends JpaRepository<Industry,Long> {
    Industry getIndustryByName(String name);

}
