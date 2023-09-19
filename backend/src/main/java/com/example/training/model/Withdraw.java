package com.example.training.model;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Withdraw {
    private Long accNo;
    private Float amount;
    private String transactionPassword;
}
