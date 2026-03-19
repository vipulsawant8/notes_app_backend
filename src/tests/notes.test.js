import request from "supertest";
import app from "../app.js";

import { connectTestDB, closeTestDB } from "./setup.js";

import User from "../models/user.model.js";
import Note from "../models/notes.model.js";

let agent;
let userData;
let deviceId = "da429af5-9bb7-4d18-9265-6d9442ac6cc8";

beforeAll(async () => {

  await connectTestDB();

  agent = request.agent(app);

  userData = {
    email: "notes@test.com",
    name: "Test User",
    password: "Password123!"
  };

  const user = new User({
    ...userData,
    isVerified: true
  });

  await user.save();

  const loginRes = await agent
    .post("/api/v1/auth/login")
    .send({
      identity: userData.email,
      password: userData.password,
      deviceId
    });

  if (loginRes.statusCode !== 200) {
    throw new Error("Login failed during notes test setup");
  }

});

afterAll(async () => {
  await closeTestDB();
});

afterEach(async () => {
  await Note.deleteMany();
});

describe("Notes API", () => {

  test("should fetch notes", async () => {

    const user = await User.findOne({ email: userData.email });

    await Note.create([
      { title: "Note A", content: "Content A", authorID: user._id },
      { title: "Note B", content: "Content B", authorID: user._id }
    ]);

    const res = await agent.get("/api/v1/notes?page=1");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.docs.length).toBe(2);

  });


  test("should create note", async () => {

    const res = await agent
      .post("/api/v1/notes")
      .send({
        title: "New Note",
        content: "Test content"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe("New Note");

  });


  test("should update note", async () => {

    const user = await User.findOne({ email: userData.email });

    const note = await Note.create({
      title: "Old Note",
      content: "Old",
      authorID: user._id
    });

    const res = await agent
      .patch(`/api/v1/notes/${note._id}`)
      .send({
        title: "Updated Note",
        content: "Updated content"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Updated Note");

  });


  test("should delete note", async () => {

    const user = await User.findOne({ email: userData.email });

    const note = await Note.create({
      title: "Delete Note",
      content: "Delete me",
      authorID: user._id
    });

    const res = await agent.delete(`/api/v1/notes/${note._id}`);

    expect(res.statusCode).toBe(200);

    const deleted = await Note.findById(note._id);
    expect(deleted).toBeNull();

  });


  test("should pin note", async () => {

    const user = await User.findOne({ email: userData.email });

    const note = await Note.create({
      title: "Pin Note",
      content: "Test",
      authorID: user._id
    });

    const res = await agent
      .patch(`/api/v1/notes/${note._id}/update-pin`)
      .send({ status: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.pinned).toBe(true);

  });

});