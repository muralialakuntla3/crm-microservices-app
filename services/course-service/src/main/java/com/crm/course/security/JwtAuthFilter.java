package com.crm.course.security;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.FilterChain;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import java.io.IOException;
import java.util.Collections;


@Component
public class JwtAuthFilter extends OncePerRequestFilter {


@Value("${jwt.secret}")
private String jwtSecret;


@Value("${jwt.header}")
private String header;


@Value("${jwt.prefix}")
private String prefix;


@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
throws ServletException, IOException {
String auth = request.getHeader(header);
if (auth != null && auth.startsWith(prefix.trim())) {
String token = auth.substring(prefix.trim().length()).trim();
try {
Claims claims = Jwts.parserBuilder().setSigningKey(jwtSecret.getBytes()).build().parseClaimsJws(token).getBody();
String userId = claims.getSubject();
String role = claims.get("role", String.class);
UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
userId,
null,
Collections.singletonList(new SimpleGrantedAuthority(role != null ? "ROLE_" + role.toUpperCase() : "ROLE_USER"))
);
SecurityContextHolder.getContext().setAuthentication(authentication);
} catch (Exception e) {
// invalid token -> no auth set
}
}
filterChain.doFilter(request, response);
}
}