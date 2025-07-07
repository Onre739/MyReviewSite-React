package vsb.gem0023.MyReviewSite.Services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vsb.gem0023.MyReviewSite.Entities.Game;
import vsb.gem0023.MyReviewSite.Entities.GamePlatform;
import vsb.gem0023.MyReviewSite.Entities.GameReview;
import vsb.gem0023.MyReviewSite.Entities.User;
import vsb.gem0023.MyReviewSite.Messages.ReviewMSG;
import vsb.gem0023.MyReviewSite.Repositories.GameRepository;
import vsb.gem0023.MyReviewSite.Repositories.GameReviewRepository;
import vsb.gem0023.MyReviewSite.Repositories.UserRepository;

@Service
@Transactional
public class ReviewService {

    private GameReviewRepository gameReviewRepository;
    private GameRepository gameRepository;
    private UserRepository userRepository;

    @Autowired
    public ReviewService(GameReviewRepository gameReviewRepository, GameRepository gameRepository, UserRepository userRepository){
        this.gameReviewRepository = gameReviewRepository;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    public GameReview createGameReview(ReviewMSG reviewMSG) {
        Game game = gameRepository.findById(reviewMSG.getGame_id())
                .orElseThrow(() -> new EntityNotFoundException("Game not found"));

        User user = userRepository.findByEmail(reviewMSG.getUser_mail())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        GamePlatform gamePlatform = game.getGame_platforms().stream()
                .filter(gp -> gp.getPlatform().getName().equals(reviewMSG.getPlatform_name()))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Platform not found for this game"));

        GameReview newReview = new GameReview(
                null,
                reviewMSG.getNumerical_rev(),
                reviewMSG.getWritten_rev(),
                reviewMSG.getRecommendation(),
                reviewMSG.getTime(),
                gamePlatform,
                user
        );

        return gameReviewRepository.save(newReview);
    }
}
