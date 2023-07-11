var QBconfig = {
    credentials: window.location.hostname == 'app.wellnesswits.com' ?
        {
            appId: '97781',
            authKey: 'sGCnY8k63wfc8LH',
            authSecret: '7Ay2MdmLGenn6pa',
            accountKey: 'j5J56PP1Cxw9xPgtts_4'
        } : {
            appId: '97620',
            authKey: 'avkL273XXMZA6Md',
            authSecret: 'sAf2-u8RNLXLypB',
            accountKey: 'z5ijBBbz-AHxKCcqTo6g'
        },
    // credentials: {
    //     appId: '97620',
    //     authKey: 'avkL273XXMZA6Md',
    //     authSecret: 'sAf2-u8RNLXLypB',
    //     accountKey: 'z5ijBBbz-AHxKCcqTo6g'
    // },
    appConfig: {
        chatProtocol: {
            active: 2
        },
        endpoints: {
            api: 'api.quickblox.com',
            chat: 'chat.quickblox.com'
        },
        streamManagement: {
            enable: true
        },
        debug: {
            mode: 1,
            file: null
        }
    }
};

var appConfig = {
    dilogsPerRequers: 15,
    messagesPerRequest: 50,
    usersPerRequest: 15,
    typingTimeout: 3 // 3 seconds
};

var CONSTANTS = {
    DIALOG_TYPES: {
        CHAT: 3,
        GROUPCHAT: 2,
        PUBLICCHAT: 1
    },
    ATTACHMENT: {
        TYPE: 'image',
        BODY: '[attachment]',
        MAXSIZE: 100000000, // set 100 megabytes,
        MAXSIZEMESSAGE: 'The uploaded file exceeds maximum file size (100MB).'
    },
    NOTIFICATION_TYPES: {
        NEW_DIALOG: '1',
        UPDATE_DIALOG: '2',
        LEAVE_DIALOG: '3'
    }
};
