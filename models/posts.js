//---------------my sql-------------------------------
// const db = require("../utils/database");

// module.exports = class Post {
//   constructor(title, description, image_url) {
//     this.title = title;
//     this.description = description;
//     this.image_url = image_url;
//   }

//   setPost() {
//     return db.execute(
//       "INSERT INTO posts (title, description, image_url) VALUES (?, ?, ?)",
//       [this.title, this.description, this.image_url]
//     );
//   }

//   static getAllPost() {
//     return db.execute("SELECT * FROM posts");
//   }

//   static getSinglePost(id) {
//     //SELECT * FROM post WHERE posts.id = 1
//     return db.execute("SELECT * FROM posts WHERE posts.id = ?", [id]);
//   }
//};
//---------------------------- end of mysql--------------------------------

const Sequalize = require("sequelize");

const sequalize = require("../utils/database");
const { post } = require("../routes/post");

const Post = sequalize.define("post", {
  id: {
    type: Sequalize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequalize.TEXT,
    allowNull: false,
  },
  imgUrl: {
    type: Sequalize.STRING,
    allowNull: false,
  },
});

module.exports = Post;
