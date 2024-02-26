const express = require('express');

const {getAll, get, add, replace, remove} = require('../data/event');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');
const {checkAuth} = require('../util/auth');
const {dbClient} = require('../data/dbclient');
const {v4: generateId} = require('uuid');

const router = express.Router();

// localhost:8080/events
router.get('/', (req, res, next) => {
  try {
    dbClient.query('SELECT * FROM "Events"', (err, result) => {
      if (err) {
        console.error('Could not fetch events', err);
      } else {
        console.log('Successfully fetched events.', result.rows);
      }
      res.json({events: result.rows});
    });
  } catch (error) {
    next(error);
  }
});

// localhost:8080/events/1
router.get('/:id', async (req, res, next) => {
  try {
    dbClient.query(`SELECT *
                    FROM \"Events\"
                    WHERE id = '${req.params.id}'`, (err, result) => {
      if (err) {
        console.error('Could not fetch an event', err);
      } else {
        console.log('Successfully fetched an event.', result.rows);
      }
      res.json({events: result.rows});
    });
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
    const id = generateId();
    const insert = `INSERT INTO \"Events\"(id, title, image, date, location, description)
                    VALUES ('${id}', '${data.title}', '${data.image}', '${data.date}', '${data.location}',
                            '${data.description}')`;

    dbClient.query(insert, (err, result) => {
      if (err) {
        console.error('Could not fetch an event', err);
      } else {
        console.log('Successfully fetched an event.', result.rows);
      }
      res.status(201).json({message: `Successfully created an event with id: ${id}`});
    });
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
    const update = `UPDATE \"Events\"
                    SET title='${data.title}',
                        image='${data.image}',
                        date='${data.date}',
                        location='${data.location}',
                        description='${data.description}'
                    WHERE id = '${req.params.id}'`;

    dbClient.query(update, (err, result) => {
      if (err) {
        console.error('Could not update the event', err);
      } else {
        console.log('Successfully updated the event.', result);
      }
      res.status(201).json({message: `Successfully updated the event with id: ${req.params.id}`});
    });
  } catch (error) {
    next(error);
  }
});

// localhost:8080/events/1
router.delete('/:id', async (req, res, next) => {
  try {
    const deleteSql = `DELETE
                    FROM \"Events\"
                    WHERE id = '${req.params.id}'`;

    dbClient.query(deleteSql, (err) => {
      if (err) {
        console.error('Could not delete the event', err);
      } else {
        console.log('Successfully deleted the event.');
      }
      res.json({message: `Successfully deleted the event with id: ${req.params.id}`});
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
