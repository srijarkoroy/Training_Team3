package com.example.training.service;

import com.example.training.entity.User;
import com.example.training.model.UserEnable;
import com.example.training.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    public Object setUserStatus(UserEnable userEnable) {
        Optional<User> user = userRepository.findByUserId(userEnable.getUserId());
        if (user.isEmpty()) {
            return "user not found";
        }
        user.ifPresent(userAcc->{userAcc.setEnable(userEnable.getEnable());});
        if(userEnable.getEnable())
            return "User Account Enabled";
        return "User Account Disabled";
    }
}
