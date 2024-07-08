package com.server.flowchartwebserver.vo.send;


import com.server.flowchartwebserver.pojo.business.ThirdService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dr.Awe
 * @date 2024-01-02 21:25
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThirdServiceSend {
    private Long id;

    private String name;

    private String description;

    private String image_url;


    public static ThirdServiceSend convert(ThirdService service){
        return new ThirdServiceSend(service.getId(),service.getName(),service.getDescription(),service.getImage_url());
    }

}
