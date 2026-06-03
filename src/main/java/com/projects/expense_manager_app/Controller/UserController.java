package com.projects.expense_manager_app.Controller;

import com.projects.expense_manager_app.Entity.AuthResponse;
import com.projects.expense_manager_app.DTO.LoginRequest;
import com.projects.expense_manager_app.Entity.User;
import com.projects.expense_manager_app.Repository.UserRepository;
import com.projects.expense_manager_app.Security.JwtService;
import com.projects.expense_manager_app.Service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;


@RestController
@RequestMapping("/")
public class UserController {
    private final UserService userService;
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserRepository userRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public Collection<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id){
       return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@Validated @RequestBody User user) throws URISyntaxException {
        User result= userService.createUser(user);
        return ResponseEntity.created(new URI("/api/user/"+ result.getId())).body(result);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @Validated @RequestBody User user){
        return ResponseEntity.ok(userService.updateUser(user,id));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id){
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> newUser(@RequestBody User user){
        if(userRepository.existsByEmail(user.getEmail())){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User already exists.");
        }
        User newUser= userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session){
        System.out.println("LOGIN ENDPOINT HIT");
        try{
           authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(
                           loginRequest.getUsername(),
                           loginRequest.getPassword()
                   )
           );
           String token= jwtService.generateToken(loginRequest.getUsername());
           return ResponseEntity.ok(new AuthResponse(token));

        }catch(BadCredentialsException e){
           
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password.");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/user-profile")
    ResponseEntity<User> getCurrentUser(Authentication authentication){
        String email= authentication.getName();
        User user= userRepository.findByEmail(email);
        return ResponseEntity.ok(user);
    }
}
