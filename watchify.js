
function initCurrentChannelWatcher() {
	var target = document.querySelector('#bufferlines table');
	if (!target) {

		setTimeout(1000, initCurrentChannelWatcher);
		return;
	}
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.addedNodes.length === 1 && mutation.addedNodes[0].nodeName == 'TBODY') {
				if (!document.hasFocus()) {
					var prefix = mutation.addedNodes[0].querySelector('td.prefix .cof-chat_prefix_network');
					if (prefix.textContent.trim() == '--') {

						return;
					}
					var span = mutation.addedNodes[0].querySelector('td.message span');
					if (span.classList.contains('cef-32') || span.classList.contains('cof-chat_day_change')) {
						// its a server message, not a user message, so ignore it

						return;
					}


					// var audioFile = 'http://www.glowing-bear.org/assets/audio/sonar.ogg';
					var audio_domel = document.createElement('audio');
					audio_domel.setAttribute('autoplay', 'autoplay');
					audio_domel.setAttribute('src', 'assets/audio/sonar.ogg');

				} else {

				}
			}
		});
	});
	var config = { childList: true };
	observer.observe(target, config);
}
setTimeout(initCurrentChannelWatcher, 10000);

function initOtherChannelWatcher() {
	var target = document.querySelector('#sidebar ul')
	if (!target) {

		setTimeout(1000, initOtherChannelWatcher);
		return;
	}

	// var watched_channels = ['jsctypes', 'amo-editors', 'centril_noida', 'extdev'];
	var watched_field = document.getElementById('watched_channels');
	if (!watched_field) {
		watched_field = document.createElement('input');
		watched_field.setAttribute('type', 'text')
		watched_field.setAttribute('id', 'watched_channels');
		watched_field.setAttribute('style', 'width:400px;');
		watched_field.value = localStorage.getItem('extensions.glowing-bear-channel-watcher@jetpack.watched_channels') || ''; // 'extdev, jsctypes, amo-editors, janitor, centril_noida';
		watched_field.addEventListener('change', function(e) {
			localStorage.setItem('extensions.glowing-bear-channel-watcher@jetpack.watched_channels', e.target.value);
		}, false);
		document.querySelector('.title').appendChild(watched_field);
	}
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			var watched_channels = watched_field.value.split(',').map(el=>el.trim().toLowerCase());

			if (mutation.addedNodes.length === 1) {
				var node = mutation.addedNodes[0];
				if (node.nodeType == 3 && node.parentNode.classList.contains('badge')) {
					var channel_name = node.parentNode.parentNode.querySelector('.buffername').textContent.trim().toLowerCase();
					if (watched_channels.includes(channel_name)) {

						var audio_domel = document.createElement('audio');
						audio_domel.setAttribute('autoplay', 'autoplay');
						audio_domel.setAttribute('src', 'assets/audio/sonar.ogg');
					} else {

					}
				}
			}
		});
	});
	var config = { childList:true, subtree:true };
	observer.observe(target, config);
}
initOtherChannelWatcher();
