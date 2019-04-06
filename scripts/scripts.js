var initiateProducts;
var initiateOrders;
$(function () {

    initiateProducts = function(){
        //Getting Products From DB
        var midsection = $(".midsection");
        var url = "api/getData.php";
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                'method': 1
            },
            dataType: 'json',
            beforeSend: function () {
                // console.log('Before Sending...');
            },
            success: function (data) {
                // console.log('Success: ', data);
                for (let i = 0; i < data.length; i++) {
                    midsection.append('<div class="col-md-4"><div class="card" id="card' + data[i]['id'] + '" style="width:400px"><img class="card-img-top" src="assets/img/' + data[i]['img'] + '" alt="Card image"><div class="card-body"><h4 class="card-title">' + data[i]['name'] + '</h4><p class="card-text">' + data[i]['description'] + '</p><a href="#" class="btn btn-primary stretched-link">Add Product To Cart</a></div></div></div>');
                }
                userStart();
            },
            error: function (xhr) { // if error occured
                console.log("Error: " + xhr.statusText + xhr.responseText);
                midsection.empty();
            },
            complete: function () {
                // console.log('Complete!');
            }
        });
    
        var userStart = function(){
            //Selection Of Product(s)
            $('.card').on('click', function(e){
                e.preventDefault();
                $(this).toggleClass('selected');
            });
        }
    
        //My Orders
        $('.btn-myorder').on('click', function(e){
            e.preventDefault();
            window.location.replace("http://localhost/ShopCart/myorders.html");
        });

        //Placing Order
        $('.btn-placeorder').on('click', function(e){
            e.preventDefault();
            var selected = $('.selected');
            if(selected.length==0){
                alert('Please Select At Least One Product For Placing Order!');
            }else{
                let data = [];
                for(let i=0;i<selected.length;i++){
                    data.push(parseInt(selected[i].id.substring(4,5)));
                }
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        'method': 2,
                        'data': data
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        // console.log('Before Sending...');
                    },
                    success: function (data) {
                        // console.log('Success: ', data);
                        if(data=="Success"){
                            window.location.replace("http://localhost/ShopCart/myorders.html");
                        }
                    },
                    error: function (xhr) { // if error occured
                        console.log("Error: " + xhr.statusText + xhr.responseText);
                    },
                    complete: function () {
                        // console.log('Complete!');
                    }
                });
            }
        });
    }
    
    initiateOrders = function(){

        //Goto Shopping Cart
        $('.btn-shopcart').on('click', function(e){
            e.preventDefault();
            window.location.replace("http://localhost/ShopCart");
        });

        //Getting Orders
        var url = "api/getData.php";
        var showorders = $('.showorders');
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                'method': 3
            },
            dataType: 'json',
            beforeSend: function () {
                // console.log('Before Sending...');
            },
            success: function (data) {
                // console.log('Success: ', data);
                for (let i = 0; i < data.length; i++) {
                    var date = new Date(data[i]['time']);
                    var dd = date.getDate();
                    var mm = date.getMonth()+1; 
                    var yyyy = date.getFullYear();
                    if(dd<10){
                        dd='0'+dd;
                    } 
                    if(mm<10){
                        mm='0'+mm;
                    } 
                    datestring = dd+'/'+mm+'/'+yyyy;
                    var id = data[i]['id'];
                    showorders.append('<div class="row"><div class="col-md-6 offset-md-3"><h4 class="color">' + datestring + '</h4><ul class="timeline" id="' + id + '"></ul></div></div>');
                    var products = data[i]['products'].split(',');
                    var prices = data[i]['prices'].split(',');
                    console.log(products, prices);
                    for (let j = 0; j < products.length; j++) {
                        $('.timeline#' + id).append('<li><a class="color">' + products[j] + '</a><a class="color float-right">' + prices[j] + '</a></li>');
                    }
                }
            },
            error: function (xhr) { // if error occured
                console.log("Error: " + xhr.statusText + xhr.responseText);
            },
            complete: function () {
                // console.log('Complete!');
            }
        });
    }
});