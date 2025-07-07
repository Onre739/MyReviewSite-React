package vsb.gem0023.MyReviewSite.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vsb.gem0023.MyReviewSite.Entities.GamePlatform;
import vsb.gem0023.MyReviewSite.Entities.GameReview;

import java.util.List;

@Repository
public interface GameReviewRepository extends JpaRepository<GameReview, Integer> {
    @Query("SELECT gr FROM GameReview gr WHERE gr.game_platform.game.id = :gameId")
    Page<GameReview> findByGameId(@Param("gameId") int gameId, Pageable pageable);
}
