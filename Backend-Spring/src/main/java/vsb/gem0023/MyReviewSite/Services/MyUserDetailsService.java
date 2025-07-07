package vsb.gem0023.MyReviewSite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vsb.gem0023.MyReviewSite.Repositories.UserRepository;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Attempting to load user: " + username);
        Optional<vsb.gem0023.MyReviewSite.Entities.User> user = userRepository.findByEmail(username);

        if(user.isEmpty()) {
            System.out.println("User not found: " + username);
        } else {
            System.out.println("User found: " + user.get().getEmail());
        }

        return user.map(u -> {
            return User.withUsername(u.getEmail())
                    .password(u.getPassword())
                    .roles(u.getRole())
                    .build();
        }).orElseThrow(() -> new UsernameNotFoundException("Uživatel nenalezen"));
    }
}
