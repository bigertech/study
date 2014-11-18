/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-14
 * @description
 *
 */
App = Ember.Application.create();

App.Router.map(function () {
    this.resource('about');
    this.resource('posts', function () {
        this.resource('post',{path: ':post_id'});
    });
});

App.PostsRoute = Ember.Route.extend({
    model: function (){
        return posts;
    }
});
App.PostRoute = Ember.Route.extend({
    model: function (params){
        return posts.findBy('id',params.post_id);
    }
});

App.PostController = Ember.ObjectController.extend({
    idEditing: false,

    actions: {
        edit: function () {
            this.set('isEditing',true);
        },

        doneEditing: function (){
            this.set('isEditing',false);
        }
    }
});

Ember.Handlebars.helper('format-date', function (date) {
    return moment(date).fromNow();
});

Ember.Handlebars.helper('date-local', function (date) {
    return moment(date).format('YYYY-MM-DD');
});
var showdown = new Showdown.converter();
Ember.Handlebars.helper('format-markdown', function (input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
});

var posts = [
    {
        id: '1',
        title: 'Rails is Omakse',
        author: {name: 'liuxing'},
        date: new Date('2014-11-11'),
        body: '相反，Web应用是通过能收藏和分享链接来凸显它的作用的。URL是Web应用的一个最核心的特性，正是URL使得Web应用有了卓越的可共享性和可协作性。现今，很多Javascript框架都是时候才考虑URL，没有考虑这个让Web成功的主要因素。'
    },
    {
        id: '2',
        title: 'Ak 476',
        author: {name: 'ak'},
        date: new Date('2014-10-12'),
        body: '表达式, 例如 {{firstName}} , 它从模板对应的模型获取信息并将信息添加到HTML中。'
    }
];