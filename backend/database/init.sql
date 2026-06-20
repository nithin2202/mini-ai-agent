USE ai_support_agent;

-- FAQS TABLE

CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    keyword VARCHAR(100) NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- QUERY LOGS TABLE

CREATE TABLE IF NOT EXISTS query_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    query_text TEXT NOT NULL,
    route_type VARCHAR(20) NOT NULL,
    cache_hit BOOLEAN DEFAULT FALSE,
    response_text LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    prompt_tokens INT DEFAULT 0,
    completion_tokens INT DEFAULT 0,
    estimated_cost DECIMAL(10,6) DEFAULT 0.000000,
    response_time_ms INT DEFAULT 0
);

-- SEMANTIC CACHE TABLE

CREATE TABLE IF NOT EXISTS semantic_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    query_text TEXT NOT NULL,
    embedding JSON NOT NULL,
    response_text LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DEFAULT FAQ DATA

INSERT INTO faqs (keyword, answer)
VALUES
('refund', 'Refunds are processed within 7 days.'),
('pricing', 'Plans start from $10/month.'),
('contact', 'Contact us at support@example.com.'),
('support', 'Support is available 24/7.');