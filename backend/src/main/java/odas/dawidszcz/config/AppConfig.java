package odas.dawidszcz.config;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import odas.dawidszcz.dto.NoteDto;
import odas.dawidszcz.dto.RegisterDto;
import odas.dawidszcz.repositories.UserRepository;
import odas.dawidszcz.services.AuthenticationService;
import odas.dawidszcz.services.NoteService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final UserRepository userRepository;
    private final SecureRandom  secureRandom= new SecureRandom();

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByUsername(username)
                .orElseThrow(() ->new UsernameNotFoundException("Incorrect authorization data"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config){
        try {
            return  config.getAuthenticationManager();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(5,secureRandom);
    }

  @Bean
  CommandLineRunner commandLineRunner(NoteService noteService, AuthenticationService authenticationService) {
    return args -> {
      RegisterDto registerDto = RegisterDto.builder().username("dawid123").password("dawid123456").repeatPassword("dawid123456").build();
      authenticationService.register(registerDto);

      NoteDto noteDto = NoteDto.builder().title("Example").text("<b>gruby</b>").isEncrypted(false).allowedUsers(List.of()).password("").isPublic(true).build();
      noteService.saveNote(noteDto,registerDto.getUsername());
      NoteDto noteDto2 = NoteDto.builder().title("Example245").text("<i>pochylony </i>").isEncrypted(false).allowedUsers(List.of()).password("").isPublic(true).build();
      noteService.saveNote(noteDto2,registerDto.getUsername());
      NoteDto noteDto3 = NoteDto.builder().title("Tylko dla specjalnych <3").text("<i>pochylony </i>").isEncrypted(false).allowedUsers(List.of("uzytkownik")).password("").isPublic(false).build();
      noteService.saveNote(noteDto3,registerDto.getUsername());
    };
  }
}
