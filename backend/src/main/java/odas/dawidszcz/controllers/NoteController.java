package odas.dawidszcz.controllers;

import lombok.RequiredArgsConstructor;
import odas.dawidszcz.dto.NoteDto;
import odas.dawidszcz.dto.NoteGetterDto;
import odas.dawidszcz.models.Note;
import odas.dawidszcz.services.NoteService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/note")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping("/public")
    public List<Note> getPublicNotes(){
        return noteService.getAllPublicNotes();
    }

    @GetMapping("")
    public List<Note> getOwnedNotes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return  noteService.getAllOwnedNotes(username);
    }

  @PostMapping("/add")
  public Note saveNote(@RequestBody NoteDto noteDto){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();
    return noteService.saveNote(noteDto,username);
  }

    @GetMapping("/allowed")
    public List<Note> getAllowedNotes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return  noteService.getAllAllowedNotes(username);
    }
    @PostMapping("/details")
    public Note getDetailedNote(@RequestBody NoteGetterDto noteGetterDto){
        Note note = noteService.getNote(noteGetterDto.getId());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if(!note.isPublic() && !username.equals(note.getUsername()) && !note.getAllowedUsers().contains(note.getUsername())) {
            throw new IllegalArgumentException("You don't have permission to this resource");
        }
        if(noteGetterDto.getPassword()!=null){
            return noteService.getDecryptedNote(note.getId(),noteGetterDto.getPassword());
        }else{
            return note;
        }
    }

}
