package com.projects.expense_manager_app.Service;

import com.projects.expense_manager_app.Entity.User;
import com.projects.expense_manager_app.Repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserRepository userRepository;

    public UserServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder, UserRepository userRepository) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @Override
    public User getUser(int id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
    }

    @Override
    public User createUser(User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user, int id){
        if(!userRepository.existsById(id)){
            throw new RuntimeException("User not found.");
        }
        user.setId(id);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(int id){
        if(!userRepository.existsById(id)){
            throw new RuntimeException("User not found.");
        }
        userRepository.deleteById(id);
    }

    @Override
    public boolean authenticate(String username, String password) {

        User user= userRepository.findByEmail(username);
        if(user==null){
            throw new UsernameNotFoundException("User does not exist.");
        }

        if(!(bCryptPasswordEncoder.matches(password, user.getPassword()))){
            throw new BadCredentialsException("The password is incorrect.");
        }

        return true;
    }

}
