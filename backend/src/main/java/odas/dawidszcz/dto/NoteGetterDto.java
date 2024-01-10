package odas.dawidszcz.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NoteGetterDto {

    @NotNull
    @NotEmpty
    @NotBlank
    private Integer id;

    private String password;
}
