(function () {
    'use strict';

    angular.module('app')
        .controller('HomeController', homeController);

    function homeController($state) {
        var vm = this;

        // Declare fields and methods on angular scope
        angular.extend(vm, {
            // Fields
            go: go,
            channels: [
                {
                    title: "ConnectWise Manage",
                    img: "https://www.connectwise.com/-/media/icons/color/manage-logo.ashx?h=256&w=256&la=en&hash=B7E309BC9AA66ED50B5F80D669C57E8BFA928A6E"
                },
                {
                    title: "ConnectWise Sell",
                    img: "https://www.connectwise.com/-/media/icons/color/sell-logo.ashx?h=256&w=256&la=en&hash=83AD26D23B375F97A3CE4FAE943569C2499948D1"
                },
            ],
            events: [
                {
                    title: "Synapse",
                    date: "Mar 29, 2018"
                },
                {
                    title: "IT Nation",
                    date: "Nov 7 - 9, 2018"
                }
            ],
            posts: [
                {
                    title: "Search / display by schedule",
                    by: "submitted 12 hours ago by ZellZoy",
                },
                {
                    title: "Connectwise Email Notification Issue with 3rd Party Portal (Desk Director)",
                    by: "submitted 22 hours ago * by mspthrowawai",
                },
                {
                    title: "Member password policy",
                    by: "submitted 2 days ago by gogo_gawdzilla",
                },
                {
                    title: "Manage <--> Automate Configuration Syncing",
                    by: "submitted 10 days ago by Methantilus",
                }

            ],
            articles: [
                {
                    title: "Cloud",
                    img: "https://www.connectwise.com/-/media/icons/light/cloud.ashx?h=256&w=256&la=en&hash=512C170FCA19D075596573BC02D629B4E1B3AB73"
                },
                {
                    title: "Internal IT",
                    img: "https://www.connectwise.com/-/media/icons/light/agreements.ashx?h=257&w=256&la=en&hash=274FCAEA83B446EDA9E85B40DB719A12D1237322"
                }
            ]
        });

        // Controller initialization
        init();

        function init() {

        }

        function go(state) {
            $state.go(state);
        }
    }

})();
