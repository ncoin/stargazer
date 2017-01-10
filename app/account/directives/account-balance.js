
/* global angular, console */

angular.module('app')
.directive('accountBalance', function (Horizon, Wallet) {
	'use strict';

	function link(scope, iElement, iAttrs) {

		var account = Wallet.current;

		var network = account.network;
		if (network !== Horizon.livenet) {
			scope.network = Horizon.getNetwork(network).name;
		}

		if (account.getNativeBalance() !== '0') {
			scope.lockClass = account.isLocallySecure()? 'ion-ios-locked-outline' : 'ion-ios-unlocked-outline';
		}

		scope.getAssets = function () {

			if (account.balances) {
				return account.balances.filter(function (e) {
					if (e.asset_type === 'native') {
						return true;
					} else {
						return (e.balance !== '0.0000000');
					}
				});
			} else {
				return [];
			}
		};
	}

	return {
		restrict: 'AE',
		scope: {
			account: '='
		},
		link: link,
		templateUrl: 'app/account/templates/account-balance.html'
	};
});
