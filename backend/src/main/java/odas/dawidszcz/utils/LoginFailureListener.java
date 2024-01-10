package odas.dawidszcz.utils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import odas.dawidszcz.services.BruteForceProtector;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LoginFailureListener {

    private final HttpServletRequest request;
    private final BruteForceProtector bruteForceProtector;

    @EventListener
    public void onAuthenticationFailure(AuthenticationFailureBadCredentialsEvent event){
        final String xFHeader = request.getHeader("X-Forwarded-For");
        if ( xFHeader == null || xFHeader.equals("") || !xFHeader.contains(request.getRemoteAddr())){
            bruteForceProtector.registerFailedLogin(request.getRemoteAddr());
        } else {
            bruteForceProtector.registerFailedLogin(xFHeader.split(",")[0]);
        }

    }
}
