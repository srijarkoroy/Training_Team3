package com.example.training.service;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.entity.User;
import com.example.training.exception.EntityNotFoundException;
import com.example.training.model.UserDetails;
import com.example.training.model.UserDetailsDTO;
import com.example.training.repository.AccountRepository;
import com.example.training.repository.TransactionRepository;
import com.example.training.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public Object findUser(Long id) throws EntityNotFoundException {
        Optional<User> user = userRepository.findByUserId(id);
        if(!user.isPresent()){
            throw new EntityNotFoundException(String.format("User not found with id "+id));
        }
        if(user.isEmpty()){
            return "user not found";
        }
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        user.ifPresent(userDetails -> {
            userDetailsDTO.setUserId(userDetails.getUserId());
            userDetailsDTO.setFirstName(userDetails.getFirstName());
            userDetailsDTO.setLastName(userDetails.getLastName());
            userDetailsDTO.setEmail(userDetails.getEmail());
            userDetailsDTO.setPhone(userDetails.getPhone());
        });
        return userDetailsDTO;
    }

    public Object findAccount(Long acc) throws EntityNotFoundException {
        Optional<Account> account = accountRepository.findByAccNo(acc);
        if(!account.isPresent()){
            throw new EntityNotFoundException(String.format("Account not found with id "+acc));
        }
        if (account.isEmpty()){
            return "account not found";
        }
        return acc;
    }

    public Object findTransaction(Long transact) throws EntityNotFoundException {
        Optional<Transaction> transaction = transactionRepository.findByTransactionId(transact);
        if(!transaction.isPresent()){
            throw new EntityNotFoundException(String.format("Transaction not found with id "+transact));
        }
        if (transaction.isEmpty()){
            return "transaction not found";
        }
        return transact;
    }

    public Object saveNewUser(UserDetails userDetails) {
        User user = userRepository.save(userDetails.getUser());
        Optional<Account> account = accountRepository.findByAccNo(userDetails.getAccNo());
        if (account.isEmpty())
            return "User does not have a bank account";

        account.ifPresent(userAccount -> {
            userAccount.setUserId(user.getUserId());
            userAccount.setTransactionPassword(userDetails.getTransactionPassword());
            accountRepository.save(userAccount);
        });
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setUserId(user.getUserId());
        userDetailsDTO.setFirstName(user.getFirstName());
        userDetailsDTO.setLastName(user.getLastName());
        userDetailsDTO.setEmail(user.getEmail());
        userDetailsDTO.setPhone(user.getPhone());

        return userDetailsDTO;
    }

    public Object saveNewAccount(Account account) {
        account.setDateOfCreation(LocalDate.now());
        account.setBalance(0.0f);

        return accountRepository.save(account);
    }

    public String saveNewTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
        return "Transaction Successful";
    }
}
