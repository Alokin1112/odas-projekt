package odas.dawidszcz.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Note {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String title;

    @Column
    private String text;

    @Column
    private boolean isEncrypted;

    @Column(name = "iv")
    @JsonIgnore
    private byte[] iv;

    @Column(name = "is_public")
    @JsonIgnore
    private boolean isPublic;

    @Column
    private String username;

    @ElementCollection
    @CollectionTable(name = "allowed_users", joinColumns = @JoinColumn(name = "note_id"))
    @Column(name = "allowed_user")
    @JsonIgnore
    private List<String> allowedUsers;
}
