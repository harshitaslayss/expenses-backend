package com.projects.expense_manager_app.Controller;

import com.projects.expense_manager_app.DTO.DashboardDTO;
import com.projects.expense_manager_app.Entity.Transaction;
import com.projects.expense_manager_app.Service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;


@RestController
@RequestMapping("/")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }


    @GetMapping("/transactions")
    public List<Transaction> getTransactions(){
        return transactionService.getTransactions();
    }

    @GetMapping("/transactions/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable int id){

        return ResponseEntity.ok(transactionService.getTransaction(id));

    }

    @PostMapping("/transactions")
    public ResponseEntity<Transaction> createTransaction(@Validated @RequestBody  Transaction transaction) throws URISyntaxException{
       Transaction result= transactionService.createTransaction(transaction);
       return ResponseEntity.created(new URI("/api/transaction/"+ result.getId())).body(result);

    }

    @PutMapping("/transactions/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable int id, @Validated @RequestBody Transaction transaction){
        return ResponseEntity.ok().body(transactionService.updateTransaction(id, transaction));

    }

    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<Transaction> deleteTransaction(@PathVariable int id){
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/dashboard")
    public DashboardDTO getDashboardInfo(){
       return transactionService.getDashboardData();
    }



}
