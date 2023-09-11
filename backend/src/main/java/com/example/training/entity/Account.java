package com.example.training.entity;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="account")
public class Account {
    @Id
    @GeneratedValue(generator = "sequence-generator3")
    @GenericGenerator(
            name = "sequence-generator3",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "account_sequence"),
                    @Parameter(name = "initial_value", value = "1000000000"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
    private Long accNo;

    @Column(name="userId")
    private Integer userId;

    @Column(name="aadhaarNo")
    private long aadhaarNo;

    @Column(name="branch")
    private String branch;

    @Column(name="IFSC")
    private String ifsc;

    @Column(name="accType")
    private String accType;

    @Column(name="balance")
    private Float balance;

    @Column(name="dateOfCreation")
    private LocalDate dateOfCreation;

    @Column(name="transactionPassword")
    @Size(min=4,max=12)
    private String transactionPassword;

    @Column(name="address")
    private String address;

}
