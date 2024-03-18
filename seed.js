const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    const user1 = await User.create({ username: 'user1', email: 'user1@example.com' });
    const user2 = await User.create({ username: 'user2', email: 'user2@example.com' });

    const thought1 = await Thought.create({ thoughtText: 'Thought 1', username: 'user1' });
    const thought2 = await Thought.create({ thoughtText: 'Thought 2', username: 'user2' });

    const reaction1 = await Reaction.create({ reactionBody: 'Reaction 1', username: 'user1' });
    const reaction2 = await Reaction.create({ reactionBody: 'Reaction 2', username: 'user2' });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();
