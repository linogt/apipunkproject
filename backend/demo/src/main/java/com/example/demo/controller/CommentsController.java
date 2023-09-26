package com.example.demo.controller;

import com.example.demo.model.Comments;
import com.example.demo.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin("http://127.0.0.1:5173")
public class CommentsController {

    @Autowired
    private  CommentsService commentsService;


    @PostMapping("/create")
    public void createComment(
            @RequestParam String email,
            @RequestParam Long idBeer,
            @RequestParam String text) {
        commentsService.createComment(email, idBeer, text);
    }

    @GetMapping("/get")
    public List<Comments> getCommentByIdBeer(@RequestParam Long id) {
        return commentsService.getCommentByIdBeer(id);
    }
}

