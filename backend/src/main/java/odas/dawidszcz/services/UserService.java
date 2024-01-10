package odas.dawidszcz.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import odas.dawidszcz.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BruteForceProtector bruteForceProtector;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if( bruteForceProtector.isBlocked()){
            throw new RuntimeException("IP blocked wait 2 day to try again you bad hacker XD");
        }
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Incorrect authorization data"));
    }

}
