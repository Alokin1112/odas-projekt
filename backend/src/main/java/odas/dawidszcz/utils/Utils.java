package odas.dawidszcz.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;
import java.util.Random;

public class Utils {

    public static void WaitRandomTime() {
        Random random = new SecureRandom();
        try {
            // Generate a random wait time between 200 and 600 milliseconds
            int randomWaitTime = random.nextInt(401) + 200; // Generates a random number between 200 and 600
            Thread.sleep(randomWaitTime);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
