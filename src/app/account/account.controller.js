(function () {
    'use strict';

    angular.module('app')
        .controller('AccountController', accountController);

    function accountController() {
        var vm = this;

        // Declare fields and methods on angular scope
        angular.extend(vm, {
            // Fields
            toolbox: [
                {
                    title: "ConnectWise Manage",
                    img: "https://www.connectwise.com/-/media/icons/color/manage-logo.ashx?h=256&w=256&la=en&hash=B7E309BC9AA66ED50B5F80D669C57E8BFA928A6E"
                },
                {
                    title: "ConnectWise Sell",
                    img: "https://www.connectwise.com/-/media/icons/color/sell-logo.ashx?h=256&w=256&la=en&hash=83AD26D23B375F97A3CE4FAE943569C2499948D1"
                },
                {
                    title: "Microsoft SharePoint",
                    img: "https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/e3/48/cd/e348cd11-41bf-d322-bc3c-4f4256c41c48/AppIcon-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-6.png/1200x630bb.jpg"
                }
            ]
        });

        // Controller initialization
        init();

        function init() {

        }
    }

})();
