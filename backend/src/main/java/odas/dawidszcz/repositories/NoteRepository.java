package odas.dawidszcz.repositories;

import odas.dawidszcz.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Integer> {

    public List<Note> findAllByIsPublicIsTrue();

    public List<Note> findAllByUsername(String username);

    public void deleteAllByUsername(String username);
    public List<Note> findAllByAllowedUsersContaining(String user);
}
