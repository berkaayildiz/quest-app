package com.berkaayildiz.quest_app_backend.security;

import java.time.Instant;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;


@Component
public class JwtTokenProvider 
{   
    @Value("${quest_app.app_secret}")
    private String APP_SECRET;

    @Value("${quest_app.expires_in}")
    private long EXPIRES_IN;


    @SuppressWarnings("deprecation")
    public String generateJwtTokenByUserId(Long userId) {
        Date expireDate = Date.from(Instant.now().plusSeconds(EXPIRES_IN));

        return Jwts.builder()
                .setSubject(Long.toString(userId))
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, APP_SECRET)
                .compact();
    }

    public Long getUserIdFromJwt(String token) {
        io.jsonwebtoken.Claims claims = Jwts.parser()
                .setSigningKey(APP_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return Long.valueOf(claims.getSubject());
    }

    @SuppressWarnings("deprecation")
    public boolean validateToken(String token) {
        try {
            io.jsonwebtoken.Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token);
            return !isTokenExpired(token);
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            System.out.println("Token has expired");
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            System.out.println("Malformed token");
        } catch (io.jsonwebtoken.SignatureException e) {
            System.out.println("Invalid signature");
        } catch (io.jsonwebtoken.UnsupportedJwtException e) {
            System.out.println("Unsupported token");
        } catch (IllegalArgumentException e) {
            System.out.println("Empty token");
        }

        return false;
    }

    private boolean isTokenExpired(String token) {
        Date expireDate = io.jsonwebtoken.Jwts.parser()
                .setSigningKey(APP_SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();

        return expireDate.before(new Date());
    } 
}
