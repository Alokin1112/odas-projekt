package odas.dawidszcz.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import odas.dawidszcz.dto.*;
import odas.dawidszcz.models.User;
import odas.dawidszcz.repositories.UserRepository;
import odas.dawidszcz.utils.Role;
import odas.dawidszcz.utils.Utils;
import org.jboss.aerogear.security.otp.Totp;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationService  {

    private final UserRepository userRepository;
    private final BruteForceProtector bruteForceProtector;
    private final  JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    public final static String AUTHENTICATION_SUFFIX ="_FOR_TFA_VERIFICATION_PURPOSES";

    public AuthenticationResponse register(RegisterDto registerDto){
        if( userRepository.existsByUsername(registerDto.getUsername()) || registerDto.getUsername().endsWith(AUTHENTICATION_SUFFIX)){
            throw new RuntimeException("Incorrect authorization data");
        }
        User user = new User(registerDto.getUsername(),passwordEncoder.encode(registerDto.getPassword()),true,Role.ROLE_USER);
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        String photo;
        try {
            photo = generateQRCode(user);
        } catch (Exception e) {
            photo ="";
        }
        Utils.WaitRandomTime();
        return new AuthenticationResponse(jwtToken,photo);
    }

    public AuthenticationResponse login(LoginDto loginDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword())
        );
        User user = (User) loadUserByUsername(loginDto.getUsername());
        Utils.WaitRandomTime();
        user.setUsername(user.getUsername() + AUTHENTICATION_SUFFIX);
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token,"TFA IS REQUIRED");
    }
    public AuthenticationResponse verifyCode(VerificationRequest verificationRequest) {
        User user = (User) loadUserByUsername(verificationRequest.getUsername());
        User userForCheck = new User(user.getUsername() + AUTHENTICATION_SUFFIX);
        if(!jwtService.isTokenValid(verificationRequest.getToken(),userForCheck)){
            throw new BadCredentialsException("Invalid token");
        }
        Totp totp = new Totp(user.getSecret());
        if ( !totp.verify(verificationRequest.getCode()) || !isCodeValid(verificationRequest.getCode())){
            throw new BadCredentialsException("Invalid username, password or verification code.");
        }
        System.out.println("zzz");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(verificationRequest.getUsername(),verificationRequest.getPassword())
        );
        System.out.println("hahaha");
        String jwtToken = jwtService.generateToken(user);
        Utils.WaitRandomTime();
        return new AuthenticationResponse(jwtToken,"");

    }

    public User changeUserPassword(String username, ChangePasswordDto changePasswordDto){
        User user = (User) loadUserByUsername(username);
        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        return userRepository.save(user);
    }

    public String generateQRCode(User user) throws Exception{
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(generateQRImage(user),"png", os);

        return Base64.getEncoder().encodeToString(os.toByteArray());
    }
    private UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if( bruteForceProtector.isBlocked()){
            throw new RuntimeException("IP blocked wait 2 day to try again you bad hacker XD");
        }
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Incorrect authorization data"));
    }

    private BufferedImage generateQRImage(User user) throws Exception{
        String text = "otpauth://totp/odasNotes:"+user.getUsername()+"?secret="+user.getSecret()+"&issuer=odasNotes";
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix bitMatrix = writer.encode(text, BarcodeFormat.QR_CODE, 200, 200);
        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }
    private boolean isCodeValid(String code){
        try{
            Long.parseLong(code);
        } catch (NumberFormatException e){
            return false;
        }
        return true;
    }
}
