package com.server.flowchartwebserver.service.impl;

import com.server.flowchartwebserver.dao.FlowChartRepository;
import com.server.flowchartwebserver.pojo.flowchart.FlowChart;
import com.server.flowchartwebserver.service.FlowChartService;
import com.server.flowchartwebserver.service.IndustryService;
import com.server.flowchartwebserver.vo.receive.FlowChartCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Dr.Awe
 * @date 2023-11-26 17:13
 */
@Service
public class FlowChartServiceImpl implements FlowChartService {
    @Autowired
    FlowChartRepository flowChartRepository;

    @Autowired
    IndustryService industryService;

    @Override
    public FlowChart createFlowChart(FlowChartCreate data) {
        FlowChart flowChart = new FlowChart();
        flowChart.setName(data.getName());
        flowChart.setContent(data.getContent());
        flowChart.setDescription(data.getDescription());
        flowChart.setField(industryService.getSubIndustryById(data.getSub_industry()));
        flowChart.setDate(data.getTime());
        flowChartRepository.save(flowChart);
        return flowChart;

    }
}
