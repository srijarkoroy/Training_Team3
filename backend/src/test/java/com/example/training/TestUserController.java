package com.example.training;
import com.example.training.controller.UserController;
import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.entity.User;
import com.example.training.model.AccountRequest;
import com.example.training.model.Withdraw;
import com.example.training.service.JwtService;
import com.example.training.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.checkerframework.checker.units.qual.A;
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
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
public class TestUserController {
    private MockMvc mockMvc;
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectWriter objectWriter = objectMapper.writer();

    @Mock
    private UserService userService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtService jwtService;

    @InjectMocks
    private UserController userController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

//    @Test
//    public void testGetUserAccounts() throws Exception{
//        String token= ;
//        when(userService.findUserAccounts(Long.valueOf(jwtService.extractUsername(token)))).thenReturn("No Accounts found for this user");
//
//
//    }

//    @Test
//    public void testWithdraw() throws Exception{
//        Withdraw withdrawDetails = new Withdraw();
//        when(userService.withdrawAmount(withdrawDetails)).thenReturn("Amount withdrawn successfully");
//
//        mockMvc.perform(MockMvcRequestBuilders
//                .post("/withdraw")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//
//        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/withdraw")
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON)
//
//    }

    @Test
    public void testGetTransactionDetails() throws Exception{
        when(userService.findTransaction(123L)).thenReturn("transaction not found");
        mockMvc.perform(MockMvcRequestBuilders
                .get("/user/transactionDetails/{transact}", 123L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        Transaction transaction = new Transaction();
        when(userService.findTransaction(124L)).thenReturn(transaction);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/user/transactionDetails/{transact}", 124L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAccountDetails() throws Exception{
        when(userService.findAccount(123L)).thenReturn("account not found");
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/user/accountDetails/{accNo}", 123L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        Account account = new Account();
        when(userService.findAccount(124L)).thenReturn(account);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/user/accountDetails/{accNo}", 124L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

//    @Test
//    public void testGetUserAccounts() throws Exception{
//        when(userService.findUserAccounts(123L)).thenReturn("No Accounts found for this user");
//        mockMvc.perform(MockMvcRequestBuilders
//                        .get("/user/userAccounts")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isNotFound());
//
//        List<Long> accounts = new ArrayList<>();
//        when(userService.findUserAccounts(124L)).thenReturn(accounts);
//        mockMvc.perform(MockMvcRequestBuilders
//                        .get("/user/userAccounts")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }

    @Test
    public void testGetUserDetails() throws Exception{
        when(userService.findUser(123L)).thenReturn("user not found");
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/user/userDetails/{id}", 123L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        User user = new User();
        when(userService.findUser(124L)).thenReturn(user);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/user/userDetails/{id}", 124L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

//    @Test
//    public void testGetBalance() throws Exception{
//        AccountRequest accountRequest = new AccountRequest();
//        when(userService.findBalance(accountRequest)).thenReturn("User does not have a bank account");
//
//        String content = objectWriter.writeValueAsString(accountRequest);
//
//        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/user/accountDetails/getBalance")
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON)
//                .content(content);
//
//        mockMvc.perform(mockRequest)
//                .andExpect(status().isNotFound());
//    }

    @Test
    public void testSaveTransactionDetails() throws Exception{
        Transaction transaction = new Transaction(
                123L,
                1L,
                2L,
                100F,
                Timestamp.from(Instant.now()),
                "blah",
                "a@b.com",
                "blah",
                12345L
        );
        when(userService.saveNewTransaction(transaction)).thenReturn("Transaction successful");

        String content = objectWriter.writeValueAsString(transaction);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/user/transactionDetails/createTransaction")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(content);

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk());
    }
}
