package com.zacharyaziegler.journal.journal_backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.zacharyaziegler.journal.journal_backend.entity.JournalEntry;
import com.zacharyaziegler.journal.journal_backend.service.JournalEntryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/entries")
@CrossOrigin(origins = "http://localhost:5173")
public class JournalEntryController {
    private final JournalEntryService service;

    public JournalEntryController(JournalEntryService service) {
        this.service = service;
    }

    @GetMapping
    public List<JournalEntry> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public JournalEntry get(@PathVariable Long id) {
        JournalEntry found = service.findById(id);
        if (found == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found");
        }
        return found;
    }

    @PostMapping
    public JournalEntry create(@RequestBody JournalEntry entry) {
        entry.setCreatedAt(LocalDateTime.now());
        return service.save(entry);
    }

    @PutMapping("/{id}")
    public JournalEntry update(@PathVariable Long id,
                               @RequestBody JournalEntry incoming) {
      JournalEntry existing = service.findById(id); // Retrieve existing row
      if (existing == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
      }
      
      // Copy only the fields to be changed (not createdAt since its an update)
      existing.setTitle(incoming.getTitle());
      existing.setContent(incoming.getContent());
      existing.setUpdatedAt(LocalDateTime.now());
    
      return service.save(existing);
    }
    

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    
}
