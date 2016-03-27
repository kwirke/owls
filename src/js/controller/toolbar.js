'use strict';

module.exports = function($scope, $mdMenu, $mdDialog, $mdToast){
	var _ = require('underscore');
	this.currentList = 'Shopping List';
	this.lists = ['Shopping List', 'A'];

	// var last = {
	// 	bottom: false,
	// 	top: true,
	// 	left: false,
	// 	right: true
	// };
	// $scope.toastPosition = angular.extend({}, last);

	var originatorEv;
	this.openMenu = function($mdOpenMenu, ev) {
		originatorEv = ev;
		$mdOpenMenu(ev);
	};

	// Switches current list from the select menu on top
	this.switchList = function($event, list) {
		var self = this;
		// Wait for the menu to close before switching current list
		$mdMenu.hide().then(function() {
			self.currentList = list;
		});
	};

	// Shows a dialog asking to insert the name for the new list
	this.showPrompt = function($event) {
		var self = this;
		var confirm = $mdDialog.prompt()
			.title('Name the new list')
			.textContent('Names can not be repeated')
			.placeholder('List name')
			.ariaLabel('List name')
			.targetEvent($event)
			.ok('Add')
			.cancel('Cancel');
		$mdDialog.show(confirm).then(function(result) {
			if (_.every(self.lists, function(list) {
				return result.toLowerCase() != list.toLowerCase();
			})) {
				self.lists.push(result);
				self.currentList = result;
			}
			else {
				$mdToast.show(
					$mdToast.simple()
						.textContent('This list already exists!')
						.position('top right')
				);
			}
		});
	};

	// Custom filter to select all array elements that do NOT match the pattern
	// Used to show all the lists except the current one
	this.listsFilter = function(actual, expected) {
		return actual != expected;
	};

	originatorEv = null;
};