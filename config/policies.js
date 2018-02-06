/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */

module.exports.policies = {
  NewsController: {
    'findOne': true,
    'updateNews': ['isLoggedIn', 'isManager'],
    'getAllPendingNews': ['isLoggedIn', 'isManager'],
    '*': false,
  },

  EventController: {
    'findEvent': true,
    'getEvent': true,
    'createEvent': true,
    'updateEvent': ['isLoggedIn', 'isManager'],
    'getEventList': true,
    'getPendingNews': ['isLoggedIn', 'isManager'],
    'createNews': true,
    'updateHeaderImage': ['isLoggedIn', 'isManager'],
    '*': false,
  },

  ClientController: {
    'updateClient': true,
    'findClient': true,
    'login': true,
    'register': true,
    'updateRole': ['isLoggedIn', 'isAdmin'],
    'getClientDetail': 'isLoggedIn',
    'logout': 'isLoggedIn',
    '*': false,
  },

  SubscriptionController: {
    'unsubscribe': true,
    'subscribe': true,
    '*': false,
  },

  HeaderImageController: {
    '*': false,
  },

  AuthController: {
    'options': true,
    'authorize': true,
    'unauthorize': true,
    'twitter': true,
    'twitterRedirect': true,
    'twitterCallback': true,
    'weibo': true,
    'weiboRedirect': true,
    'weiboCallback': true,
    '*': false,
  },

  UploadController: {
    'upload': true,
    '*': false,
  },

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};