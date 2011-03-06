Ext.regModel('Friend', {
    fields: ['name', 'id']
});

CEL.FriendStore = new Ext.data.Store({
    model: 'Friend',
    autoLoad: true,
    sortField: 'name',
    sorters: 'name',
    getGroupString : function(record) {
        return record.get('name')[0];
    },
    proxy: {
        type: 'ajax',
        url: 'http://www.stanford.edu/~jasonch/cgi-bin/cel/ajax/friends.json',
        reader: {
          type: 'json',
          root: 'data',
        }
    }
});

