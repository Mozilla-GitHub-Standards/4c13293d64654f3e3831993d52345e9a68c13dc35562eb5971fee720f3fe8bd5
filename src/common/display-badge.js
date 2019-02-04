"use strict";

import Monitor from "../common/monitor.js";

// ==== START ==================================================================

/**
 * @const {string} Text of the badge ('X' for disabled).
 **/
const badgeText = "X";

/**
 * @const {string} Foreground color of the badge (white).
 **/
const badgeColor = "#fff";

/**
 * @const {string} Background color of the badge (red).
 **/
const badgeRedBackground = "#d62728";

/**
 * @const {string} Background color of the badge (grey).
 **/
const badgeGreyBackground = "#999";

/**
 * @const {Monitor} Event logger.
 **/
const monitor = new Monitor("badge");

/**
 * Display a badge over the toolbar icon.
 * @param {boolean} showOneTimeMessage - Display badge in red.
 * @function
 **/
const displayBadge = (showOneTimeMessage = false) => {
	monitor.enter("displayBadge");

	// Set the badge colors and text
	browser.browserAction.setBadgeTextColor({
		"color": badgeColor,
	});
	browser.browserAction.setBadgeBackgroundColor({
		"color": showOneTimeMessage ? badgeRedBackground : badgeGreyBackground,
	});
	browser.browserAction.setBadgeText({
		"text": badgeText,
	});

	monitor.exit("displayBadge");
};

// ==== END ====================================================================

export default displayBadge;