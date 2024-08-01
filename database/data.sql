-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);


INSERT INTO "series" ("name", "imageUrl") VALUES
('Series 1', '/images/series/series1cover.png'),
('Series 2','/images/series/series2cover.png'),
('Series 3','/images/series/series3cover.png'),
('Series 4','/images/series/series4cover.png');

INSERT INTO "smiskis" ("seriesId", "bodyType", "pose", "found", "description") VALUES
(1, 'Normal', 'Kneeling', 'In corners of a room', 'Always in the corner hugging onto the knees, staring out into the distance pensive in thought.'),
(1, 'Chubby', 'Lounging', 'In corners of a room', 'A lazy Smiski that likes to lie down and lounge about. Does not like anything that involves moving or exercise.'),
(1, 'Normal', 'Peeking', 'Nearby walls and in hidden places', 'Always hunched over and peeking in from the corner. Needs to gather up courage before approaching anything.'),
(1, 'Chubby', 'Looking Back', 'In corners of a room', 'A Smiski that scares easily. When found, it will turn back and stare at you in surprise.');


INSERT INTO "smiskis" ("seriesId", "bodyType", "pose", "found", "description") VALUES
(2, 'Normal', 'Kneeling', 'In corners of a room', 'Often sits with knees folded. Has a kind heart but is a little awkward showing it in front of other people.'),
(2, 'Normal', 'Staring into space', 'Nearby walls', 'Likes to daydream all day long. Most of the time, this Smiski is lost in its own world.'),
(2, 'Normal', 'Peeking through between his legs', 'In corners of a room', 'A playful Smiski who likes to look out at the world from an upside down point of view.'),
(2, 'Chubby', 'Listening against wall', 'Nearby wall', 'Curious about the sounds coming in from next door, this Smiski is always listening in.');


INSERT INTO "smiskis" ("seriesId", "bodyType", "pose", "found", "description") VALUES
(3, 'Normal', 'Bridge', 'Around corners of the room', 'Always deep in thought. To think flexibly, one must act flexibly! ..which is the reason for this pose.'),
(3, 'Chubby', 'Handstand', 'Around corners of the room', 'Always found doing a handstand against the wall. If you look closely, the peeking Smiski from Series 2 is actually always trying to copy this Smiski.'),
(3, 'Chubby', 'Rope Climbing', 'Around ropes, strings, cords', 'Curious of what is waiting at the top of the hanging string, this Smiski will climb up without hesitation. However it always has some trouble getting back down. Loves adventure.'),
(3, 'Normal', 'One hand against the wall', 'Near walls', 'Little Smiski have made their appearance! For some reason these little ones like to line up against the wall in this pose.');

INSERT INTO "smiskis" ("seriesId", "bodyType", "pose", "found", "description") VALUES
(4, 'Normal', 'Sneaking', 'In corners of a room', 'Always sneaking and secretly moving. The destination is unknown. Does not like to be found.'),
(4, 'Chubby', 'Stuck', 'In the gap between things', 'A Smiski who got stuck on a way to somewhere. It seems that it cannot grasp that its body size.'),
(4, 'Chubby', 'Stretch Legs', 'In corners of a room', 'A Smiski that is full and cannot move. Love to stretch legs while leaning against the wall.'),
(4, 'Slim', 'Defeated', 'In corners of a room', 'A Smiski that is defeated because it cannot find any favorite corner. Sometimes used as a stepping stone for other Smiski.');


INSERT INTO "shoppingCartItems" ("seriesId", "quantity", "createdAt")
VALUES (1, 2, NOW());
