package com.example.training.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerformTransactionDetails {
    private Long accNo;
    private Long recipientAccNo;
    private Long amount;
    private String transactionPassword;

}
