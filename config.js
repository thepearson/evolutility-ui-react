
module.exports = {

	// Define API type (feathers, default)
	apiType: 'feathers',

	// - Path to REST API, or feathers api
	apiPath: 'https://example.com/',

	// - Path to uploaded files, or feathers files api endpoint
	filesUrl: 'https://example.com/files/',

  // Define files call type, feathers-rest (https://docs.feathersjs.com/guides/file-uploading.html), direct (default)
  filesType: 'feathers-rest',

  // - Pagination
	pageSize: 50,

	// - Language (en/fr)
	locale: 'en',

};
