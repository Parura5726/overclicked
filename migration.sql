CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    amounts TEXT,
    register TEXT,
    prepared BOOLEAN DEFAULT false,
    served BOOLEAN DEFAULT false,
    canceled BOOLEAN DEFAULT false
);
CREATE TABLE IF NOT EXISTS menus(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT,
    description TEXT,
    totalStocks INTEGER,
    stocks INTEGER
);
-----
INSERT INTO menus(id, name, description, totalStocks, stocks)
VALUES(
        0,
        'Temptation',
        'Tomates séchées, Mozza, Pesto',
        145,
        145
    ) ON CONFLICT DO NOTHING;
INSERT INTO menus(id, name, description, totalStocks, stocks)
VALUES(
        1,
        'Chaos',
        'Chèvre, Miel',
        165,
        165
    ) ON CONFLICT DO NOTHING;
INSERT INTO menus(id, name, description, totalStocks, stocks)
VALUES(
        2,
        'Oblivion',
        'Champigons, Oignons caramelisés, Pesto',
        95,
        95
    ) ON CONFLICT DO NOTHING;
INSERT INTO menus(id, name, description, totalStocks, stocks)
VALUES(
        3,
        'Craving',
        'Ovomaltine',
        95,
        95
    ) ON CONFLICT DO NOTHING;