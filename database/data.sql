

INSERT INTO "series" ("name", "imageUrl", "price") VALUES
('Series 1', '/images/series/series1cover.png', 10),
('Series 2','/images/series/series2cover.png', 10),
('Series 3','/images/series/series3cover.png', 10),
('Series 4','/images/series/series4cover.png', 10);

INSERT INTO "smiskis" ("seriesId", "bodyType", "pose", "found", "description", "imageUrl") VALUES
(1, 'Normal', 'Kneeling', 'In corners of a room', 'Always in the corner hugging onto the knees, staring out into the distance pensive in thought.', '/images/series1/huggingknees.png'),
(1, 'Chubby', 'Lounging', 'In corners of a room', 'A lazy Smiski that likes to lie down and lounge about. Does not like anything that involves moving or exercise.', '/images/series1/lounging.png'),
(1, 'Normal', 'Peeking', 'Nearby walls and in hidden places', 'Always hunched over and peeking in from the corner. Needs to gather up courage before approaching anything.', '/images/series1/peeking.png'),
(1, 'Chubby', 'Looking Back', 'In corners of a room', 'A Smiski that scares easily. When found, it will turn back and stare at you in surprise.', '/images/series1/lookingback.png');


INSERT INTO "smiskis" ("seriesId", "bodyType", "pose", "found", "description", "imageUrl") VALUES
(2, 'Normal', 'Kneeling', 'In corners of a room', 'Often sits with knees folded. Has a kind heart but is a little awkward showing it in front of other people.', '/images/series2/kneeling.png'),
(2, 'Normal', 'Staring into space', 'Nearby walls', 'Likes to daydream all day long. Most of the time, this Smiski is lost in its own world.', '/images/series2/daydreaming.png'),
(2, 'Normal', 'Peeking through between his legs', 'In corners of a room', 'A playful Smiski who likes to look out at the world from an upside down point of view.', '/images/series2/peeking.png'),
(2, 'Chubby', 'Listening against wall', 'Nearby wall', 'Curious about the sounds coming in from next door, this Smiski is always listening in.', '/images/series2/listening.png');


INSERT INTO "smiskis" ("seriesId", "bodyType", "pose", "found", "description", "imageUrl") VALUES
(3, 'Normal', 'Bridge', 'Around corners of the room', 'Always deep in thought. To think flexibly, one must act flexibly! ..which is the reason for this pose.', '/images/series3/bridge.png'),
(3, 'Chubby', 'Handstand', 'Around corners of the room', 'Always found doing a handstand against the wall. If you look closely, the peeking Smiski from Series 2 is actually always trying to copy this Smiski.', '/images/series3/handstand.png'),
(3, 'Chubby', 'Rope Climbing', 'Around ropes, strings, cords', 'Curious of what is waiting at the top of the hanging string, this Smiski will climb up without hesitation. However it always has some trouble getting back down. Loves adventure.', '/images/series3/climbing.png'),
(3, 'Normal', 'One hand against the wall', 'Near walls', 'Little Smiski have made their appearance! For some reason these little ones like to line up against the wall in this pose.', '/images/series3/little.png');

INSERT INTO "smiskis" ("seriesId", "bodyType", "pose", "found", "description", "imageUrl") VALUES
(4, 'Normal', 'Sneaking', 'In corners of a room', 'Always sneaking and secretly moving. The destination is unknown. Does not like to be found.', '/images/series4/sneaking.png'),
(4, 'Chubby', 'Stuck', 'In the gap between things', 'A Smiski who got stuck on a way to somewhere. It seems that it cannot grasp that its body size.', '/images/series4/stuck.png'),
(4, 'Chubby', 'Stretch Legs', 'In corners of a room', 'A Smiski that is full and cannot move. Love to stretch legs while leaning against the wall.', '/images/series4/relaxing.png'),
(4, 'Slim', 'Defeated', 'In corners of a room', 'A Smiski that is defeated because it cannot find any favorite corner. Sometimes used as a stepping stone for other Smiski.', '/images/series4/defeated.png');


INSERT INTO "shoppingCartItems" ("seriesId", "quantity", "imageUrl","createdAt")
VALUES
(1, 2,'/images/series/series1cover.png', NOW()),
(2, 3, '/images/series/series2cover.png',  NOW()),
(3, 4, '/images/series/series3cover.png',  NOW()),
(4, 5, '/images/series/series4cover.png',  NOW());
