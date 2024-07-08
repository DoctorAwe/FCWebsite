package com.server.flowchartwebserver.vo.receive;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * @author Dr.Awe
 * @date 2023-11-10 21:07
 */

@Schema(name = "注册验证手机数据包")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpTelephoneNumber {
    @NotNull
    @Schema(description = "电话号码")
    private String telNumber;
}
