package com.backend.cartapp.controllers;

import com.backend.cartapp.models.entities.User;
import com.backend.cartapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Ajusta si tu frontend corre en otro puerto
public class AuthController {

  @Autowired
  private UserRepository userRepo;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    if (userRepo.findByEmail(email).isPresent()) {
      return ResponseEntity.badRequest().body(Map.of("error", "El correo ya está registrado."));
    }

    User user = new User();
    user.setName(body.get("name"));
    user.setEmail(email);
    user.setTel(body.get("tel"));
    user.setPassword(body.get("password")); // Guardada en texto plano
    userRepo.save(user);

    return ResponseEntity.ok(Map.of("user", user));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
    Optional<User> opt = userRepo.findByEmail(body.get("email"));
    if (opt.isEmpty() || !opt.get().getPassword().equals(body.get("password"))) {
      return ResponseEntity.status(401).body(Map.of("error", "Correo o contraseña inválidos."));
    }

    return ResponseEntity.ok(Map.of("user", opt.get()));
  }

  @PutMapping("/profile")
  public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> body) {
    Optional<User> opt = userRepo.findByEmail(body.get("email"));
    if (opt.isEmpty()) return ResponseEntity.status(404).build();

    User user = opt.get();
    user.setName(body.get("name"));
    user.setTel(body.get("tel"));
    userRepo.save(user);

    return ResponseEntity.ok(user);
  }
}