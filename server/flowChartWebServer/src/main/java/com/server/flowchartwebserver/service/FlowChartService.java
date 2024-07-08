package com.server.flowchartwebserver.service;

import com.server.flowchartwebserver.pojo.flowchart.FlowChart;
import com.server.flowchartwebserver.vo.receive.FlowChartCreate;

/**
 * @author Dr.Awe
 * @date 2023-11-26 17:12
 */

public interface FlowChartService {
    FlowChart createFlowChart(FlowChartCreate data);
}
