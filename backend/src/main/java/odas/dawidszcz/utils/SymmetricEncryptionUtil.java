package odas.dawidszcz.utils;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.spec.KeySpec;
import java.util.Base64;

public class SymmetricEncryptionUtil {

  private static final String ALGORITHM = "AES";
  private static final String TRANSFORMATION = "AES/ECB/PKCS5PADDING";

  private static final String SECRET_KEY="3XxUD4HPOO5g4fP56etNna7NewhD5VTMsXu8o6XEgX4l6MbP5sxpN27rFw3Tfpmu" ;

  public static String encrypt(String data) throws Exception {
    Cipher cipher = Cipher.getInstance(TRANSFORMATION);
    cipher.init(Cipher.ENCRYPT_MODE, getKey(SECRET_KEY));
    byte[] encryptedBytes = cipher.doFinal(data.getBytes());
    return Base64.getEncoder().encodeToString(encryptedBytes);
  }

  public static String decrypt(String encryptedData) throws Exception {
    Cipher cipher = Cipher.getInstance(TRANSFORMATION);
    cipher.init(Cipher.DECRYPT_MODE, getKey(SECRET_KEY));
    byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
    return new String(decryptedBytes);
  }

  private static SecretKey getKey(String password) throws Exception{
    SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
    KeySpec keySpec = new PBEKeySpec(password.toCharArray(), "1234".getBytes(), 65536, 256);
    return new SecretKeySpec(keyFactory.generateSecret(keySpec).getEncoded(), ALGORITHM);
  }
}
