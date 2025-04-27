package com.zacharyaziegler.journal.journal_backend.service;

import java.util.List;
import com.zacharyaziegler.journal.journal_backend.entity.JournalEntry;

public interface JournalEntryService {
    List<JournalEntry> findAll();
    JournalEntry findById(Long id);
    JournalEntry save(JournalEntry entry);
    void delete(Long id);
}
