package com.server.flowchartwebserver.vo.receive;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dr.Awe
 * @date 2023-11-26 16:53
 */
@Schema(name = "流程图创建包")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlowChartCreate {

    @Schema(description = "名称")
    @NotNull
    private String name;

    @Schema(description = "描述")
    @NotNull
    private String description;

    @Schema(description = "内容")
    @NotNull
    private String content;

    @Schema(description = "创建时间")
    @NotNull
    private String time;

    @Schema(description = "领域")
    @NotNull
    private Long sub_industry;



}
