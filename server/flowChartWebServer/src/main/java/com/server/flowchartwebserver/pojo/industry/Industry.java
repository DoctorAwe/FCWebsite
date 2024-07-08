package com.server.flowchartwebserver.pojo.industry;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Entity
@Table(name = "industry")
@Data
@NoArgsConstructor
public class Industry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties("super_id")
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "super_id")
    private List<SubIndustry> sub_list;

    @Column(name = "name")
    private String name;
}
