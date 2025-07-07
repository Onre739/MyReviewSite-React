package vsb.gem0023.MyReviewSite.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vsb.gem0023.MyReviewSite.Entities.News;

@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {

}
