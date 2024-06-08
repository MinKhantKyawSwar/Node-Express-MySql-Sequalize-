// const posts = [];

const Post = require("../models/post");
exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;

  req.user
    .createPost({
      title,
      description,
      imgUrl: photo,
    })
    .then((result) => {
      console.log(result);
      console.log("New Post Created");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

//----------my sql-----------------------
// exports.createPost = (req, res) => {
//   console.log(req.body);
//   const { title, description, photo } = req.body;
//   const post = new Post(title, description, photo);
//   // console.log(
//   //   `Title value is ${title} and description value is ${description}`
//   // );
//   // posts.push({
//   //   id: Math.random(),
//   //   title,
//   //   description,
//   //   photo,
//   // });
//   post
//     .setPost()
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log(err));
//   // console.log(posts);
// };

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addpost.html"));
  res.render("addPost", {
    title: "Create Post",
  });
};

exports.getPosts = (req, res) => {
  Post.findAll({ order: [["createdAt", "desc"]] })
    .then((posts) => {
      res.render("home", { title: "Home Page", postsArr: posts });
    })
    .catch((err) => {
      console.log(err);
    });
};

// //sql database
// exports.getPosts = (req, res) => {
//   // console.log(posts);
//   // res.sendFile(path.join(__dirname, "..", "views", "homepage.html"));
//   Post.getAllPost()
//     .then(([rows]) => {
//       console.log(rows);
//       res.render("home", { title: "Hello World", postsArr: rows });
//     })
//     .catch((err) => console.log(err));
// };
exports.getPost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      res.render("details", { title: "Post Detail Page", post });
    })
    .catch((error) => {
      console.log(error);
    });
};

// exports.getPost = (req, res) => {
//   const postId = req.params.postId;
//   Post.findOne({ where: { id: postId } })
//     .then((post) => {
//       res.render("details", { title: "Post Detail Page", post });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// //sql database
// exports.getPost = (req, res) => {
//   const postId = req.params.postId;
//   console.log(postId);
//   // const post = posts.find((post) => post.id == postId);
//   // console.log(post);
//   Post.getSinglePost(postId)
//     .then(([row]) => {
//       console.log(row);
//       res.render("details", { title: "Post Detail Page", post: row[0] });
//     })
//     .catch((err) => console.log(err));
// };

exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        res.redirect("/");
      }
      return post.destroy();
    })
    .then((result) => {
      console.log("Post deleted");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOldPost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      res.render("editPost", { title: `${post.title}`, post });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.updatePost = (req, res) => {
  const { title, description, photo, postId } = req.body;
  Post.findByPk(postId)
    .then((post) => {
      (post.title = title),
        (post.description = description),
        (post.imgUrl = photo);
      return post.save();
    })
    .then((result) => {
      console.log(`post id => ${postId} is updated successfully`);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
