CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN DEFAULT true,
    "lastLoginAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create feedbacks table
CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    "wordRating" VARCHAR(50) NOT NULL,
    topics JSON NOT NULL,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "userId" INTEGER REFERENCES users(id) ON DELETE SET NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_feedbacks_rating ON feedbacks(rating);
CREATE INDEX idx_feedbacks_wordRating ON feedbacks("wordRating");
CREATE INDEX idx_feedbacks_createdAt ON feedbacks("createdAt");
CREATE INDEX idx_feedbacks_userId ON feedbacks("userId");

-- Insert admin user (password: admin123 hashed with bcrypt)
-- Hash: $2a$10$N9qo8uLOickgx2ZMRZoMy.Mr/6yKbqYKR8V5KKcNOZRzq5bCx8C8K
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@feedback.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mr/6yKbqYKR8V5KKcNOZRzq5bCx8C8K', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert sample feedback (optional)
INSERT INTO feedbacks (rating, "wordRating", topics, "ipAddress", "userAgent") 
VALUES 
    (5, 'Ol-aanaa', '["Technology"]', '127.0.0.1', 'Sample Browser'),
    (4, 'Baayee Gaarii', '["Science", "Art"]', '127.0.0.1', 'Sample Browser'),
    (3, 'Quubsaa', '["Sports"]', '127.0.0.1', 'Sample Browser');

-- Verify data
SELECT 'Users count: ' || COUNT(*) FROM users;
SELECT 'Feedbacks count: ' || COUNT(*) FROM feedbacks;
SELECT * FROM users;
SELECT * FROM feedbacks;