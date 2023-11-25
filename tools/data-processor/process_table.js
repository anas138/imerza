import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

import { createRequire } from "module";

const require = createRequire(import.meta.url);

// const residence = require("../../data/residence.json");

await mongoose.connect("mongodb://localhost:27017/imerza");

// const Unit = new Schema({
//     "type": String,
//     "unit": String,
//     "lot": String,
//     "floor": String,
//     "line": String,
//     "building": String,
//     "bedrooms": Number,
//     "bathrooms": Number,
//     "den": Number,
//     "sqft_interior": Number,
//     "sqft_exterior": Number,
//     "price": Number,
//     "sales_status": String,
//     "ue4_map": String,
//     "floorplan_image": String,
//     "permission": Number,
//     "stories": String,
//     "view_image": String,
//     "view_name": String,
//     "sales_status_lt": String,
//     "delivery_type": String,
//     "purchase_price": Number,
// });
//
// const Residence = mongoose.model('Residence', new Schema({
//     "project": Number,
//     "residences": [Unit]
// }));
//
// const residences = residence.rows.reduce((residences, {project, ...data}) => {
//     return {...residences, [project]: [...(residences[project] || []), data]}
// }, {});

// import argon2 from 'argon2';
//
// const members = require('../../data/member.json');
//

const Member = mongoose.model(
  "User",
  new Schema({
    username: String,
    password: String,
    email: String,
  })
);
//
// for (const member of members.rows) {
//   await new Member({
//     username: member.username,
//     password: await argon2.hash(member.password),
//     email: member.email,
//   }).save();
// }

// for (const [project, units] of Object.entries(residences)) {
//     await new Residence({
//         project,
//         residences: units,
//     }).save();
// }

const projects = require("../../data/project.json").rows;
const project_members = require("../../data/project_member.json").rows;
const members = require("../../data/member.json").rows;

const Project = mongoose.model(
  "Project",
  new Schema({
    name: String,
    logo: String,
    projectRoot: String,
    screenshots: String,
    settings: {},
    users: [{
      _id: ObjectId,
      scopes: [String]
    }]
  })
);

const getMembersForProject = async (id) => {
  const m = project_members
    .filter(({ project }) => project === id)
    .map(({ member }) => members.find(({ id }) => member == id));

  const ret = [];

  for (let member of m) {
    ret.push(await Member.findOne({ username: member.username }));
  }

  return ret;
};

for (const project of projects) {
  const newProject = new Project({
    name: project.name,
    logo: project.logo_url,
    projectRoot: project.project_root,
    screenshots: project.screenshots,
    settings: {},
    users: (await getMembersForProject(project.id)).map(({ _id }) => ({
      _id,
      scopes: ["collateral:read", "collateral:write"],
    })),
  });
  await newProject.save();
  // console.log(project.name);
}

await mongoose.disconnect();
