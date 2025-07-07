package vsb.gem0023.MyReviewSite.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vsb.gem0023.MyReviewSite.Entities.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
    Page<Game> findByNameContaining(String name, Pageable pageable);
}
