#!/bin/bash

# Conexión a la base de datos
DB_URL="postgresql://user:password@db:5432/mydatabase"

# Consulta para verificar si la tabla 'Posts' está vacía
IS_EMPTY=$(psql "$DB_URL" -tAc "SELECT COUNT(*) = 0 FROM Posts;")

if [ "$IS_EMPTY" = "t" ]; then
  echo "Database is empty. Populating data..."
  # Insertar datos creativos
  psql "$DB_URL" <<EOF
  INSERT INTO Posts (name, description) VALUES
  ('The Quantum Coder', 'Exploring the universe of algorithms in parallel dimensions.'),
  ('Rustic Retreat', 'Guide to building your own cozy cabin in the woods.'),
  ('Pixel Perfection', 'How to create 8-bit art like a pro.'),
  ('Code & Coffee', 'The best coffee blends for late-night debugging.'),
  ('Gadget Guru', 'Reviews of futuristic tech gadgets.'),
  ('Urban Nomad', 'Living the van life in the heart of the city.'),
  ('Cyber Chronicles', 'Tales from the world of ethical hacking.'),
  ('Neural Notes', 'Demystifying AI and machine learning concepts.'),
  ('Baking Bytes', 'Delicious dessert recipes with a tech twist.'),
  ('Travel Through Time', 'Chronicles of historical landmarks with modern guides.'),
  ('Solar Hackers', 'DIY solar energy projects for your home.'),
  ('Mystic Mechanics', 'The art of ancient engineering rediscovered.'),
  ('Zero to Hero Dev', 'How to become a full-stack developer from scratch.'),
  ('Eco Innovations', 'Technologies saving the planet one step at a time.'),
  ('Digital Minimalism', 'How to declutter your digital life and focus on what matters.');
EOF
else
  echo "Database is already populated. Skipping data insertion."
fi
