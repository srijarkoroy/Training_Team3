package com.example.training.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long accNo;

    @Column(name="userId")
    private int userId;

    @Column(name="aadhaarNo")
    private long aadhaarNo;

    @Column(name="branch")
    private String branch;

    @Column(name="IFSC")
    private String ifsc;

    @Column(name="accType")
    private String accType;

    @Column(name="balance")
    private float balance;

    @Column(name="dateOfCreation")
    private LocalDate dateOfCreation;

    @Column(name="transactionPassword")
    private String transactionPassword;

    @Column(name="address")
    private String address;

}
