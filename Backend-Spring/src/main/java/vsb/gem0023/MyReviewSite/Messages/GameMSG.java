package vsb.gem0023.MyReviewSite.Messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import vsb.gem0023.MyReviewSite.Entities.*;

import java.util.List;
import java.util.Optional;

@Data
@AllArgsConstructor
public class GameMSG {
    private Optional<Game> game;
    private List<Platform> platforms;
    private List<SubGenre> subGenres;
    private List<GameReview> gameReviews;
    private int totalPages;
}
