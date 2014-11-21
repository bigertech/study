
window.Todos = Ember.Application.create();

// 适配器主要负责与应用的一个数据源进行通信。
// 通常可能会是一个Web服务器接口，但是在此使用了一个加载夹具数据的适配器：

Todos.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'todos-emberjs'
});