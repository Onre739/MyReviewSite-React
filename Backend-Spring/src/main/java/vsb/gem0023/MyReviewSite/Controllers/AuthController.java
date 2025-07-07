package vsb.gem0023.MyReviewSite.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vsb.gem0023.MyReviewSite.Entities.User;
import vsb.gem0023.MyReviewSite.Repositories.UserRepository;
import vsb.gem0023.MyReviewSite.Services.MyUserDetailsService;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkAuthStatus() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        boolean isAuthenticated = auth != null
                && auth.isAuthenticated()
                && !(auth instanceof AnonymousAuthenticationToken);

        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", isAuthenticated);

        if (isAuthenticated) {
            response.put("username", auth.getName());
            response.put("roles", auth.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList()));

            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            response.put("userDetails", Map.of(
                    "fullName", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
            ));
        }

        return ResponseEntity.ok(response);
    }
}

