# TaskHive Schema Documentation

## Validation Schemas

### 1. signupSchema.ts

- **Purpose**: Defines validation rules for user registration using Zod
- **Uservalidation**:
  - Username must be 2-20 characters long
  - Only alphanumeric characters and underscores allowed
- **SignUpSchema Components**:
  - Username (using Uservalidation)
  - Email (must be valid email format)
  - Password (minimum 6 characters)

### 2. verifySchema.ts

- **Purpose**: Handles verification code validation
- Requires exactly 6 digits for the verification code

### 3. messageSchema.ts

- **Purpose**: Validates message content
- **Requirements**:
  - Minimum 10 characters
  - Maximum 300 characters

### 4. acceptSchema.ts

- **Purpose**: Simple schema for toggling message acceptance
- Uses a boolean flag for accepting/rejecting messages

### 5. User.ts (MongoDB Model)

- **Purpose**: Defines the database structure using Mongoose
- **Schema Structure**:
  1. `MessagesSchema`:
     - Stores individual messages with content and timestamp
  2. `UserSchema`:
     - Username (unique, trimmed)
     - Email (unique, with regex validation)
     - Password
     - Verification code and expiry
     - Account verification status
     - Message acceptance status
     - Array of messages

## Application Flow

1. User signs up → Data validated through `signUpSchema`
2. User data stored in MongoDB using `UserSchema`
3. Verification code sent and validated using `verifySchema`
4. Users can toggle message acceptance using `acceptSchema`
5. Message content validated through `messageSchema`
6. Messages stored in user's document using `MessagesSchema`
