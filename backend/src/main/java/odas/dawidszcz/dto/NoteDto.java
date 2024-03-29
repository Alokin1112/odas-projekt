package odas.dawidszcz.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Data
@Builder
public class NoteDto {

    @NotNull
    @NotEmpty
    @NotBlank
    @Length(min=1,max = 255)
    private String title;

    @NotNull
    @NotEmpty
    @NotBlank
    @Length(min=1,max = 4096)
    private String text;

    @NotNull
    private boolean isEncrypted;

    @NotNull
    private boolean isPublic;

    private String password;

    private List<String>  allowedUsers;
}
