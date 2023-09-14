package com.example.training.model;

import com.example.training.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Valid
public class UserDetails {

    @NotNull
    private User user;

    @NotNull
    private Long accNo;

    @NotNull
    private String transactionPassword;
}
