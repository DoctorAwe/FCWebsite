package com.server.flowchartwebserver.vo.receive;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dr.Awe
 * @date 2023-11-08 16:23
 */
@Schema(name = "客户注册数据包")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUp {

    @Schema(description = "用户名")
    @NotNull
    private String username;

    @Schema(description = "加密密码")
    @NotNull
    private String encrypted;

    @Schema(description = "注册手机号码")
    @NotNull
    private String tel;

    @Schema(description = "验证码")
    @NotNull
    private String code;


}
