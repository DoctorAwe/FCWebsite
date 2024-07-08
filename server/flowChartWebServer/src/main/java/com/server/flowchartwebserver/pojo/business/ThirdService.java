package com.server.flowchartwebserver.pojo.business;

import com.server.flowchartwebserver.pojo.industry.SubIndustry;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dr.Awe
 * @date 2024-01-02 15:55
 */
@Entity
@Table(name = "service")
@Data
@NoArgsConstructor
public class ThirdService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String image_url;

    @ManyToOne
    @JoinColumn(name = "industry")
    private SubIndustry industry;

}
