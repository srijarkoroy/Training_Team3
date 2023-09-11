package com.example.training.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name="transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name="transactionId")
    private Long transactionId;

    @Column(name="senderAccNo")
    private String senderAccNo;

    @Column(name="recipientAccNo")
    private String recipientAccNo;

    @Column(name="amount")
    private Float amount;

    @Column(name="timestamp")
    private Timestamp timestamp;

    @Column(name="statement")
    private String statement;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="phone")
    private Long phone;

}
