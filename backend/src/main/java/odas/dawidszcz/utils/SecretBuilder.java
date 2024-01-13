package odas.dawidszcz.utils;
import com.google.common.io.BaseEncoding;

import java.security.SecureRandom;
import java.util.Random;

public class SecretBuilder {

    public static String buildSecret(String userName, String password) {
        String usernameSubstring = generateRandomSubstring(userName);
        String passwordSubstring = generateRandomSubstring(password);
        String salt = generateRandomSalt();

        return BaseEncoding.base32().encode((usernameSubstring+passwordSubstring+salt).getBytes());
    }

    private static String generateRandomSubstring(String input) {
        Random random = new SecureRandom();
        int length = input.length();
        int startIndex = random.nextInt(length);
        int endIndex = random.nextInt(length - startIndex) + startIndex + 1;
        return input.substring(startIndex, endIndex);
    }

    // Metoda do generowania losowej soli
    private static String generateRandomSalt() {
        int saltLength = 64;
        StringBuilder salt = new StringBuilder();
        Random random = new SecureRandom();

        for (int i = 0; i < saltLength; i++) {
            char randomChar = (char) (random.nextInt(26) + 'a');
            salt.append(randomChar);
        }

        return salt.toString();
    }
}
