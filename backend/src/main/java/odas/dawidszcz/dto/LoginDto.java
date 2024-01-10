package odas.dawidszcz.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import odas.dawidszcz.utils.CustomText;
import org.hibernate.validator.constraints.Length;

@Data
public class LoginDto {

    @NotNull
    @NotEmpty
    @NotBlank
    @Length(min = 1,max = 255)
    private String username;
    @NotNull
    @NotEmpty
    @NotBlank
    @Length(min=1,max = 255)
    private String password;
}
