package com.example.training.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Valid
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

    @NotNull
    @Size(min=8, message="Password should be at least 8-characters long")
    @Column(name="password")
    private String password;

    @Column(name="roles")
    private String roles;

    @Column(name="enable")
    private Boolean enable;

}
