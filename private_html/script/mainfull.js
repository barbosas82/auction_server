requirejs.config({
    paths: {
        jquery: "./jquery.min",
        jqueryui: "./jquery-ui.min",
        bootstrap: "./bootstrap.min"
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
		jqueryui: {
            deps: ['jquery']
        }
    }
});

//Define dependencies and pass a callback when dependencies have been loaded
require(["jquery", "jqueryui", "bootstrap"], function ($) {
    //Bootstrap and jquery are ready to use here
    //Access jquery and bootstrap plugins with $ variable
	
	//$('#totalApagar').hide();
	//$('#leiloesTerminados').hide();
	

    $.fn.center = function() {
            this.css("position","absolute").css("z-index","5000").css("top","200px").css("left","600px");
            return this;
        };

    $(function(){
        $("[data-hide]").on("click", function(){
            $("." + $(this).attr("data-hide")).hide();
        });
    });

    $(document).on('keypress', '.idContentEditable', function(e){
        return e.which != 13; 
    });
});

