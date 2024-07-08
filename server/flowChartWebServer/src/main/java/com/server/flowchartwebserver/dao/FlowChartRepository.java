package com.server.flowchartwebserver.dao;

import com.server.flowchartwebserver.pojo.flowchart.FlowChart;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Dr.Awe
 * @date 2023-11-26 16:40
 */

public interface FlowChartRepository extends JpaRepository<FlowChart,Long> {
    Optional<FlowChart>getFlowChartById(Long id);
    void deleteById(@NotNull Long id);


}
