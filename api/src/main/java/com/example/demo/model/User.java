package com.example.demo.model;

public class User {

    private Integer id;
    private String nome;
    private String email;
    private boolean processado;

    public User(Integer id, String nome, String email, boolean processado) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.processado = processado;
    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public boolean isProcessado() {
        return processado;
    }
}
