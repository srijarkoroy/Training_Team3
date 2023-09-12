package com.example.training.controller;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.model.AuthRequest;
import com.example.training.model.UserDetails;
import com.example.training.service.JwtService;
import com.example.training.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/user")
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	@PostMapping("/authenticate")
	public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserId(), authRequest.getPassword()));
		if (authentication.isAuthenticated()) {
			return jwtService.generateToken(authRequest.getUserId());
		} else {
			throw new UsernameNotFoundException("invalid user request !");
		}
	}

	@GetMapping("/userDetails/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable String id){
		Object response = userService.findUser(id);
		if(response.equals("user not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/accountDetails/{accNo}")
	public ResponseEntity<?> getAccountDetails(@PathVariable Long accNo){
		Object response = userService.findAccount(accNo);
		if(response.equals("account not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("transactionDetails/{transact}")
	public ResponseEntity<?> getTransactionDetails(@PathVariable Long transact){
		Object response = userService.findTransaction(transact);
		if (response.equals("transaction not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/userDetails/createUser")
	public ResponseEntity<String> saveUserDetails(@Valid @RequestBody UserDetails userDetails){
		return new ResponseEntity<>(userService.saveNewUser(userDetails), HttpStatus.OK);
	}
  
	@PostMapping("/accountDetails/createAccount")
	public ResponseEntity<Object> saveAccountDetails(@RequestBody Account account){
		return new ResponseEntity<>(userService.saveNewAccount(account), HttpStatus.OK);
	}

	@PostMapping("/transactionDetails/createTransaction")
	public ResponseEntity<String> saveTransactionDetails(@Valid @RequestBody Transaction transaction){
		return new ResponseEntity<>(userService.saveNewTransaction(transaction), HttpStatus.OK);
	}
}
