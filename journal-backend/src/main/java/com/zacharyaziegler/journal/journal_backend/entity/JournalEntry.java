package com.zacharyaziegler.journal.journal_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "entries")
@Data
public class JournalEntry {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  @Lob
  private String content;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
