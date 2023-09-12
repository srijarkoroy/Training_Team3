package com.example.training.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Valid
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

    @NotNull
    @Size(min=11,max=11, message="Account Number should be 11-digits long")
    @Column(name="senderAccNo")
    private String senderAccNo;

    @NotNull
    @Size(min=11,max=11, message="Account Number should be 11-digits long")
    @Column(name="recipientAccNo")
    private String recipientAccNo;

    @NotNull
    @Min(value=1, message="Minimum transaction amount is 1")
    @Column(name="amount")
    private Float amount;

    @Column(name="timestamp")
    private Timestamp timestamp;

    @Column(name="statement")
    private String statement;

    @Column(name="email")
    @Email
    private String email;

    @Column(name="password")
    @Size(min=8)
    private String password;

//    @Size(min=10,max=10)
    @Column(name="phone")
    private Long phone;

}
