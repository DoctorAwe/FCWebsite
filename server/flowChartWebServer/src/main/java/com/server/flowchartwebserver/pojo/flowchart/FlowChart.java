package com.server.flowchartwebserver.pojo.flowchart;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.server.flowchartwebserver.pojo.customer.CustomerAccount;
import com.server.flowchartwebserver.pojo.industry.SubIndustry;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Entity
@Table(name = "flow_chart")
@Data
@NoArgsConstructor
public class FlowChart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "field")
    private SubIndustry field;


    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "customer_id")
    private CustomerAccount customer_id;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private String date;









}
