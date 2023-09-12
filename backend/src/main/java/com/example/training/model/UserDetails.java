package com.example.training.model;

import com.example.training.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetails {
    private User user;
    private Long accNo;
    private String transactionPassword;
}
