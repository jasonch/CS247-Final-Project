Ext.regModel('user', {
    fields: ['name', 'id', 'points', 'message']
});

CEL.UserStore = new Ext.data.Store({
    model: 'user',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'http://www.stanford.edu/~jasonch/cgi-bin/cel/ajax/getUser.php',
        method: 'POST',
        extraParams: {'user_id': '624420020'},
        actionMethods: {
          read: 'POST'
        },
        reader: {
          type: 'json',
        }
    }
});
