
/**
 * Serialize a javascript object to AppleScript
 */
function serializeObject(value) {
	if (value === null) {
		return '';
	}
	var result;
	var typeOf = typeof value;

	if (typeOf === 'object' && (value !== null)) {
		result = '{';
		if (Array.isArray(value)) {
			value.forEach(function (arrayValue, i) {
				if (i !== 0) {
					result += ',';
				}
				result += serializeObject(arrayValue);
			});
		} else {
			Object.keys(value).forEach(function (key, i) {
				if (i !== 0) {
					result += ',';
				}
				result += key + ':' + serializeObject(value[key]);
			});
		}

		result += '}';
	} else if (typeOf === 'string') {
		result = '"' + value + '"';
	} else if (value === undefined) {
		result = 'null';
	}

	return result || value;
}

module.exports = {
	serializeObject: serializeObject,
  // Generate apple script from javascript object
	generate: function (object) {
		var aScript = '';

		Object.keys(object).forEach(function (key) {
			aScript += 'set ' + key + ' to ' + serializeObject(object[key]) + '\n';
		});

		return aScript;
	}
};
