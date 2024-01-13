package odas.dawidszcz.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import odas.dawidszcz.utils.CustomText;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class RegisterDto {
    @NotNull
    @NotEmpty
    @NotBlank
    @CustomText
    @Length(min = 6,max = 255)
    private String username;
    @NotNull
    @NotEmpty
    @NotBlank
    @CustomText
    @Length(min = 8,max = 255)
    private String password;
    @NotNull
    @NotEmpty
    @NotBlank
    @CustomText
    @Length(min = 8,max = 255)
    private String repeatPassword;
}
