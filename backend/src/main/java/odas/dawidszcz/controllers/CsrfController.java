package odas.dawidszcz.controllers;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/csrf")
@CrossOrigin(origins = "http://localhost:4200")
public class CsrfController {

  @GetMapping("/token")
  public CsrfToken csrf(CsrfToken token) {
    return token;
  }
}
