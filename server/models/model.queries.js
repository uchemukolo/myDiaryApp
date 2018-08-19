/**
 * @name createUser
 * @description script to create a new user
 * @param username, email, hashedPassword
 * @returns the object queried
 */

export const createUser = (username, email, hashedPassword) => ({
  text: `INSERT INTO userDetails(username, email, password)
    VALUES($1, $2, $3) RETURNING *`,
  values: [username, email, hashedPassword]
});

/**
 * @description for finding one or more items in a database
 * @name findOne
 * @param username or email
 * @returns the object queried
 */

export const findOne = (username, email) => ({
  text: 'SELECT id, username, email, password FROM userDetails WHERE username = $1 OR email = $2',
  values: [username, email]
});

/**
 * @description script to add a new entry in a database
 * @name addEntry
 * @param title, mood, entry, userId
 * @returns the object queried
 */

export const addEntry = (title, mood, entry, userId) => ({
  text: 'INSERT INTO Entries(title, mood, entry, userId) VALUES ($1, $2, $3, $4) RETURNING *',
  values: [title, mood, entry, userId]
});

  /**
 * @description fetch all entries in a database by ID
 * @name fetchAll
 * @param userId
 * @returns the object queried
 */

export const fetchAll = userId => ({
  text: 'SELECT * FROM entries WHERE userId = $1',
  values: [userId],
});

  /**
 * @description fetch one entry in a database by ID
 * @name fetchOne
 * @param entryId
 * * @param userId
 * @returns the object queried
 */

export const fetchOne = (id, userId) => ({
  text: 'SELECT * FROM entries WHERE id = $1 AND userId = $2',
  values: [id, userId],
});

/**
 * @description delete one entry in the database by ID
 * @name removeEntry
 * @param userId
 * @returns the object queried
 */

export const removeEntry = (id, userId) => ({
  text: 'DELETE FROM entries WHERE id = $1 AND userId = $2 RETURNING*',
  values: [id, userId],
});

  /**
 * @description fetch one entry in a database by ID and validate the date
 * @name fetch
 * @param entryId
 * * @param userId
 * @returns the object queried
 */

export const fetch = (id, userId) => ({
  text: 'SELECT * FROM entries WHERE id = $1 AND userId = $2',
  values: [id, userId],
});

/**
 * @description update an entry in the database by ID
 * @name update
 * @param title, mood, entry, id, userId
 * @returns the object queried
 */

export const update = (title, mood, entry, id, userId) => ({
  text: 'UPDATE entries SET title = $1, mood = $2, entry = $3 WHERE id = $4 AND userId = $5 RETURNING *',
  values: [title, mood, entry, id, userId]
});

/**
 * @description fetch User Profile in the database by ID
 * @name userProfile
 * @param id
 * @returns the object queried
 */

export const userProfile = id => ({
  text: 'SELECT * FROM userDetails WHERE id = $1',
  values: [id],
});

/**
 * @description update User Profile in the database by ID
 * @name updateProfile
 * @param firstName, lastName
 * @returns the object queried
 */

export const updateProfile = (firstName, lastName, id) => ({
  text: 'UPDATE userDetails SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *',
  values: [firstName, lastName, id]
});
