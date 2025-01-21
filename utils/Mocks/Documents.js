export const mockUsers = [
  {
    id: 1,
    full_name: "John Doe",
    email: "johndoe@example.com",
    password: "encryptedpassword1", // In a real application, the password should be hashed
    role: "Admin",
  },
  {
    id: 2,
    full_name: "Jane Smith",
    email: "janesmith@example.com",
    password: "encryptedpassword2", // In a real application, the password should be hashed
    role: "Regular User",
  },
  {
    id: 3,
    full_name: "Alice Johnson",
    email: "alicejohnson@example.com",
    password: "encryptedpassword3", // In a real application, the password should be hashed
    role: "Regular User",
  },
];


export const document = [
  {
    id: 1,
    title: "Project Overview",
    content: "This is an overview of the new project that includes milestones, deliverables, and deadlines.",
    owner_id: 1, // Owner is John Doe (Admin)
    created_at: "2025-01-20T08:00:00Z",
    updated_at: "2025-01-21T10:30:00Z",
  },
  {
    id: 2,
    title: "User Guide for System",
    content: "This document provides a comprehensive guide to using the system, including setup and configuration.",
    owner_id: 2, // Owner is Jane Smith (Regular User)
    created_at: "2025-01-19T14:15:00Z",
    updated_at: "2025-01-20T16:45:00Z",
  },
  {
    id: 3,
    title: "Design Document",
    content: "A detailed document outlining the system's architecture, design principles, and key components.",
    owner_id: 1, // Owner is John Doe (Admin)
    created_at: "2025-01-15T11:30:00Z",
    updated_at: "2025-01-18T09:00:00Z",
  },
  {
    id: 4,
    title: "API Documentation",
    content: "This document describes the API endpoints, data formats, and usage examples for the public API.",
    owner_id: 3, // Owner is Alice Johnson (Regular User)
    created_at: "2025-01-17T13:30:00Z",
    updated_at: "2025-01-20T12:00:00Z",
  },
];
