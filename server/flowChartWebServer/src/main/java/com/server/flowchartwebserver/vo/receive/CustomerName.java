package com.server.flowchartwebserver.vo.receive;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dr.Awe
 * @date 2023-11-11 19:32
 */

@Schema(name = "客户用户名数据包")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerName {

    @NotNull
    @Schema(description = "用户名")
    private String username;
}
