// Converts mm:ss.SSS to milliseconds.
module.exports.toMilli = function (time) {
	var minutes = +(time.indexOf(':') > 0 ? time.split(':')[0] : 0)
	var seconds = +((time.indexOf(':') > 0 ? time.split(':')[1] : time).split('.')[0]);
	var milliseconds = +(time.split('.')[1] + ['000', '00', '0', ''][time.split('.')[1].length]);
	return milliseconds + (seconds + minutes*60)*1000;
}

// Takes milliseconds and returns a time in the format mm:ss.SSS
module.exports.pretty = function (time) {
	if (time < 0)
		return 'DNF';

	time = Math.round(time / 10);
	var bits = time % 100;
	time = (time - bits) / 100;
	var secs = time % 60;
	var mins = ((time - secs) / 60) % 60;

	var out = [bits];
	if (bits < 10) {
		out.push('0');
	}
	out.push('.');
	out.push(secs);
	if (secs < 10 && mins > 0) {
		out.push('0');
	}
	if (mins > 0) {
		out.push(':');
		out.push(mins)
	}
	return out.reverse().join('');
}

module.exports.timeString = '^(([0-9]+):)?([0-5]?[0-9])(\.([0-9]?[0-9]))?$';
