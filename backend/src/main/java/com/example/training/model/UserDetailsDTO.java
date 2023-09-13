package com.example.training.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDTO {

    private Long userId;

    private String firstName;

    private String lastName;

    private String email;

    private Long phone;
}
