CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    amounts TEXT,
    register TEXT,
    prepared BOOLEAN DEFAULT false,
    served BOOLEAN DEFAULT false
);