package com.example.training;

import com.example.training.controller.UserController;
import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.model.BalanceRequest;
import com.example.training.model.UserDetails;
import com.example.training.repository.AccountRepository;
import com.example.training.repository.TransactionRepository;
import com.example.training.repository.UserRepository;
import com.example.training.service.UserService;
import com.example.training.entity.User;
import com.example.training.model.UserDetailsDTO;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
public class TrainingGroup3ApplicationTests {
	@Mock
	private TransactionRepository transactionRepository;

	@Mock
	private AccountRepository accountRepository;

	@Mock UserRepository userRepository;

	@InjectMocks
	private UserService userService;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}
	@Test
	public void testFindUser() throws Exception{
		UserDetailsDTO ud = new UserDetailsDTO();
		ud.setUserId(123L);
		User user = new User();
		user.setUserId(123L);
		Mockito.when(userRepository.findByUserId(123L)).thenReturn(Optional.of(user));

		Object found = userService.findUser(123L);
		assertEquals(found, ud);

		Object notFound = userService.findUser(12L);
		assertEquals(notFound, "user not found");
	}


	@Test
	public void testFindAccount() throws Exception{
		Account account = new Account();
		account.setAccNo(123L);
		given(accountRepository.findByAccNo(123L)).willReturn(Optional.of(account));

		Object found =  userService.findAccount(123L);
		assertEquals(found, Optional.of(account));

		Object notFound =  userService.findAccount(12L);
		assertEquals(notFound, "account not found");
	}

	@Test
	public void testFindTransaction() throws Exception{
		Transaction transaction = new Transaction();
		transaction.setTransactionId(123L);
		given(transactionRepository.findByTransactionId(123L)).willReturn(Optional.of(transaction));

		Object found =  userService.findTransaction(123L);
		assertEquals(found, Optional.of(transaction));

		Object notFound =  userService.findTransaction(12L);
		assertEquals(notFound, "transaction not found");
	}

	@Test
	public void testSaveNewTransaction() throws Exception{
		Transaction transaction = new Transaction();
		String result = userService.saveNewTransaction(transaction);
		verify(transactionRepository).save(transaction);
		assertEquals(result, "Transaction Successful");
	}

	@Test
	public void testFindNewUser() throws Exception{
		UserDetails ud = new UserDetails();
		UserDetails udInvalid = new UserDetails();
		Account account = new Account();

		ud.setAccNo(123L);

		User user = new User();
		user.setUserId(123L);

		UserDetailsDTO udDTO = new UserDetailsDTO();
		udDTO.setUserId(123L);

		when(userRepository.save(ud.getUser())).thenReturn(user);
		when(accountRepository.findByAccNo(ud.getAccNo())).thenReturn(Optional.of(account));

		Object found = userService.saveNewUser(ud);
		assertEquals(found, udDTO);

		Object notFound = userService.saveNewUser(udInvalid);
		assertEquals(notFound, "User does not have a bank account");
	}
//	@Test
//	public void testSaveNewTransaction() throws Exception{
//		Mockito.when(userService.saveNewTransaction(transaction)).thenReturn("Transaction Successful");
//		String actualResult = userService.saveNewTransaction(transaction);
//		assertEquals(actualResult, "Transaction Successful");
//	}
//
//	@Test
//	public void testFindAllTransaction() throws Exception{
//
//	}

	@Test
	public void testFindBalance() throws Exception{
		BalanceRequest balanceRequest = new BalanceRequest();
		balanceRequest.setAccNo(123L);
		balanceRequest.setTransactionPassword("summa");
		Account account = new Account();
		account.setTransactionPassword("summa");
		account.setBalance(123F);
		when(accountRepository.findByAccNo(balanceRequest.getAccNo())).thenReturn(Optional.of(account));

		Map<String, Float> map = new HashMap<String, Float>();
		map.put("balance", account.getBalance());

		Object found = userService.findBalance(balanceRequest);
		assertEquals(found, map);

		account.setTransactionPassword("wrong");
		found = userService.findBalance(balanceRequest);
		assertEquals(found, "Incorrect Transaction password");

		BalanceRequest invalidBalanceRequest = new BalanceRequest();
		found = userService.findBalance(invalidBalanceRequest);
		assertEquals(found, "User does not have a bank account");
	}
}
