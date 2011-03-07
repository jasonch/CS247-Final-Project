Ext.regModel('Friend', {
    fields: ['name', 'id', 'points', 'message']
});

CEL.stores.FriendStore = new Ext.data.Store({
    model: 'Friend',
    sortField: 'name',
    sorters: 'name',
    getGroupString : function(record) {
        return record.get('name')[0];
    }
});

