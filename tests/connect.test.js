/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Pizza = require('../models/Pizza');

describe('Pizza model Test', () => {
  beforeAll(async () => {
    mongoose.connect('mongodb+srv://maddyqq:9iL27CuCoXnBhT41@cluster0.wklc7.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Pizza.deleteMany({});
  });

  it('create and save product successfully', async () => {
    const validPizza = await new Pizza({ name: 'peperoni', price: 15 });
    const savedPizza = await validPizza.save();

    expect(savedPizza._id).toBeDefined();
    expect(savedPizza.name).toBe(validPizza.name);
  });
});
