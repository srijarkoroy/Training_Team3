package com.example.training;

import com.example.training.controller.UserController;
import com.example.training.entity.Account;
import com.example.training.service.UserService;
import com.example.training.entity.User;
import com.example.training.model.UserDetailsDTO;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(MockitoJUnitRunner.class)
public class TrainingGroup3ApplicationTests {
	private MockMvc mockMvc;

	ObjectMapper objectMapper = new ObjectMapper();
	ObjectWriter objectWriter = objectMapper.writer();

	@Mock
	private com.example.training.service.UserService userService;

	@InjectMocks
	private UserController userController;


	UserDetailsDTO userDetailsDTO = new UserDetailsDTO(123L, "Arjun", "J", "cam@gmail.com", 79044L);
	LocalDate date = LocalDate.parse("2020-01-08");
	Account account = new Account(
			123L,
			123L,
			123L,
			"a",
			"a123",
			"savings",
			1.1F,
			date,
			"a",
			"a");
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
	}
	@Test
	public void testFindUser() throws Exception{
		Mockito.when(userService.findUser(123L)).thenReturn(userDetailsDTO);

		UserDetailsDTO temp = (UserDetailsDTO) userService.findUser(123L);
		assertThat(temp).isNotNull();
		assertEquals(temp, userDetailsDTO);
	}

	@Test
	public void testFindAccount() throws Exception{
		Mockito.when(userService.findAccount(123L)).thenReturn(account);

		Account found = (Account) userService.findAccount(123L);
		assertThat(found).isNotNull();
		assertEquals(found, account);

		Account notFound = (Account) userService.findAccount(12L);
		assertThat(notFound).isNull();
	}

}
