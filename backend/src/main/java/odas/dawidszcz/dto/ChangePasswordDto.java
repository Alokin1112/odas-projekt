package odas.dawidszcz.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import odas.dawidszcz.utils.CustomText;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {
    @NotNull
    @NotEmpty
    @NotBlank
    @Length(min = 6,max = 255)
    private String oldPassword;

    @NotNull
    @NotEmpty
    @NotBlank
    @CustomText
    @Length(min = 6,max = 255)
    private String newPassword;

    @NotNull
    @NotEmpty
    @NotBlank
    @CustomText
    @Length(min = 6,max = 255)
    private String repeatNewPassword;
}
