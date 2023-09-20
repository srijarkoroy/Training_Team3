package com.example.training.controller;

import com.example.training.exception.EntityNotFoundException;
import com.example.training.model.AdminAuthRequest;
import com.example.training.model.AuthRequest;
import com.example.training.service.AdminService;
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

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String,String>> adminAuthenticateAndGetToken(@RequestBody AdminAuthRequest adminAuthRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(adminAuthRequest.getId(), adminAuthRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            Map<String,String> response = new HashMap<>();
            response.put("token",jwtService.generateToken(String.valueOf(adminAuthRequest.getId())));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @GetMapping("/adminDetails/{id}")
    public ResponseEntity<?> getAdminDetails(@PathVariable String id) {
        Object response = adminService.findAdmin(id);
        if(response.equals("user not found"))
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
