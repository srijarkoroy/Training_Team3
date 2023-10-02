package com.example.training.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerformTransactionDetails {
    private Long accNo;
    private Long recipientAccNo;
    private Float amount;
    private String transactionPassword;
    private String statement;
}
