package dev.zwazel.springintro.games.wyr;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column; // Import Column
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    @Column(nullable = false, columnDefinition = "integer default 0") // Ensure non-nullable with default 0
    private int votes; // Use primitive int, as it will be initialized by the default value from DB
}
