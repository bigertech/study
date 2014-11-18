/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-18
 * @description
 *
 */
Todos.EditTodoView = Ember.TextField.extend({
    didInsertElement: function () {
        this.$().focus();
    },

});

Ember.Handlebars.helper('edit-todo',Todos.EditTodoView);