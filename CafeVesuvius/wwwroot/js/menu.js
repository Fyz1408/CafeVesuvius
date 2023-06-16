$(function () {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setupProductCategoriesAndMenuWithAjax(false);
    } else {
        $("#toggleMenuPicturesSwitch").prop('checked', true)
        setupProductCategoriesAndMenuWithAjax(true);
    }

    // Filter menu items when dropdown changes value
    $(".onChangeMenu").change(function () {
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

    $("#toggleMenuPicturesSwitch").change(function () {
        $("#menuItemsDropdown")[0].selectedIndex = 0;
        if (this.checked) {
            setupProductCategoriesAndMenuWithAjax(true);
        } else {
            setupProductCategoriesAndMenuWithAjax(false);
        }
    });

    setupDropdownWithAjax();
});


// Gets all product categories from API and create the category rows
function setupProductCategoriesAndMenuWithAjax(withImages) {
    $.ajax({
        // TODO Fix cor on API but for now use localhost
        url: 'http://localhost:5118/actualCategories',
        dataType: 'json',
        type: "GET",
        success: function setup(response) {
            $("#menuItemSection").empty();
            $.each(response, function (key, value) {
                if (withImages) {
                    $("#menuItemSection").append(
                        "<div class='row justify-content-center' id=menuItemsRow" + value.foodCategoryId + ">" +
                        "<div class='menuItemTitle' style='margin-top: 15px' id=menuItemTitle" + value.foodCategoryId + ">" +
                        "<h4>" + value.name + "</h4>" +
                        "<div class='list-group flex-row overflow-scroll' id=list-group" + value.foodCategoryId + ">" +
                        "</div></div></div>"
                    );
                } else {
                    $("#menuItemSection").append(
                        "<div class='menuItemTitle' style='margin-top: 15px' id=menuItemTitle" + value.foodCategoryId + ">" +
                        "<h4>" + value.name + "</h4>" +
                        "<div class='list-group' id=list-group" + value.foodCategoryId + ">" +
                        "</div></div>"
                    );
                }
            });
            setupMenuWithAjax(withImages);
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error)
        },
    });
}

// Inserts all the menu items from the API into the category rows
function setupMenuWithAjax(withImages) {
    $.ajax({
        // TODO Fix cor on API but for now use localhost
        url: 'http://localhost:5118/menu-items',
        dataType: 'json',
        type: "GET",
        success: function setup(response) {
            $.each(response, function (key, value) {
                if (withImages) {
                    $("#" + 'list-group' + value.foodCategoryId).append(
                        "<a href='#' class='menuItemUnit list-group-item flex-column'>" +
                        "<img class='img-fluid rounded menuItemImg' src=" + "IMG/menu/jpg/" + value.name.replace(/ /g, '') + ".jpg" + " onerror=this.src='IMG/menu/noImage.png'; alt=" + value.name.replace(/ /g, '') + "/>" +
                        "<b class='menuItem'>" + value.name + "</b>" +
                        "<p class=menuDescription>" + value.description + "</p>" +
                        "<b>Fra " + value.price + ",-</b>" +
                        "</a>"
                    );
                } else {
                    $("#" + 'list-group' + value.foodCategoryId).append(
                        "<a href='#' class='list-group-item flex-column'>" +
                        "<p class='menuItem'>" + value.name +
                        "<b>Fra " + value.price + ",-" +
                        "</b></p></a>"
                    );
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error)
        },
    });
}


// Inserts all product categories from the API into the dropdown
function setupDropdownWithAjax() {
    $.ajax({
        // TODO Fix cor on API but for now use localhost
        url: 'http://localhost:5118/actualCategories',
        dataType: 'json',
        type: "GET",
        success: function setup(response) {
            
            $.each(response, function (key, value) {
                $(".menuItemsDropdown").append(
                    new Option(value.name, value.foodCategoryId)
                );
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error)
        },
    });
}