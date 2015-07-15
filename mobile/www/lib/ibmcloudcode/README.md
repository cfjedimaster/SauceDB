Mobile Cloud Services JavaScript SDK for cloud code
===

This package contains the required native components to interact with the IBM Mobile Cloud Services for Bluemix.  You can use the JavaScript SDK to build Web or Hybrid applications. You can also use this SDK in server-side [Node.js](http://nodejs.org)
JavaScript modules. The SDK manages all the communication and security integration between
the client and the Mobile Cloud Services in Bluemix.

When you use Bluemix to create a Mobile Cloud application, BlueMix provisions multiple services under a single application context. Your mobile application is given access to the following mobile services: Mobile Application Security, Push, and Mobile Data.


Version: v1.0.0-20150409-1328

##Install the SDK
You can install the SDK: 
* By installing the individual components with Bower or NPM. Use these tools to shorten the startup time for new projects and lessen the burden of managing library version requirements and dependencies.  If you
are using one of the [Mobile Cloud samples](https://hub.jazz.net/user/mobilecloud),
instructions for using the package manager is included with the documentation.
* By downloading a [zip file](https://mbaas-catalog.ng.bluemix.net/sdk/ibm-bluemix-sdk-javascript.zip).

### Get the SDK with Node.js (npm)

NPM is included in current Node.js distributions.  To install Node.js, go to [Download Node.js](http://nodejs.org/download/).  

Run the following command to install the `ibmcloudcode` package:

```bash
npm install ibmcloudcode
```

### Get the SDK for Web or Hybrid (Bower)

To install Bower, go to [Download Bower](http://bower.io/).  

Run the following command to install the `ibmcloudcode` package:

```
bower install https://hub.jazz.net/git/bluemixmobilesdk/ibmcloudcode-javascript/.git
```

###Download zip file

To download a zip of the entire SDK, see [Building Mobile Cloud applications](https://www.ng.bluemix.net/docs/#starters/mobile/index.html#index).

###Contents

The complete SDK consists of a core, plus a collection of modules that correspond to function exposed
by the Mobile Cloud Services.  The downloaded zip file
contains all of them. However, each piece of the JavaScript SDK is also available as a separate module
that you can add to your project individually. This allows maximum flexibility, as the developer is able to 
pick and choose the modules required for a given application. 

The JavaScript SDK contains the following components, any of which may be added to your project.

- **[ibmbluemix](https://hub.jazz.net/project/bluemixmobilesdk/ibmbluemix-javascript/overview)** - This is the foundation of the SDK and controls connection and communication with Backend services
- **[ibmpush](https://hub.jazz.net/project/bluemixmobilesdk/ibmpush-javascript/overview)** - This is the service SDK for push notification support
- **[ibmdata](https://hub.jazz.net/project/bluemixmobilesdk/ibmdata-javascript/overview)** - This is the service SDK for cloud data storage
- **[ibmcloudcode](https://hub.jazz.net/project/bluemixmobilesdk/ibmcloudcode-javascript/overview)** - This is the service SDK for cloud code invocation

##Get started

Services are associated with a Mobile Cloud application. Connectivity and interaction with
these services depends on the application ID, application secret, and application route associated
with a Mobile Cloud Application.

The cloud code JavaScript SDK for IBM Bluemix can be used in a Web or Hybrid application.  You 
can also use the SDK inside a server-side [Node.js](http://nodejs.org) JavaScript module. 
Cloud code provides easy access to the cloud hosted logic and static resources in your Bluemix Mobile 
Cloud application.

An example of initializing the Mobile Cloud Services SDK and cloud code follows.

```javascript
var config = {
  applicationId:"<ApplicationID>",
  applicationRoute:"<ApplicationRoute>",
  applicationSecret:"<ApplicationSecret>"
};

IBMBluemix.initialize(config);
var cc = IBMCloudCode.initializeService();
```

##Learn More
To learn more about using the SDK, please consult the following resources:
- [Extending Node.js to use Mobile Cloud applications](https://www.ng.bluemix.net/docs/#starters/mobile/mobilecloud/nodejsmobile.html#nodejsmobile)
- [Mobile Cloud Services SDK Developer Guide](http://mbaas-gettingstarted.ng.bluemix.net/)
- [Samples and Tutorials](https://www.ng.bluemix.net/docs/#starters/mobile/index.html#samples)
- [Bluemix Developers Community](https://developer.ibm.com/bluemix/)
- Connect with Bluemix: [Twitter](https://twitter.com/ibmbluemix) |
[YouTube](https://www.youtube.com/playlist?list=PLzpeuWUENMK2d3L5qCITo2GQEt-7r0oqm) |
[Blog](https://developer.ibm.com/bluemix/blog/) |
[Facebook](https://www.facebook.com/ibmbluemix) |
[Meetup](http://www.meetup.com/bluemix/)

*Licensed Materials - Property of IBM
(C) Copyright IBM Corp. 2013, 2015. All Rights Reserved.
US Government Users Restricted Rights - Use, duplication or
disclosure restricted by GSA ADP Schedule Contract with IBM Corp.*

[Terms of Use](https://hub.jazz.net/project/bluemixmobilesdk/ibmbluemix-android/overview#https://hub.jazz.net/gerrit/plugins/gerritfs/contents/bluemixmobilesdk%252Fibmbluemix-android/refs%252Fheads%252Fmaster/License.txt) |
[Notices]()
