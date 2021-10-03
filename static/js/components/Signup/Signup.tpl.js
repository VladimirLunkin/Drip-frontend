(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['signup'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<body id=\"root\">\n    <div class=\"card-container\">\n        <div class=\"center-container\">\n            <span class=\"login-header\">Зарегистрироваться</span>\n        </div>\n        <div class=\"center-container\">\n            <form class=\"login-form\">\n                <div class=\"drip-logo-bg\">\n                    <div class=\"input-with-icon\"><input type=\"email\" name=\"email\" placeholder=\"Почта\"\n                            class=\"form-field-valid\" /><img src=\"icons/email.svg\" class=\"input-icon\" />\n                    </div>\n                    <div class=\"login-error\" id=\"emailError\"></div>\n                    <div class=\"input-with-icon\"><input type=\"password\" name=\"password\" placeholder=\"Пароль\"\n                            class=\"form-field-valid\" /><img src=\"icons/password.svg\" class=\"input-icon\" />\n                    </div>\n                    <div class=\"login-error\" id=\"passwordError\"></div>\n                    <div class=\"input-with-icon\"><input type=\"password\" name=\"repeatPassword\" placeholder=\"Повторите пароль\"\n                            class=\"form-field-valid\" /><img src=\"icons/password.svg\" class=\"input-icon\" />\n                    </div>\n                    <div class=\"login-error\" id=\"repeatPasswordError\"></div>\n                </div>\n                <div class=\"login-error\" id=\"formError\"></div>\n                <button type=\"submit\" class=\"signup-button\">\n                    <div class=\"center-container\">\n                        <span class=\"signup-button-text\">Зарегистрироваться</span>\n                        <img />\n                    </div>\n                </button>\n            </form>\n        </div>\n        <div class=\"center-container\">\n            <a class=\"back-link\" href=\"/login\" data-section=\"login\">\n                <div class=\"center-container\">\n                    <img class=\"back-svg\" src=\"icons/back.svg\">\n                    <span class=\"back-text\">вернуться назад</span>\n                </div>\n            </a>\n        </div>\n    </div>\n</body>";
},"useData":true});
})();