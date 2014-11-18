/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-17
 * @description
 *
 */

Todos.Router.map(function () {
    this.resource('todos', { path: '/'}, function () {
        this.route('active');
        this.route('complete');
    });
});

Todos.TodosRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('todo');
    }
});

Todos.TodosIndexRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('todos');
    }
});

Todos.TodosActiveRoute = Ember.Route.extend({
    model: function () {
        return this.store.filter('todo', function (todo) {
            return !todo.get('isCompleted');
        });
    },
    renderTemplate: function (controller) {
        this.render('todos/index',{controller: controller});
    }
});
Todos.TodosCompleteRoute = Ember.Route.extend({
    model: function () {
        return this.store.filter('todo', function (todo) {
            return todo.get('isCompleted');
        });
    },
    renderTemplate: function (controller) {
        this.render('todos/index',{controller: controller});
    }
});
