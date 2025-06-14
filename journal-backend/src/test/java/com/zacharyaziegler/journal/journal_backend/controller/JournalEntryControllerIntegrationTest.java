package com.zacharyaziegler.journal.journal_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zacharyaziegler.journal.journal_backend.entity.JournalEntry;
import com.zacharyaziegler.journal.journal_backend.repository.JournalEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class JournalEntryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JournalEntryRepository repo;

    @Autowired
    private ObjectMapper objectMapper; // for JSON serialization

    @BeforeEach
    void setUp() {
        repo.deleteAll(); // clean slate before each test
    }

    @Test
    void testCreateAndFetchEntry() throws Exception {
        // Create entry JSON
        JournalEntry entry = new JournalEntry();
        entry.setTitle("Integration Test");
        entry.setContent("This is from an integration test");

        // POST the entry
        mockMvc.perform(post("/api/entries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(entry)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Integration Test"));

        // Ensure entry was actually saved in DB
        List<JournalEntry> all = repo.findAll();
        assertThat(all).hasSize(1);
        assertThat(all.get(0).getContent()).isEqualTo("This is from an integration test");
    }

    @Test
    void testGetAllEntriesReturnsSavedEntries() throws Exception {
        JournalEntry entry1 = new JournalEntry();
        entry1.setTitle("First");
        entry1.setContent("First content");

        JournalEntry entry2 = new JournalEntry();
        entry2.setTitle("Second");
        entry2.setContent("Second content");

        repo.saveAll(List.of(entry1, entry2));

        mockMvc.perform(get("/api/entries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("First"))
                .andExpect(jsonPath("$[*].title").value(org.hamcrest.Matchers.containsInAnyOrder("First", "Second")));
    }

    @Test
    void testGetEntryByIdReturnsCorrectEntry() throws Exception {
        JournalEntry entry = new JournalEntry();
        entry.setTitle("Lookup Test");
        entry.setContent("Content for lookup");
        JournalEntry saved = repo.save(entry);

        mockMvc.perform(get("/api/entries/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Lookup Test"))
                .andExpect(jsonPath("$.content").value("Content for lookup"));
    }

    @Test
    void testGetEntryByIdReturns404WhenMissing() throws Exception {
        mockMvc.perform(get("/api/entries/999"))
                .andExpect(status().isNotFound());
    }
}
