package com.example.training.controller;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.model.AuthRequest;
import com.example.training.model.BalanceRequest;
import com.example.training.model.PerformTransactionDetails;
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
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	@PostMapping("/authenticate")
	public ResponseEntity<Map<String,String>> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserId(), authRequest.getPassword()));
		if (authentication.isAuthenticated()) {
			Map<String,String> response = new HashMap<>();
			response.put("token",jwtService.generateToken(String.valueOf(authRequest.getUserId())));
			return new ResponseEntity<>(response,HttpStatus.OK);
		} else {
			throw new UsernameNotFoundException("invalid user request !");
		}
	}

	@GetMapping("/userDetails/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable Long id){
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

	@PostMapping("/accountDetails/getBalance")
	public ResponseEntity<?> getBalance(@Valid @RequestBody BalanceRequest balanceRequest){
		Object response = userService.findBalance(balanceRequest);
		if(response.equals("User does not have a bank account") || response.equals("Incorrect Transaction password"))
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

	@PostMapping("/allTransactionDetails")
	public ResponseEntity<?> getAllTransactionDetails(@Valid @RequestBody BalanceRequest balanceRequest){

		Object response = userService.findAllTransaction(balanceRequest);
		if (response.equals("transaction not found"))
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/performTransaction")
	public ResponseEntity<Object> performTransaction(@Valid @RequestBody PerformTransactionDetails performTransactionDetails){
		Object response = userService.doTransaction(performTransactionDetails);
		if (response.equals("transaction executed successfully"))
			return new ResponseEntity<>(response, HttpStatus.OK);
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@PostMapping("/userDetails/createUser")
	public ResponseEntity<Object> saveUserDetails(@Valid @RequestBody UserDetails userDetails){
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
