package com.server.flowchartwebserver.dao;

import com.server.flowchartwebserver.pojo.customer.CustomerAccount;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Dr.Awe
 * @date 2023-11-08 15:26
 */
@Repository
public interface CustomerRepository extends JpaRepository<CustomerAccount, Long> {
    Optional<CustomerAccount> getCustomerAccountByUsername(String username);
    Optional<CustomerAccount> getCustomerAccountByTelNumber(String telNumber);
    Optional<CustomerAccount> getCustomerAccountById(Long id);
}
