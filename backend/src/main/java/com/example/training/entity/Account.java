package com.example.training.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;


import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Valid
@AllArgsConstructor
@NoArgsConstructor
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
    private Long userId;

    @NotNull
    @Size(min=1, message="First Name should have at least 1 characters")
    @Column(name="firstName")
    private String firstName;

    @NotNull
    @Size(min=1, message="Last Name should have at least 1 characters")
    @Column(name="lastName")
    private String lastName;

    @Column(name="aadhaarNo")
    @NotNull
    private Long aadhaarNo;

    @Column(name="phone")
    @Min(value=1000000000, message="Phone number should be 10-digits long")
    private Long phone;

    @Column(name="email")
    @Email
    private String email;

    @Column(name="branch")
    private String branch;


//    @NotNull
//    @Size(min=10,max=10, message="IFSC code should be 11-characters long")
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
