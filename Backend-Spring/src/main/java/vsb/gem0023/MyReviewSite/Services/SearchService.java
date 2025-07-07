package vsb.gem0023.MyReviewSite.Services;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vsb.gem0023.MyReviewSite.Entities.Game;
import vsb.gem0023.MyReviewSite.Repositories.GameRepository;

@Data
@Service
public class SearchService {
    private GameRepository gameRepository;

    @Autowired
    public SearchService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Page<Game> findGamesByName(String query, Pageable pageable){
        return gameRepository.findByNameContaining(query, pageable);
    }
}
