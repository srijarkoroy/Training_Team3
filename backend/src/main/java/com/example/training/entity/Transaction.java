package com.example.training.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name="transaction")
public class Transaction {
    @Id
    @GeneratedValue(generator = "sequence-generator2")
    @GenericGenerator(
            name = "sequence-generator2",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "transcation_sequence"),
                    @Parameter(name = "initial_value", value = "1"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
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
