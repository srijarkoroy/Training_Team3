package com.example.training.service;

import com.example.training.entity.User;
import com.example.training.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;

    public Object findUser(Long id){
        Optional<User> user = userRepository.findByUserId(id);
        if(user.isEmpty()){
            return "user not found";
        }
        return user;
    }

    public String saveNewUser(User user){
        userRepository.save(user);
        return "Successfully Created New User";
    }
}
