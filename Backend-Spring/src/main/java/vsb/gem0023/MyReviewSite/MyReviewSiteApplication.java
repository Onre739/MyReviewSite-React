package vsb.gem0023.MyReviewSite;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import vsb.gem0023.MyReviewSite.Entities.User;
import vsb.gem0023.MyReviewSite.Repositories.UserRepository;
import vsb.gem0023.MyReviewSite.Services.MyUserDetailsService;

import java.util.List;

@Log4j2
@SpringBootApplication
public class MyReviewSiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyReviewSiteApplication.class, args);
		System.out.println("Using database: " + System.getProperty("spring.datasource.url"));
	}


//	@Bean
//	public CommandLineRunner hashPasswords(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//		return args -> {
//			List<User> users = userRepository.findAll();
//
//			for (User user : users) {
//				String password = user.getPassword();
//
//				// Ověříme, jestli už heslo náhodou není hashované
//				if (!password.startsWith("$2a$")) {
//					String hashedPassword = passwordEncoder.encode(password);
//					user.setPassword(hashedPassword);
//				}
//			}
//
//			userRepository.saveAll(users);
//			System.out.println("✅ Všechna hesla byla zahashována.");
//		};
//	}

}
