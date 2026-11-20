# 🗄️ Database Schema Specification

The application uses MongoDB Atlas with Mongoose object modeling.

## Collections & Relationships

```mermaid
erDiagram
    USER ||--o{ TRANSACTION : "creates"
    USER ||--o{ BUDGET : "defines"
    USER ||--o{ GOAL : "tracks"
    USER ||--o{ RECURRING_TRANSACTION : "subscribes"

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string currency
        string theme
        date createdAt
    }

    TRANSACTION {
        ObjectId _id PK
        ObjectId userId FK
        string type
        number amount
        string category
        string description
        date date
        string[] tags
    }

    BUDGET {
        ObjectId _id PK
        ObjectId userId FK
        string category
        number monthlyLimit
        number month
        number year
        number alertThreshold
    }

    GOAL {
        ObjectId _id PK
        ObjectId userId FK
        string title
        number targetAmount
        number currentAmount
        date deadline
        string category
        boolean isCompleted
    }

    RECURRING_TRANSACTION {
        ObjectId _id PK
        ObjectId userId FK
        string title
        string type
        number amount
        string category
        string frequency
        date nextDueDate
        boolean isActive
    }
```

## Compound Indexes
- **Transaction**: `{ userId: 1, date: -1 }`, `{ userId: 1, type: 1 }`
- **Budget**: `{ userId: 1, category: 1, month: 1, year: 1 }` (Unique constraint)
- **Goal**: `{ userId: 1, deadline: 1 }`
- **Recurring**: `{ userId: 1, nextDueDate: 1 }`
