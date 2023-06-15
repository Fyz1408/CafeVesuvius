$(function () {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setupProductCategoriesAndMenu(false);
    } else {
        $("#toggleMenuPicturesSwitch").prop('checked', true)
        setupProductCategoriesAndMenu(true);
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
            setupProductCategoriesAndMenu(true);
        } else {
            setupProductCategoriesAndMenu(false);
        }
    });

    setupDropdown();
});


// Gets all product categories from API and create the category rows
function setupProductCategoriesAndMenu(withImages) {
    $.get('/allProductCategories',
        function (response) {
            $("#menuItemSection").empty();
            var data = jQuery.parseJSON(response);
            $.each(data, function (key, value) {
                if (withImages) {
                    $("#menuItemSection").append(
                        "<div class='row justify-content-center' id=menuItemsRow" + value.FoodCategoryId + ">" +
                        "<div class='menuItemTitle' style='margin-top: 15px' id=menuItemTitle" + value.FoodCategoryId + ">" +
                        "<h4>" + value.Name + "</h4>" +
                        "<div class='list-group flex-row overflow-scroll' id=list-group" + value.FoodCategoryId + ">" +
                        "</div></div></div>"
                    );
                } else {
                    $("#menuItemSection").append(
                        "<div class='menuItemTitle' style='margin-top: 15px' id=menuItemTitle" + value.FoodCategoryId + ">" +
                        "<h4>" + value.Name + "</h4>" +
                        "<div class='list-group' id=list-group" + value.FoodCategoryId + ">" +
                        "</div></div>"
                    );
                }
            });
            setupMenu(withImages);
        });
}

// Inserts all the menu items from the API into the category rows
function setupMenu(withImages) {
    $.get('/allMenuItemsWithProductCategory',  // url
        function (response) {
            var data = jQuery.parseJSON(response);
            $.each(data, function (key, value) {
                if (withImages) {
                    $("#" + 'list-group' + value.ProductCategoryId).append(
                        "<a href='#' class='menuItemUnit list-group-item flex-column'>" +
                        "<img class='img-fluid rounded menuItemImg' src=" + "IMG/menu/webp/" + value.ProductName.replace(/ /g, '') + ".webp" + " onerror=this.src='IMG/menu/default.jpg'; alt=" + value.ProductName.replace(/ /g, '') + "/>" +
                        "<b class='menuItem'>" + value.ProductName + "</b>" +
                        "<p class=menuDescription>" + value.Description + "</p>" +
                        "<b>Fra " + value.Price + ",-</b>" +
                        "</a>"
                    );
                } else {
                    $("#" + 'list-group' + value.ProductCategoryId).append(
                        "<a href='#' class='list-group-item flex-column'>" +
                        "<p class='menuItem'>" + value.ProductName +
                        "<b>Fra " + value.Price + ",-" +
                        "</b></p></a>"
                    );
                }
            });
        });
}

function setupMenuWithAjax(withImages) {
    $.ajax({
        url: 'http://localhost:5118/menu-items',
        dataType: 'json',
        type: "GET",
        success: function setup(response) {
            console.log("TESTER HEST ", response)
            var data = jQuery.parseJSON(response);
            console.log(data)
            $.each(data, function (key, value) {
                console.log(value.menuItemId)
                if (withImages) {
                    $("#" + 'list-group' + value.foodCategoryId).append(
                        "<a href='#' class='menuItemUnit list-group-item flex-column'>" +
                        "<img class='img-fluid rounded menuItemImg' src=" + "IMG/menu/webp/" + value.menuItemId + ".webp" + " onerror=this.src='IMG/menu/default.jpg'; alt=" + value.name.replace(/ /g, '') + "/>" +
                        "<b class='menuItem'>" + value.name + "</b>" +
                        "<p class=menuDescription>" + value.escription + "</p>" +
                        "<b>Fra " + value.price + ",-</b>" +
                        "</a>"
                    );
                } else {
                    $("#" + 'list-group' + value.ProductCategoryId).append(
                        "<a href='#' class='list-group-item flex-column'>" +
                        "<p class='menuItem'>" + value.ProductName +
                        "<b>Fra " + value.Price + ",-" +
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
function setupDropdown() {
    $.get('/allProductCategories',  // url
        function (response) {
            var data = jQuery.parseJSON(response);
            $.each(data, function (key, value) {
                $(".menuItemsDropdown").append(
                    new Option(value.Name, value.FoodCategoryId)
                );
            });
        });
}
