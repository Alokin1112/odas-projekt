package odas.dawidszcz.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import odas.dawidszcz.dto.NoteDto;
import odas.dawidszcz.models.Note;
import odas.dawidszcz.repositories.NoteRepository;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.sql.Array;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final String algorithm = "AES/CBC/PKCS5Padding";
    public Note saveNote(NoteDto noteDto, String username) {
        if(noteDto.isEncrypted() && (noteDto.isPublic() || !noteDto.getAllowedUsers().isEmpty())) {
            throw new IllegalArgumentException("Encrypted messages cannot be shared");
        }
        System.out.println("XXXX");
        String text = noteDto.getText();
        byte[] iv = {};
        if(noteDto.isEncrypted()){
            try {
                SecretKey key = getKey(noteDto.getPassword());
                Cipher cipher = Cipher.getInstance(algorithm);
                IvParameterSpec ivSpec = generateIv();
                cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
                byte[] cipherText = cipher.doFinal(noteDto.getText().getBytes());
                iv = ivSpec.getIV();
                text = Base64.getEncoder().encodeToString(cipherText);
            }catch (Exception e){
            }
        }
        Note note = Note.builder()
                .title(noteDto.getTitle())
                .text(text)
                .iv(iv)
                .allowedUsers(noteDto.getAllowedUsers())
                .isEncrypted(noteDto.isEncrypted())
                .isPublic(noteDto.isPublic())
                .username(username)
                .build();
        return noteRepository.save(note);
    }

    public List<Note> getAllPublicNotes() {
        return noteRepository.findAllByIsPublicIsTrue();
    }

    public List<Note> getAllOwnedNotes(String username){
        return noteRepository.findAllByUsername(username);
    }

    public List<Note> getAllAllowedNotes(String username) {
        return noteRepository.findAllByAllowedUsersContaining(username);
    }

    public Note getNote(Integer id){
        return noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No note with id: " + id));
    }

    public Note getDecryptedNote(Integer id,String password){
        Note note =  getNote(id);
        if(password ==null || note.getIv().length ==0){
            throw new IllegalStateException("No enrypted note");
        }
        try{
            String encryptedText =note.getText();
            Cipher cipher = Cipher.getInstance(algorithm);
            cipher.init(Cipher.DECRYPT_MODE, getKey(password), new IvParameterSpec(note.getIv()));
            byte[] plainText = cipher.doFinal(Base64.getDecoder()
                    .decode(encryptedText));
            note.setText(new String(plainText));
            return note;
        }catch (Exception e) {
            throw  new IllegalArgumentException(e.getMessage());
        }
    }

    private SecretKey getKey(String password) throws Exception{
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec keySpec = new PBEKeySpec(password.toCharArray(), "1234".getBytes(), 65536, 256);
        return new SecretKeySpec(keyFactory.generateSecret(keySpec).getEncoded(), "AES");
    }

    private static IvParameterSpec generateIv() {
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);
        return new IvParameterSpec(iv);
    }
}
