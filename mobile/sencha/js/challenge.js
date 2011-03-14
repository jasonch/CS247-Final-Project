Ext.regModel('Goal', {
    fields: [
    ,'goal_id'
    ,'participants'
    ,'num_days'
    ,'goal']
});

CEL.stores.CelStore = new Ext.data.Store({
    model: 'Goal',
    sorters: ['num_days'],
});
