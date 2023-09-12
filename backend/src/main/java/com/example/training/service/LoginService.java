package com.example.training.service;

import com.example.training.entity.Account;
import com.example.training.entity.Transaction;
import com.example.training.entity.User;
import com.example.training.model.UserDetails;
import com.example.training.repository.AccountRepository;
import com.example.training.repository.TransactionRepository;
import com.example.training.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public Object findUser(Long id){
        Optional<User> user = userRepository.findByUserId(id);
        if(user.isEmpty()){
            return "user not found";
        }
        return user;
    }

    public Object findAccount(Long acc){
        Optional<Account> account = accountRepository.findByAccNo(acc);
        if (account.isEmpty()){
            return "account not found";
        }
        return acc;
    }

    public Object findTransaction(Long transact){
        Optional<Transaction> transaction = transactionRepository.findByTransactionId(transact);
        if (transaction.isEmpty()){
            return "transaction not found";
        }
        return transact;
    }

    public String saveNewUser(UserDetails userDetails){
        userRepository.save(userDetails.getUser());
        Optional<Account> account = accountRepository.findByAccNo(userDetails.getAccNo());
        if(account.isEmpty())
            return "User does not have a bank account";

        account.ifPresent(account1 -> {
            account1.setUserId(userDetails.getUser().getUserId());
            account1.setTransactionPassword(userDetails.getTransactionPassword());
            accountRepository.save(account1);
        });

        return "Successfully Created New User";
    }

    public String saveNewAccount(Account account){
        account.setDateOfCreation(LocalDate.now());
        account.setBalance(0.0f);
        accountRepository.save(account);
        return "Successfully Created New Account";
    }

    public String saveNewTransaction(Transaction transaction){
        transactionRepository.save(transaction);
        return "Transaction Successful";
    }
}
