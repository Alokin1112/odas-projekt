package odas.dawidszcz.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class VerificationRequest {

    @NotNull
    @NotEmpty
    @NotBlank
    @Length(min=1,max = 255)
    private String username;
    @NotNull
    @NotEmpty
    @NotBlank
    @Length(min=1,max = 255)
    private String password;
    @NotNull
    @NotBlank
    @NotEmpty
    @Length(min = 6,max = 6)
    private String code;
    @NotNull
    @NotBlank
    @NotEmpty
    private String token;
}