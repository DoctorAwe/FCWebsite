package com.server.flowchartwebserver.pojo.customer;

import jakarta.persistence.*;
import lombok.Data;


import lombok.NoArgsConstructor;

@Entity
@Table(name = "customer_authentication")
@Data
@NoArgsConstructor
public class CustomerAuthentication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "encrypted")
    private String encrypted;


}
