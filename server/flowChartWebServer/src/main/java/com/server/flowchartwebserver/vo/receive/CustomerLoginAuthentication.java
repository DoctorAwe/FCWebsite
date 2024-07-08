package com.server.flowchartwebserver.vo.receive;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dr.Awe
 * @date 2023-11-11 9:44
 */

@Schema(name = "客户密码登录数据包")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerLoginAuthentication {

    @NotNull
    @Schema(description = "用户名")
    private String username;

    @NotNull
    @Schema(description = "加密密码")
    private String encrypted;

}
