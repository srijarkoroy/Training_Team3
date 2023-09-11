package com.example.training.controller;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.entity.User;
import com.example.training.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/user")
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class LoginController {

	private final LoginService loginService;
	@GetMapping("/userDetails/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable Long id){
		Object response = loginService.findUser(id);
		if(response.equals("user not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/accountDetails/{accNo}")
	public ResponseEntity<?> getAccountDetails(@PathVariable Long accNo){
		Object response = loginService.findAccount(accNo);
		if(response.equals("account not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("transactionDetails/{transact}")
	public ResponseEntity<?> getTransactionDetails(@PathVariable Long transact){
		Object response = loginService.findTransaction(transact);
		if (response.equals("transaction not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/userDetails/createUser")
	public ResponseEntity<String> saveUserDetails(@Valid @RequestBody User user){
		return new ResponseEntity<>(loginService.saveNewUser(user), HttpStatus.OK);
	}
  
	@PostMapping("/accountDetails/createAccount")
	public ResponseEntity<String> saveAccountDetails(@Valid @RequestBody Account account){
		return new ResponseEntity<>(loginService.saveNewAccount(account), HttpStatus.OK);
	}

	@PostMapping("/transactionDetails/createTransaction")
	public ResponseEntity<String> saveTransactionDetails(@Valid @RequestBody Transaction transaction){
		return new ResponseEntity<>(loginService.saveNewTransaction(transaction), HttpStatus.OK);
	}
}
