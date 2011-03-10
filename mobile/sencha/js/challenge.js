Ext.regModel('Challenge', {
    fields: [
      'type'
    ,'challenge_id'
    ,'from_user'
    , 'to_user',
    ,'stake'
    ,'days_left'
    ,'challenge']
});

CEL.stores.CelStore = new Ext.data.Store({
    model: 'Challenge',
    sortField: 'type',
    sorters: ['type', 'name'],
    getGroupString : function(record) {
        return record.get('name')[0];
    }
});

