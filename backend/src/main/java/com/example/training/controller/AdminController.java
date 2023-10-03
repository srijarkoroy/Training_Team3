package com.example.training.controller;

import com.example.training.model.UserEnable;
import com.example.training.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    private SimpleGrantedAuthority adminAuthority = new SimpleGrantedAuthority("ADMIN");

    @GetMapping("/adminCheck")
    public ResponseEntity<?> checkAdmin() {
        if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(adminAuthority))
            return new ResponseEntity<>(true, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/userEnable")
    public ResponseEntity<?> setUserStatus(@RequestBody UserEnable userEnable) {
        Object response = adminService.setUserStatus(userEnable);
        if (response.equals("user not found"))
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/allTransactionDetails/{accNo}")
    public ResponseEntity<?> getAllTransactionDetails(@PathVariable Long accNo) {

        Object response = adminService.findAllTransaction(accNo);
        if (response.equals("User does not have a bank account") || response.equals("transaction not found"))
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}