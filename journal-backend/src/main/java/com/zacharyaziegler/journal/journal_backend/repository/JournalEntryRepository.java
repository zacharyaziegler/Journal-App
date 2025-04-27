package com.zacharyaziegler.journal.journal_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.zacharyaziegler.journal.journal_backend.entity.JournalEntry;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {

}
