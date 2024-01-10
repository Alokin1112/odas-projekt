package odas.dawidszcz.utils;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceResponse<T> {
    private T data;
    private Boolean isSuccess;
    private String message;
}
