package odas.dawidszcz.utils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;


import java.io.IOException;

public class CustomCsrfFilter extends OncePerRequestFilter {

  public static final String CSRF_COOKIE_NAME = "XSRF-TOKEN";
  public static final String CSRF_HEADER_NAME = "X-XSRF-TOKEN";

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {

    CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());

    if (csrf != null) {

      Cookie cookie = WebUtils.getCookie(request, CSRF_COOKIE_NAME);
      String token = csrf.getToken();

      System.out.println("COOKIE");

      if (cookie == null || token != null && !token.equals(cookie.getValue())) {
        System.out.println("2");
        cookie = new Cookie(CSRF_COOKIE_NAME, token);
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        response.addCookie(cookie);
      }
    }

    filterChain.doFilter(request, response);
  }
}
