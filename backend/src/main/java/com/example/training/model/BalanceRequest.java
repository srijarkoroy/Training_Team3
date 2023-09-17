package com.example.training.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BalanceRequest {
    private Long accNo;
    private String transactionPassword;
}
