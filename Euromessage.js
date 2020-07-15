
import { create_api } from '@relateddigital/visilabs-react-native';
import Constants from 'expo-constants';

export const Euromessage = () => {
    var organizationID = "53444A2B4B5071322F50303D";
    var siteID = "3177556267326330556A383D";
    var segmentURL = "http://lgr.visilabs.net";
    var dataSource = "supporttest";
    var realTimeURL = "http://rt.visilabs.net";
    var channel = Constants.platform.android === undefined ? "IOS" : "Android";
    var euroMsgApplicationKey = "ExpoStore";
    var euroMsgSubscriptionURL = "https://pushs.euromsg.com/subscription";
    var euroMsgRetentionURL = "https://pushr.euromsg.com/retention";
    var locale = "tr-TR";
    var api = create_api(organizationID, siteID, segmentURL, dataSource,
        realTimeURL, channel, euroMsgApplicationKey, euroMsgSubscriptionURL, euroMsgRetentionURL, locale);

    return api;
}
