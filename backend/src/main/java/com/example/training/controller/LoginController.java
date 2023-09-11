package com.example.training.controller;

import com.example.training.entity.User;
import com.example.training.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

	@PostMapping("/userDetails/createUser")
	public ResponseEntity<String> saveUserDetails(@RequestBody User user){
		return new ResponseEntity<>(loginService.saveNewUser(user),HttpStatus.OK);
	}
}
