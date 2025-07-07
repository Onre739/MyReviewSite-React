package vsb.gem0023.MyReviewSite.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Data
@ToString(exclude = {"dlc_reviews"})
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "dlc_platform")
public class DLCPlatform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate release_date;

    @ManyToOne
    @JoinColumn(name = "dlc_id", nullable = false)
    private DLC dlc;

    @ManyToOne
    @JoinColumn(name = "platform_id", nullable = false)
    private Platform platform;

    @OneToMany(mappedBy = "dlc_platform", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DLCReview> dlc_reviews;
}
