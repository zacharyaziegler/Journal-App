package com.zacharyaziegler.journal.journal_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zacharyaziegler.journal.journal_backend.entity.JournalEntry;
import com.zacharyaziegler.journal.journal_backend.repository.JournalEntryRepository;

@Service
public class JournalEntryServiceImpl implements JournalEntryService {
    private final JournalEntryRepository repo;
    public JournalEntryServiceImpl(JournalEntryRepository repo) {
        this.repo = repo;
    }


    @Override
    public List<JournalEntry> findAll() {
        return repo.findAll();
    }

    @Override
    public JournalEntry findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public JournalEntry save(JournalEntry entry) {
        return repo.save(entry);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
}
