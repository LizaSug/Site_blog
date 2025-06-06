import postModel  from '../models/post.js'

export const getLastTags = async (req, res) => {
 try {
   const posts = await postModel.find().limit(5).exec();
    const tags = posts
      .map(obj => obj.tags)
      .flat()
      .slice(0, 5)

   res.json(tags);
 } catch (err) {
   console.log(err);
   res.status(500).json({
     message: "Не удалось получить тэги",
   });
 }
}

export const create = async (req, res) => {
  try {
    const doc = new postModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      user: req.userId,
    });

    const post = await doc.save()
    
    res.json(post)
  } catch(err) {
      console.log(err)
      res.status(500).json({
        message: 'Не удалось создать статью'
      })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await postModel.find().populate('user').exec();
    res.json(posts)
  } catch(err) {
      console.log(err)
      res.status(500).json({
        message: 'Не удалось получить статьи'
      })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    postModel.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: "after",
        }
      )
      .populate("user").then((doc) => res.json(doc))
  } catch (err) {
    console.log(err);
    res.send
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id

    postModel.findOneAndDelete(
        {
          _id: postId,
        }).then((doc) => {
        res.json(doc);
      })
  } catch (err ) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    
    await postModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        user: req.userId,
      }
    );
      res.json({
        success: true
      })
  } catch (err) {
    console.log(err);
    res.send;
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
}