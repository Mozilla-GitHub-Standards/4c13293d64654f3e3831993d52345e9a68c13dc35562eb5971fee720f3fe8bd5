/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * @overview Doorhanger script of the Ad Analysis for Facebook extension.
 *     In this disabled version of the extension, the scripts fills in the text
 *     message and relevant links in the doorhanger, and records that the user
 *     has seen the latest message for version 1.1.x.
 * @author Jason Chuang <jchuang@mozilla.com>
 **/

"use strict";
import "toolbar/toolbar.less";
import DataStorage from "common/data-storage.js";
import displayBadge from "common/display-badge.js";
import Monitor from "common/monitor.js";

// ==== START ==================================================================

// ---- Constants for US English -----------------------------------------------

/**
 * @const {string} Title of the doorhanger.
 **/
const title = "Ad Analysis for Facebook (U.S. English) - DISABLED";

/**
 * @const {Object.<string, string>} Dictionary containing all strings used in the doorhanger.
 **/
const strLanguages = {
	"strTitle": "Ad Analysis for Facebook",
	"strDisabledMessage": "Ad Analysis for Facebook is temporarily disabled. Facebook has blocked this extension, so it will no longer show you how you're targeted by advertisers.",
	"strLearnMore": "Learn more",
	"strBrowseMessage": "You may continue to browse the following public datasets.",
	"strTargetingData": "Targeting data collected by ProPublica",
	"strElectionData": "Top political advertisers in the United States",
};

/**
 * @const {Object.<string, string>} Dictionary containing all links in the doorhanger.
 **/
const aLinks = {
	"strLearnMore": "https://blog.mozilla.org/blog/2019/01/31/mozilla-raises-concerns-over-facebooks-lack-of-transparency/",
	"strTargetingData": "https://mozilla.github.io/ad-analysis-for-facebook/info.html#SeeAllTargets",
	"strElectionData": "https://mozilla.github.io/ad-analysis-for-facebook/info.html#TopAdvertisers",
};

// ---- Start of doorhanger script ---------------------------------------------

// Access persistent data storage
const dataStorage = new DataStorage();

// Log UI events. Ensure query selections are non-empty.
const monitor = new Monitor("toolbar");

// Insert all strings and links into the doorhanger HTML document.
const loader = function() {
	monitor.enter("loader");

	// Update the title of the document.
	document.title = title;

	// Update text in the document.
	for (const key in strLanguages) {
		const value = strLanguages[key];
		const selector = `.str.${key}`;
		const elems = document.querySelectorAll(selector);
		monitor.assert(elems && elems.length > 0, "Empty query selection:", selector);
		elems.forEach(elem => {
			elem.innerText = value;
		});
	}

	// Update links in the document.
	for (const key in aLinks) {
		const value = aLinks[key];
		const selector = `a.str.${key}`;
		const elems = document.querySelectorAll(selector);
		monitor.assert(elems && elems.length > 0, "Empty query selection:", selector);
		elems.forEach(elem => {
			elem.href = value;
			elem.rel = "noopener noreferrer";
			elem.target = "_blank";
		});
	}

	// Record that the user has opened the doorhanger.
	// Update the badge over the toolbar icon.
	dataStorage.setExtensionUpdateMessageVersion(1.1).then(version => {
		const showOneTimeMessage = !(version && version >= 1.1);
		displayBadge(showOneTimeMessage);
		monitor.exit("loader");
	});
};

// Run loader when the doorhanger HTML document finishes loading.
document.addEventListener("DOMContentLoaded", loader);

// ==== END ====================================================================
