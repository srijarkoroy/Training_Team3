package com.example.training.controller;

import com.example.training.entity.User;
import com.example.training.model.AdminAuthRequest;
import com.example.training.repository.UserRepository;
import com.example.training.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

//    private final AdminService adminService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/authenticate")
    public ResponseEntity<?> adminAuthenticateAndGetToken(@RequestBody AdminAuthRequest adminAuthRequest) {

        Optional<User> adminUser = userRepository.findByUserId(adminAuthRequest.getUserId());
        if(adminUser.isPresent() && adminUser.get().getRoles().equals("ADMIN"))
        {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(adminAuthRequest.getUserId(), adminAuthRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                Map<String, String> response = new HashMap<>();
                response.put("token", jwtService.generateToken(String.valueOf(adminAuthRequest.getUserId())));
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                throw new UsernameNotFoundException("invalid user request !");
            }
        }
        return new ResponseEntity<>("User is not a Admin",HttpStatus.NOT_FOUND);
    }

//    @GetMapping("/adminDetails/{id}")
//    public ResponseEntity<?> getAdminDetails(@PathVariable String id) {
//        Object response = adminService.findAdmin(id);
//        if(response.equals("user not found"))
//            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

}
