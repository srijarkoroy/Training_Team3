package com.example.training.entity;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Valid
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

//    @NotNull
    @Column(name="userId")
    private Integer userId;

    @Column(name="aadhaarNo")
    @NotNull
//    @Size(min=12, max=12, message="Aadhar Number should be 12-digits long")
    private long aadhaarNo;

    @Column(name="branch")
    private String branch;

    @NotNull
    @Size(min=11,max=11, message="IFSC code should be 11-characters long")
    @Column(name="IFSC")
    private String ifsc;

    @NotNull
    @Column(name="accType")
    private String accType;

    @Column(name="balance")
    private Float balance;

    @Column(name="dateOfCreation")
    private LocalDate dateOfCreation;

    @Column(name="transactionPassword")
    @Size(min=8, message="Password should be at least 8-characters long")
    private String transactionPassword;

    @Column(name="address")
    private String address;

}
