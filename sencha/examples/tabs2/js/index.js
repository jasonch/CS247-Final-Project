function refresh () {
  load_myinfo ();
  load_mycel ();
  load_friends ();
}


Ext.ns ('CEL', 'CEL.views', 'CEL.stores');
CEL =  new Ext.Application({
  name: "CEL",
  icon: 'icon.png',
  tabletStartupScreen: 'tablet_startup.png',
  phoneStartupScreen: 'phone_startup.png',
  glossOnIcon: true,

  launch: function() {


     CEL.MyInfo = new Ext.Component({
        title: 'My Info',
        cls: 'card1',
        iconCls :'info',
        scroll: 'vertical',
        tpl: [
          '<tpl for=".">',
            '<div class="user-pic"><img src="http://graph.facebook.com/{user_id}/picture?type=normal" /></div>',
            '<div class="user-name">{name}</div>',
            '<div class="user-status"><input type="text" id="user-status-box" value="{message}"/></div>',
            '<div class="user-points">Points: {points}</div>',
          '</tpl>'
        ]
      });
      CEL.Friends_detailPanel = new Ext.Panel ({
            id: 'detailpanel',
            tpl: '<div class="user-name">{name}</div><div class="user-message">{message}</div><div class="user-points">Points: {points}</div>',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [{
                        text: 'back',
                        ui: 'back',
                        handler: function() {
                            CEL.Friends.setActiveItem('disclosurelist', {type:'slide', direction:'right'});
                        }
                    }]
                }
            ]
        });



      CEL.Friends_listPanel = new Ext.List({
            id: 'disclosurelist',
            store: CEL.stores.FriendStore,
            itemTpl: '<div class="friend-item"><img class="friend-pic" src="http://graph.facebook.com/{id}/picture"/><div class="friend-name">{name}</div></div>',
            grouped: true,
            indexBar: true,
            onItemDisclosure: function(record, btn, index) {
                CEL.Friends_detailPanel.update(record.data);
                CEL.Friends.setActiveItem('detailpanel');
            }
        });


       CEL.Friends = new Ext.Panel ({
            title: 'Friends',
            iconCls: 'user',
            cls: 'card3',
            layout: 'card',
            cardSwitchAnimation: 'slide',
            items: [CEL.Friends_listPanel, CEL.Friends_detailPanel]
        });

        

      CEL.MyCEL = new Ext.Component({
        title: 'My CEL',
        cls: 'card2',
        iconCls :'favorites',
        scroll: 'vertical',
        id: "MyCel",
        tpl: new Ext.XTemplate([
          '<tpl for="received">',
            '<div id="challenge-id-{challenge_id}" class="challenge received">',
              'You have <div class="time-left">{num_days} Days Left</div> to win ',
              '<div class="stake">${stake}</div><br/>',
              'Stop <div class="challenge-text">{challenge}</div><br/>',
              'From: <div class="from-user">{from_user}</div>',
            '</div>',
          '</tpl>',
          '<tpl for="sent">', 
            '<div id="challenge-id-{challenge_id}" class="challenge sent">',
              '<div class="to-user">{to_user}</div> has ',
              '<div class="time-left">{num_days} Days Left</div> to stop ',
              '<div class="challenge-text">{challenge}</div>',
              '<div class="stake">Stake: {stake}</div>',
            '</div>',
          '</tpl>'
        ])
      });





    if (FB.getSession()) {

        TABPANEL = new Ext.TabPanel({
            tabBar: {
                dock: 'top',
                layout: {
                    pack: 'center'
                }
            },
            fullscreen: true,
            cardSwitchAnimation: {
                type: 'slide',
                cover: true
            },
            
            defaults: {
                scroll: 'vertical'
            },
            items: [CEL.MyInfo, CEL.MyCEL, CEL.Friends]
        });
        refresh ();
    } else {

      var FB_BUTTON = new Ext.Component ({
        title: 'Facebook',
        xtype: 'box',
        el: 'fb-login-button',
      });

        TABPANEL = new Ext.TabPanel({
            tabBar: {
                dock: 'top',
                layout: {
                    pack: 'center'
                }
            },
            fullscreen: true,
            cardSwitchAnimation: {
                type: 'slide',
                cover: true
            },
            
            defaults: {
                scroll: 'vertical'
            },
            items: [FB_BUTTON]  
        });

      }
    } // end launch 
});