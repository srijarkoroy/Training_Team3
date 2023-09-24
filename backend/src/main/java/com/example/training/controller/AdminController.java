package com.example.training.controller;

import com.example.training.model.UserEnable;
import com.example.training.repository.UserRepository;
import com.example.training.service.AdminService;
import com.example.training.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private SimpleGrantedAuthority adminAuthority = new SimpleGrantedAuthority("ADMIN");

//    @PostMapping("/authenticate")
//    public ResponseEntity<?> adminAuthenticateAndGetToken(@RequestBody AdminAuthRequest adminAuthRequest) {
//
//        Optional<User> adminUser = userRepository.findByUserId(adminAuthRequest.getUserId());
//        if (adminUser.isPresent() && adminUser.get().getRoles().equals("ADMIN")) {
//            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(adminAuthRequest.getUserId(), adminAuthRequest.getPassword()));
//            if (authentication.isAuthenticated()) {
//                Map<String, String> response = new HashMap<>();
//                response.put("token", jwtService.generateToken(String.valueOf(adminAuthRequest.getUserId())));
//                return new ResponseEntity<>(response, HttpStatus.OK);
//            } else {
//                throw new UsernameNotFoundException("invalid user request !");
//            }
//        }
//        return new ResponseEntity<>("User is not a Admin", HttpStatus.NOT_FOUND);
//    }

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
