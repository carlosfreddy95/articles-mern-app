"use strcit";

let Article = require("../models/article");

//Creamos un objeto para disponer de todos los métodos de ruta que vamos a definir
let controller = {
  //Guardar artículo
  save: (req, res) => {
    let params = req.body;

    let article = new Article();

    //asignar valores
    article.title = params.title;
    article.content = params.content;
    article.author = params.author;

    //guardamos
    article.save((err, articleStored) => {
      if (err || !articleStored) {
        return res.status(404).send({
          status: "error",
          message: "El artículo no se ha guardado",
        });
      }

      return res.status(200).send({
        status: "success",
        articleStored,
      });
    });
  },

  //listar los artículos
  getArticles: (req, res) => {
    let query = Article.find({});

    query.sort("-date").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al extraer los datos",
        });
      }

      if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "No hay artículos para mostrar",
        });
      }

      return res.status(200).send({
        status: "success",
        articles,
      });
    });
  },

  //eliminar artículos
  delete: (req, res) => {
    //Recoger ID a través de la URL
    let articleId = req.params.id;

    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al eliminar el artículo",
        });
      }

      if (!articleRemoved) {
        return res.status(404).send({
          status: "err",
          message: "No se ha encontrado el artículo a eliminar",
        });
      }

      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    });
  },
};

module.exports = controller;
