package dev.zwazel.springintro.games.wyr;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;


    @GetMapping("/{id}")
    public ResponseEntity<Question> findQuestion(@PathVariable("id") Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow();
        return ResponseEntity.ok(question);
    }

    @GetMapping("/random")
    public ResponseEntity<Question> findRandomQuestion() {
        long maxId = questionRepository.findMaxId().orElse(0L);
        Optional<Question> question = Optional.empty();
        while (question.isEmpty()) {
            Long randomId = (long) (Math.random() * maxId + 1);
            question = questionRepository.findById(randomId);
        }
        return ResponseEntity.ok(question.get());
    }

    @PostMapping("/create")
    public ResponseEntity<Question> createQuestion(@RequestBody Question input) {
        answerRepository.saveAll(input.getAnswers());
        Question savedQuestion = questionRepository.save(input);
        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }

    @PutMapping("/vote/{answerId}") // New endpoint for voting
    public ResponseEntity<Question> voteForAnswer(@PathVariable("answerId") Long answerId) {
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found with id: " + answerId));
        answer.setVotes(answer.getVotes() + 1);
        answerRepository.save(answer);

        // Find the question associated with this answer to return the updated question
        Question question = questionRepository.findByAnswersContaining(answer)
                .orElseThrow(() -> new RuntimeException("Question not found for answer id: " + answerId));
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Question> deleteQuestion(@PathVariable("id") Long questionId) {
        questionRepository.deleteById(questionId);
        return ResponseEntity.ok().build();
    }
}
