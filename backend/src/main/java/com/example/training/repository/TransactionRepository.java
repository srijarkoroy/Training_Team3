package com.example.training.repository;

import com.example.training.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByTransactionId(Long transact);
    List<Transaction> findAllBySenderAccNo(Long senderAccNo);
}
