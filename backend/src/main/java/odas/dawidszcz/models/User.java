package odas.dawidszcz.models;

import jakarta.persistence.*;
import lombok.*;
import odas.dawidszcz.utils.Role;
import odas.dawidszcz.utils.SecretBuilder;
import odas.dawidszcz.utils.SymmetricEncryptionUtil;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Builder
@Table(name = "users")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String username;

    private String password;

    private Boolean enabled;

    @Getter(AccessLevel.NONE)
    @Column(name = "secret", length = 4096)
    private String secret;

    private Role role;

    public User(String username) {
        this.username = username;
    }
    public User(String username, String password, boolean enabled, Role role) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        try{
          this.secret = SymmetricEncryptionUtil.encrypt(SecretBuilder.buildSecret(username,password));
        }catch (Exception e){
         System.out.println(e.getMessage()+" XXXX");
          this.secret = SecretBuilder.buildSecret(username,password);
        }
//       this.secret = SecretBuilder.buildSecret(username,password);
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getSecret() {
      try{
      return  SymmetricEncryptionUtil.decrypt(this.secret);
      }catch (Exception e) {
        return this.secret;
      }
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
