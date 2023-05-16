$(function () {

    $("#menuItemsDropdown").change(function () {
        var id = $(this).val();
        if (id === "Default") {
            $("#menuItemsDropdown option:first").text('Vælg en kategori');
            $(".menuItemTitle").show();
        } else {
            $("#menuItemsDropdown option:first").text('Vis Alle');
            $(".menuItemTitle").hide();
            $("#" + 'menuItemTitle' + id).show();
        }
    });

    setupDropdown();
    setupProductCategories();
    setupMenu();
});


// Gets all product categories from API and create the category rows
function setupProductCategories() {
    $.get('/allProductCategories',
        function (response) {
            $("#menuItemsRow").empty();
            var data = jQuery.parseJSON(response);
            $.each(data, function (key, value) {
                $("#menuItemsRow").append(
                    "<div class='menuItemTitle' id=menuItemTitle" + value.Id + ">" + "<h4>" + value.Name + "</h4>" +
                    "<div class='list-group' id=list-group" + value.Id + ">" + "</div></div>"
                );
            });
        });
}

// Inserts all the menu items from the API into the category rows
function setupMenu() {
    $.get('/allMenuItemsWithProductCategory',  // url
        function (response) {
            //$("#menuItemsRow").empty();
            var data = jQuery.parseJSON(response);
            $.each(data, function (key, value) {
                $("#" + 'list-group' + value.ProductCategoryId).append(
                    "<a href='#' class='menuItem list-group-item'>" + value.ProductName + "<b>Fra " + value.Price + ",-</b></a>"
                );
            });
        });
}

// Inserts all product categories from the API into the dropdown
function setupDropdown() {
    $.get('/allProductCategories',  // url
        function (response) {
            var data = jQuery.parseJSON(response);
            $.each(data, function (key, value) {
                $(".menuItemsDropdown").append(
                    new Option(value.Name, value.Id)
                );
            });
        });
}

