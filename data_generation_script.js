
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');

const numRecords = 1000;

// Helper function to generate ObjectId
const generateObjectId = () => new mongoose.Types.ObjectId();

// Helper function to generate hashed password
const generatePassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const generateUsers = async () => {
  const users = [];
  for (let i = 0; i < numRecords; i++) {
    const password = await generatePassword("123456");
    users.push({
      _id: { "$oid": generateObjectId().toString() },
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: password,
      profile: faker.image.url(),
      createdAt: { "$date": { "$numberLong": new Date().getTime().toString() } }
    });
  }
  return users;
};

const generatePosts = (users) => {
  const posts = [];
  for (let i = 0; i < numRecords; i++) {
    posts.push({
      _id: { "$oid": generateObjectId().toString() },
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      postedBy: { "$oid": users[Math.floor(Math.random() * users.length)]._id.$oid },
      image: faker.image.url()
    });
  }
  return posts;
};

const generateComments = (users, posts, existingComments) => {
  const comments = [];
  for (let i = 0; i < numRecords; i++) {
    const parentComment = Math.random() > 0.5 && existingComments.length > 0
      ? { "$oid": existingComments[Math.floor(Math.random() * existingComments.length)]._id.$oid }
      : null;
    const newComment = {
      _id: { "$oid": generateObjectId().toString() },
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      commentedPost: { "$oid": posts[Math.floor(Math.random() * posts.length)]._id.$oid },
      commentedBy: { "$oid": users[Math.floor(Math.random() * users.length)]._id.$oid },
      parentComment: parentComment
    };
    comments.push(newComment);
    existingComments.push(newComment); // Keep track of comments for potential parent comments
  }
  return comments;
};

const generateLikes = (users, posts) => {
  const likes = [];
  for (let i = 0; i < numRecords; i++) {
    likes.push({
      _id: { "$oid": generateObjectId().toString() },
      commentedPost: { "$oid": posts[Math.floor(Math.random() * posts.length)]._id.$oid },
      commentedBy: { "$oid": users[Math.floor(Math.random() * users.length)]._id.$oid }
    });
  }
  return likes;
};

const generateData = async () => {
  const users = await generateUsers();
  const posts = generatePosts(users);
  const existingComments = [];
  const comments = generateComments(users, posts, existingComments);
  const likes = generateLikes(users, posts);

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
  fs.writeFileSync('likes.json', JSON.stringify(likes, null, 2));

  console.log('Data generation completed.');
};

generateData();
