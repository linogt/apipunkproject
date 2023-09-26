package com.example.demo.service;

import com.example.demo.model.Comments;
import com.example.demo.repository.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;


    public void createComment(String email, Long idBeer, String text) {
        Comments comment = new Comments();
        comment.setEmail(email);
        comment.setIdBeer(idBeer);
        comment.setText(text);
        commentsRepository.save(comment);
    }


    public List<Comments> getCommentByIdBeer(Long id) {
        return commentsRepository.findByIdBeer(id);
    }
}
