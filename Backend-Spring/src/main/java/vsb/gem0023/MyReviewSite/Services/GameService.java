package vsb.gem0023.MyReviewSite.Services;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vsb.gem0023.MyReviewSite.Entities.*;
import vsb.gem0023.MyReviewSite.Repositories.GameRepository;
import vsb.gem0023.MyReviewSite.Repositories.GameReviewRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@Service
public class GameService {

    private GameRepository gameRepository;
    private GameReviewRepository gameReviewRepository;

    @Autowired
    public GameService(GameRepository gameRepository, GameReviewRepository gameReviewRepository){
        this.gameRepository = gameRepository;
        this.gameReviewRepository = gameReviewRepository;
    }

    public Optional<Game> findGameById(Integer id){
        return gameRepository.findById(id);
    }

    public List<Platform> findGamePlatforms(int id){
        Optional<Game> game = gameRepository.findById(id);
        List<Platform> platforms = new ArrayList<>();

        game.ifPresent(game1 -> {

            for (GamePlatform gp : game1.getGame_platforms()){
                platforms.add(gp.getPlatform());
            }

        });

        return platforms;
    }

    public List<SubGenre> findGameGenres(int id){
        Optional<Game> game = gameRepository.findById(id);
        List<SubGenre> subGenres = new ArrayList<>();

        game.ifPresent(game1 -> {

            for (GameSubGenre gsg : game1.getGame_sub_genres()){
                subGenres.add(gsg.getSub_genre());
            }

        });

        return subGenres;
    }

    public Page<GameReview> findGameReviewsByGameId(int id, Pageable pageable){
        return gameReviewRepository.findByGameId(id, pageable);
    }

}
