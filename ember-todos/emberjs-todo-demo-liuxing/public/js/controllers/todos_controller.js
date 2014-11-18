/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-17
 * @description
 *
 */
Todos.TodosController = Ember.ArrayController.extend({
    actions:{
        createTodo: function () {
            var title = this.get('newTitle');
            if (!title.trim()) {
              return;
            }

            //Create  the new Todo model
            var todo = this.get('store').createRecord('todo',{
                title: title,
                isCompleted: false
            });

            //Clear the new Todo text field
            this.set('newTitle', '');

            todo.save();
        },

        clearCompleted: function () {
            var completed = this.filterBy('isCompleted', true);
            completed.invoke('deleteRecord');

            completed.invoke('save');
        }
    },
    remaining: function () {
        return this.filterBy('isCompleted',false).get('length');
    }.property('@each.isCompleted'),

    inflection: function () {
        var length = this.get('remaining');
        return length === 1 ? 'item' : 'items';
    }.property('remaining'),

    completed: function (){
       return this.filterBy('isCompleted',true).get('length');
    }.property('@each.isCompleted'),

    hasCompleted: function () {
        return this.get('completed') > 0;
    }.property('completed'),

    allAreDone: function (key, value) {
        if (typeof value === 'undefined') {
            return !!this.get('length') && this.everyProperty('isCompleted',true);
        } else {
            this.setEach('isCompleted',value);
            this.invoke('save');
            return true;
        }
    }.property('@each.isCompleted')
});
  