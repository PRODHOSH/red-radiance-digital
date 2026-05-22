-- Offers table
CREATE TABLE IF NOT EXISTS offers (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  num     TEXT    NOT NULL,
  name    TEXT    NOT NULL,
  price   TEXT    NOT NULL,
  summer  INTEGER NOT NULL DEFAULT 0,
  services TEXT   NOT NULL,   -- JSON array stored as text
  active  INTEGER NOT NULL DEFAULT 1
);

-- Seed current offers
INSERT INTO offers (num, name, price, summer, services) VALUES
  ('01', 'Combo',          '799', 0, '["Full Arm Wax","Under Arm","Half Leg"]'),
  ('02', 'Combo',          '499', 0, '["Hair Colour Root Touch Up","Hair Wash","U Cut"]'),
  ('03', 'Combo',          '999', 0, '["Pedicure","Manicure"]'),
  ('04', 'Summer Special', '599', 1, '["D-Tan","Whitening Facial","Threading"]'),
  ('05', 'Summer Special', '299', 1, '["Hot Oil Massage (Scalp)"]');
