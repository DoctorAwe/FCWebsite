package com.server.flowchartwebserver.vo.receive;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dr.Awe
 * @date 2023-11-11 12:50
 */

@Schema(name = "客户验证码登录数据包")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerLoginMessageToken {
    @NotNull
    @Schema(description = "手机号")
    private String tel;

    @NotNull
    @Schema(description = "验证码")
    private String code;
}
