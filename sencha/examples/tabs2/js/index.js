Ext.ns ('CEL', 'CEL.views', 'CEL.stores');


Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: true,
    onReady: function() {

        var refresh = function () {
          fbRequireLogin (function () {
            load_myinfo ();
            load_friends ();
            load_mycel();
          });
        };

    var friendlist = new CEL.views.FriendList ();

      TAB_MYINFO = new Ext.Component({
        title: 'My Info',
        cls: 'card1',
        iconCls :'info',
        scroll: 'vertical',
        tpl: [
          '<tpl for=".">',
            '<div class="user-pic"><img src="http://graph.facebook.com/{user_id}/picture" /></div>',
            '<div class="user-name">{name}</div>',
            '<div class="user-status">{message}</div>',
            '<div class="user-points">Points: {points}</div>',
          '</tpl>'
        ]
      });
      TAB_FRIENDS = new Ext.Component({
        title: 'Friends',
        cls: 'card3',
        iconCls :'user',
        scroll: 'vertical',
        tpl: new Ext.XTemplate ([
            '<tpl for=".">',
              '<div class="friend-item" id="friend-id-{id}">',
                '<div class="friend-pic"><img src="http://graph.facebook.com/{id}/picture" /></div>',
                '<span class="friend-name">{name}</span>',
              '</div>',
           '</tpl>'
          ], {compiled: true})

      });

      TAB_MYCEL = new Ext.Component({
        title: 'My CEL',
        cls: 'card2',
        iconCls :'favorites',
        scroll: 'vertical',
        id: "MyCel",
        badgeText: 4,
        tpl: new Ext.XTemplate([
          '<tpl for="sent">', 
            '<div id="challenge-id-{challenge_id}" class="challenge sent">',
              '<div class="challenge-text">{challenge}</div>',
              '<div class="stake">Stake: {stake}</div>',
              '<div class="time-left">{num_days} Days Left</div>',
              '<div class="from-user">From: {from_user}</div>',
            '</div>',
          '</tpl>',
          '<tpl for="received">',
            '<div id="challenge-id-{challenge_id}" class="challenge received">',
              '<div class="challenge-text">{challenge}</div>',
              '<div class="stake">Stake: {stake}</div>',
              '<div class="time-left">{num_days} Days Left</div>',
              '<div class="from-user">To: {to_user}</div>',
            '</div>',
          '</tpl>'
        ])
      });
        TABPANEL = new Ext.TabPanel({
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            fullscreen: true,
            ui: 'light',
            cardSwitchAnimation: {
                type: 'slide',
                cover: true
            },
            
            defaults: {
                scroll: 'vertical'
            },
            items: [TAB_MYINFO, TAB_MYCEL, TAB_FRIENDS]
        });
      setTimeout (refresh, 1000);
    }
});
