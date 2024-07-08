package com.server.flowchartwebserver.pojo.customer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.server.flowchartwebserver.pojo.flowchart.FlowChart;
import com.server.flowchartwebserver.pojo.industry.SubIndustry;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Table(name = "customer_account")
@Data
@NoArgsConstructor
public class CustomerAccount {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 认证方式
    // 1.短信认证
    @Column(name = "tel_number")
    private String telNumber;

    // token在redis缓存中

    // 2.用户名认证
    @Column(name = "username")
    private String username;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "authentication")
    private CustomerAuthentication authentication;

    // 用户信息
    // 1.电子邮箱
    @Column(name = "email")
    private String email;

    // 2.收货地址
    @Column(name = "delivery_address")
    private String delivery_address;

    // 3.头像
    @Column(name = "avatar")
    private String avatar;

    // 4.性别
    @Column(name = "gender")
    private Boolean gender;

    // 5.从事领域
    @OneToMany
    @JoinColumn(name = "work_field")
    private List<SubIndustry> work_field;

    // 6.所属流程图
    @JsonIgnoreProperties("customer_id")
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "customer_id")
    private List<FlowChart> fc_list;

}
