package com.example.demo.jwt;


import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtil {

    private static final String SECRET_KEY = "3059fc0ead47f4da47a0de05acd604c4bc83ac8014297586e3e4dd6f79aaab73b14113313181113f186c49a64e5bd7aaccd36561405a7344a092c9ece350607db85bf5ce03ac541931d02418fd317b32834ecb85cf5027a09a8772932c2398717ab191ab087be200166646d10cd3a3982db898e29ea9ff26f04cf92f099007c1678d643f13bdf67d5e0119fdbe1d881bdd1ca54eba929af3056a98de05e81b57826ad519e0a477ceba0e5d32135681dd8aa91086a8f24b5cb70031d449865ac644b8fbe58c2baac592496691f7ff0f8dd96891a8341f89ad14da621293a6e287b40d29b12bbf6e78b87f7c2c8d23d6d9e989c99711fafe9c9d624e90cbb0387f"; // Use a stronger key in production

    public String generateToken(String email, String role, Long inspectorId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        claims.put("inspectorId", inspectorId);
        

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public Long extractInspectorId(String token) {
        return extractAllClaims(token).get("inspectorId", Long.class);
    }

    public Boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public Boolean validateToken(String token, String email) {
        final String username = extractEmail(token);
        return (username.equals(email) && !isTokenExpired(token));
    }
}
