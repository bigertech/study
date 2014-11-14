
// 创建 Ember 应用程序实例
App = Ember.Application.create({});

// 创建 post 对象数组
var posts = [{
  id: '1',
  title: "一件事要做好",
  author: { name: "池莉" },
  date: new Date('11-14-2014'),
  excerpt: "一件事要做好，岂能凭你心中有一点喜欢？有一点迷恋？三天浇点水，五天上点肥？ ",
  body: "少年狂妄，自以为聪明。把表面的一些由头借来，实际标榜自己为至情至性之人。这也做做，那也试试，好听人评价个多才多艺。近年来国家大兴经济，文人纷纷“下海”，我也曾与人发议论说作家的智商是足够经商的。最近由读《花经》而获顿悟：人的一生只能做一件事。政客们终身搞阴谋，商人们终身搞欺骗，情种终身搞爱情（比如贾宝玉），黄岳渊先生终身搞花草。一生的时间并不多，一生的精力也不多，要搞好一件事实在不容易。用去一生，搞好了一件事，那也就够可以了。世上不知多少聪明人，一生没有搞好一件事。 "
}, {
  id: '2',
  title: "千岁寒",
  author: { name: "王朔" },
  date: new Date('11-14-2014'),
  excerpt: "我在西樵山，看了五千五百次日出",
  body: "我在西樵山，看了五千五百次日出，无端难过了五千五百次，破晓醒来心坎处处哀伤，日暮山中归来浑然以忘，不知阳光有快车，长空有手势，白云在绘山，白云在绘路，白云在绘山川万物，顽石有忆，苍苔有想，游鱼无非前儿女，飞鸟尽是旧情人，春风吹开万年历，秋雨降下千秋寒，闪电暴露前朝事，雷鸣都是旧消息，远星参商古渡口，新酒从来不新鲜，地平线上生面孔，地球一轮新组合，浑天疯转终不转，沧海狂蒸到底干，从流窜到淌，到翠微，三十六亿五千万次日落走一趟，不是什么都没见过，而是什么都见过，什么都失去了――明白了，但是一扭脸，忘了。蓝天有指示，蓝天画得很清楚，但是一低头，只顾哭，哭得肝疼，哭谁，不曾记得。"
}];

// 定义路由
// 查找 PostsRoute PostRoute PostController 和 about 模板
App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

// 当 link to posts 时，返回 posts 对象
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

// 当 link to post.id 返回相应的 post.id 对象
App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

// 当 post 模板下的 action 执行时的相应操作
App.PostController = Ember.ObjectController.extend({
  isEditing: true,

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    doneEditing: function() {
      this.set('isEditing', false);
    }
  }
});

// 创建 showdown 对象
var showdown = new Showdown.converter();

// 创建 format-markdown 助手，将输入的 Markdown 内容转换成 html
Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

// 创建 format-date 助手，将时间格式化为距离发布时间多久
Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});
