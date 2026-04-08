package dev.zwazel.springintro.games.wyr;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonPropertyOrder({"id", "text", "answers"})
@Entity
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;
}
