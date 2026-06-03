package com.projects.expense_manager_app.Service;

import com.projects.expense_manager_app.DTO.DashboardDTO;
import com.projects.expense_manager_app.Entity.Transaction;
import com.projects.expense_manager_app.Entity.User;
import com.projects.expense_manager_app.Repository.TransactionRepository;
import com.projects.expense_manager_app.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;


    @Override
    public List<Transaction> getTransactions(){
        User currentUser= getCurrentUser();
        return transactionRepository.findByUserId(currentUser.getId());
    }

    @Override
    public Transaction getTransaction(int id){
        return transactionRepository.findById(id).orElseThrow(
                ()->  new RuntimeException("Transaction not found.")
        );
    }

    @Override
    public List<Transaction> getUserTransactions(int userId){
        return transactionRepository.findByUserId(userId);
    }

    @Override
    public DashboardDTO getDashboardData(){
        User currentUser= getCurrentUser();
        List<Transaction> result= transactionRepository.findByUserId(currentUser.getId());
        long balance=0,expense=0,income=0;

        for(Transaction transaction: result){
           if(transaction.isIncome()) income+= transaction.getAmount();
           else{expense+= transaction.getAmount();}
        }

        balance= income- expense;
        return new DashboardDTO(balance,income,expense);
    }

    @Override
    public Transaction createTransaction(Transaction transaction){
        System.out.println("Inside createTransaction");
        User currentUser= getCurrentUser();
        System.out.println(currentUser.getEmail());
        transaction.setUser(currentUser);
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction updateTransaction(int id, Transaction transaction){

        Transaction existing= transactionRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("transaction not found."));

        existing.setDescription(transaction.getDescription());
        existing.setIncome(transaction.isIncome());
        existing.setAmount(transaction.getAmount());

        return transactionRepository.save(existing);
    }

    @Override
    public void deleteTransaction(int id){
        if(!transactionRepository.existsById(id)) throw new RuntimeException("Transaction not found");
        transactionRepository.deleteById(id);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email= authentication.getName();
        return userRepository.findByEmail(email);
    }
}
