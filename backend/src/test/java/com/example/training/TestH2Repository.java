package com.example.training;

import com.example.training.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestH2Repository extends JpaRepository<Transaction, Long> {
}
