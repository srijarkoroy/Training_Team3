package com.example.training.controller;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.exception.EntityNotFoundException;
import com.example.training.exception.EntityNotFoundException;
import com.example.training.model.UserDetails;
import com.example.training.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/user")
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	@GetMapping("/userDetails/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable Long id) throws EntityNotFoundException {
		Object response = userService.findUser(id);
		if(response.equals("user not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/accountDetails/{accNo}")
	public ResponseEntity<?> getAccountDetails(@PathVariable Long accNo) throws EntityNotFoundException {
		Object response = userService.findAccount(accNo);
		if(response.equals("account not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("transactionDetails/{transact}")
	public ResponseEntity<?> getTransactionDetails(@PathVariable Long transact) throws EntityNotFoundException {
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
	public ResponseEntity<Object> saveAccountDetails(@Valid @RequestBody Account account){
		return new ResponseEntity<>(userService.saveNewAccount(account), HttpStatus.OK);
	}

	@PostMapping("/transactionDetails/createTransaction")
	public ResponseEntity<String> saveTransactionDetails(@Valid @RequestBody Transaction transaction){
		return new ResponseEntity<>(userService.saveNewTransaction(transaction), HttpStatus.OK);
	}
}
