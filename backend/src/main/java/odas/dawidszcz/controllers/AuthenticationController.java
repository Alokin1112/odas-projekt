package odas.dawidszcz.controllers;

import lombok.RequiredArgsConstructor;
import odas.dawidszcz.dto.AuthenticationResponse;
import odas.dawidszcz.dto.LoginDto;
import odas.dawidszcz.dto.RegisterDto;
import odas.dawidszcz.dto.VerificationRequest;
import odas.dawidszcz.services.AuthenticationService;
import odas.dawidszcz.services.UserService;
import odas.dawidszcz.utils.Utils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public AuthenticationResponse register(@RequestBody RegisterDto request) {
        if(!Objects.equals(request.getPassword(), request.getRepeatPassword())) {
            throw new IllegalArgumentException("repeat password must match");
        }
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public AuthenticationResponse authenticate(@RequestBody LoginDto request) {
        return authenticationService.login(request);
    }
    @PostMapping("/verify")
    public AuthenticationResponse verifyCode(@RequestBody VerificationRequest verificationRequest) {
        return authenticationService.verifyCode(verificationRequest);
    }
}
