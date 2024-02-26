const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/event');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');
const { checkAuth } = require('../util/auth');
const { dbClient } = require('../data/dbclient');

const router = express.Router();

router.get('/test', async (req, res, next) => {
  try {
    dbClient.connect().then(() => {
      console.log('Connected to EVPrime database.');
      dbClient.query("INSERT INTO \"Events\" (id, title, image, date, location, description) VALUES ('96624845-00c3-4f79-9e8c-78bcfca76960', 'JDM Car Show', 'https://www.motortrend.com/uploads/2022/05/Rs-Day-gtr-line-up.jpg', '20.02.2024', 'Brazil', 'Where does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.')", (err, result) => {
        if (err) {
          console.error('Error inserting data', err);
        } else {
          console.log('Inserted successfully.');
        }
        dbClient.end();
      });
    }).catch((err) => {
      console.error('Error connecting to the EVPrime database ', err);
    });
    res.json({ message: "ok" });
  } catch (error) {
    next(error);
  }
});

// localhost:8080/events
router.get('/', async (req, res, next) => {
  try {
    const events = await getAll();
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

// localhost:8080/events/1
router.get('/:id', async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

// localhost:8080/events
// {
//    title: "Title",
//    description: "Description",
//    date: "07.12.2023",
//    image: "link"
//  }
//
router.post('/', async (req, res, next) => {
  const data = req.body;

  let errors = {};
  console.log(data);

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidText(data.location)) {
    errors.description = 'Invalid location.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the event failed due to validation errors.',
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: 'Event saved.', event: data });
  } catch (error) {
    next(error);
  }
});

// localhost:8080/events/1
// {
//    title: "Title",
//    description: "Description",
//    date: "07.12.2023",
//    image: "link"
//  }
//
router.put('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};
  console.log(data);

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidText(data.location)) {
    errors.description = 'Invalid location.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the event failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: 'Event updated.', event: data });
  } catch (error) {
    next(error);
  }
});

// localhost:8080/events/1
router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Event deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
