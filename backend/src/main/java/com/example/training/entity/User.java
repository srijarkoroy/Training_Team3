package com.example.training.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(generator = "sequence-generator1")
    @GenericGenerator(
            name = "sequence-generator1",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "user_sequence"),
                    @Parameter(name = "initial_value", value = "10002"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
    @Column(name="userId")
    private Long userId;

    @Column(name="firstName")
    private String firstName;

    @Column(name="lastName")
    private String lastName;

    @Column(name="password")
    @JsonIgnore
    private String password;

    @Column(name="email")
    @Email
    private String email;

    @Column(name="phone")
    private Long phone;

}
