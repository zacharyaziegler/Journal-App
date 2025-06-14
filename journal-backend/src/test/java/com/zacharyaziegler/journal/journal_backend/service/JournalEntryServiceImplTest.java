package com.zacharyaziegler.journal.journal_backend.service;

import com.zacharyaziegler.journal.journal_backend.entity.JournalEntry;
import com.zacharyaziegler.journal.journal_backend.repository.JournalEntryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class JournalEntryServiceImplTest {
    
    @Mock
    private JournalEntryRepository repo;

    @InjectMocks
    private JournalEntryServiceImpl service;

    @Test
    void testFindAllReturnsEntries() {
        JournalEntry entry1 = new JournalEntry();
        entry1.setTitle("First");

        JournalEntry entry2 = new JournalEntry();
        entry2.setTitle("Second");

        when(repo.findAll()).thenReturn(List.of(entry1, entry2));
        
        List<JournalEntry> result = service.findAll();

        assertEquals(2, result.size());
        assertEquals("First", result.get(0).getTitle());
        verify(repo).findAll();
    }

    @Test
    void testSaveReturnsSavedEntry() {
        JournalEntry entry = new JournalEntry();
        entry.setTitle("Saved");

        when(repo.save(entry)).thenReturn(entry);

        JournalEntry result = service.save(entry);

        assertEquals("Saved", result.getTitle());
        verify(repo).save(entry);
    }

    @Test
    void findByIdReturnsEntryIfExists() {
        JournalEntry entry = new JournalEntry();
        entry.setId(1L);
        entry.setTitle("Test Entry");

        when(repo.findById(1L)).thenReturn(Optional.of(entry));

        JournalEntry result = service.findById(1L);

        assertNotNull(result);
        assertEquals("Test Entry", result.getTitle());
    }

    @Test
    void testFindByIdReturnsNullIfMissing() {
        when(repo.findById(99L)).thenReturn(Optional.empty());

        JournalEntry result = service.findById(99L);

        assertNull(result);
    }

    @Test
    void testDeleteCallsRepo() {
        service.delete(1L);
        verify(repo).deleteById(1L);
    }
}
