package vsb.gem0023.MyReviewSite.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "dlc_review")
public class DLCReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer numerical_rev;

    @Column(nullable = false)
    private String written_rev;

    private Boolean recommendation;

    @Column(nullable = false)
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name = "dlc_platform_id", nullable = false)
    private DLCPlatform dlc_platform;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
