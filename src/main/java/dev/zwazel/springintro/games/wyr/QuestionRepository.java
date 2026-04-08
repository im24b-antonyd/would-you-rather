package dev.zwazel.springintro.games.wyr;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> id(Long id);
    Optional<Question> findByAnswersContaining(Answer answer); // New method to find question by answer
}
