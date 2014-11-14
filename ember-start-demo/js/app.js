/**
 * Created by hong on 14-11-14.
 */



App = Ember.Application.create();

App.Router.map(function() {

  this.resource('about');
  this.resource('posts', function () {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function () {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function (params) {
    return posts.findBy('id', params.post_id);
  }

});

Ember.Handlebars.helper('format-date', function (date) {
  return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function (input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    edit: function () {
      this.set('isEditing', true);
    },

    doneEditing: function () {
      this.set('isEditing', false);
    }
  }
});


var posts = [
  {
    "id": "1",
    "title": "冷知识：o'clock 缩写了什么？",
    "author": {
      "name": "hong"
    },
    "date": new Date('11-14 2014'),
    "excerpt": "缩写了什么",
    "body": "o'clock 表示点钟，**这个小学英语课堂**上就学过的词，想必大家再熟悉不过了吧。\n但是，问题来了：o 和 clock 之间用了一个缩写符号 '，那么它究竟省略掉了哪些东西？"
  },
  {
    "id": "2",
    "title": "知乎万赞答案汇总以及排名",
    "author": {
      "name": "hong"
    },
    "date": new Date('11-14 2014'),
    "excerpt": "知乎排名",
    "body": "汇总完之后，发现平日里我们所敬仰的大V们在top99的答案里只占了极少的一部分，大部分高赞答案由小V以及名不见经传的用户创造，普通人也有普通人的闪光，是以共勉。"
  }
];