package com.projects.expense_manager_app.Security;

import com.projects.expense_manager_app.Entity.User;
import com.projects.expense_manager_app.Repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= userRepository.findByEmail(username);

        if(user==null){
            throw new UsernameNotFoundException("this user does not exist.");
        }
        return new UserPrincipal(user);
    }
}
