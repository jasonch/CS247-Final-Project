Ext.regModel('Friends', {
    idProperty: 'id',
    fields: [
      'id',
      'name',
      'points',
      'message'
    ]
});

CEL.stores.Friends = new Ext.data.Store({
    model: 'Friends'
});

CEL.views.FriendList = Ext.extend(Ext.List, {
  initComponent: function () {
    this.store = CEL.stores.Friends,
    this.itemTpl = new Ext.XTemplate ([
            '<tpl for=".">',
              '<div class="friend-item" id="friend-id-{id}">',
                '<div class="friend-pic"><img src="http://graph.facebook.com/{id}/picture" /></div>',
                '<span class="friend-name">{name}</span>',
              '</div>',
           '</tpl>'
          ], {compiled: true});
    //CEL.views.FriendList.superclass.initComponent.call (this);
  },
  onListItemTap: function (dv, index, item, e) {
    console.log (dv, index, item, e);
  }
});

