//Intialize APIs
const getSellerAPI="http://localhost/e-commerce_project/backend/getSellers.php";
const getSellerCategoriesAPI="http://localhost/e-commerce_project/backend/getCategories.php";
const getRandomProductsAPI="http://localhost/e-commerce_project/backend/getRandProducts.php";
const getProductsByCatAPI = "http://localhost/e-commerce_project/backend/getProductsByCat.php";
const getRandProductsBySellerAPI = "http://localhost/e-commerce_project/backend/getRandProductBySeller.php?id=";
const getProductAPI = "http://localhost/e-commerce_project/backend/getProduct.php?product_id=";
const likedProductAPI = "http://localhost/e-commerce_project/backend/checkItemIfLiked.php?user_id=" + localStorage.getItem("userID");
const likeAPI = "http://localhost/e-commerce_project/backend/likeItem.php?user_id=" + localStorage.getItem("userID");
const unlikeAPI = "http://localhost/e-commerce_project/backend/unlikeItem.php?user_id=" + localStorage.getItem("userID");
const isFavoredAPI = "http://localhost/e-commerce_project/backend/isFavored.php?user_id=" + localStorage.getItem("userID");
const addToWishlistAPI = "http://localhost/e-commerce_project/backend/addWishlistItem.php?user_id=" + localStorage.getItem("userID");
const rmFromWishlistAPI = "http://localhost/e-commerce_project/backend/RemoveItemFromWishlist.php?user_id=" + localStorage.getItem("userID");
const addToCartAPI = "http://localhost/e-commerce_project/backend/addToCart.php?user_id=" + localStorage.getItem("userID");

//Initialize variables
const sellerContainer=document.querySelector(".sellers");
const categoriesUl=document.querySelector(".categories_list");
const productsDiv=document.querySelector(".products");
const productModal = document.getElementById("product_modal");

const imagesGenertor = ["https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSla-p7MqWVSLL2rpSQHlxEO6mKceKYPvZjo4oslefoeXE7-oMcRHP5IfT3qgllHC8kKvQ&usqp=CAU",
"https://www.w3schools.com/howto/img_avatar.png",
"https://www.w3schools.com/w3images/avatar6.png",
"https://www.w3schools.com/howto/img_avatar2.png",
"https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094961-stock-illustration-businesswoman-profile-icon.jpg",
"https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-businessman-avatar-icon-flat-style-png-image_1917273.jpg",
"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"];
let data;

const getSellers=()=>{
    axios.get(getSellerAPI)
    .then(response =>  {
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            //create a div for each seller
            const div=document.createElement("div");
            div.classList.add("seller-div")
            sellerContainer.appendChild(div)
            
            //Create an image and add the class seller to it
            const img=document.createElement("img");
            img.classList.add("seller");
            

            //Give a random image to each seller
            img.src = imagesGenertor[Math.floor(Math.random()*imagesGenertor.length)];;
           
            //Display seller name under his image
            const par=document.createElement("span")
            par.innerHTML=response.data[i].username;
            par.classList.add("seller-name")
          
            //append img and seller name to div
            div.appendChild(img)
            div.appendChild(par)

            //On click, show the seller details
            img.addEventListener("click",function(){

                //Get seller's categories and 9 random products from all categories
                getSellerCategories(response.data[i].id);
                getSellerProducts(response.data[i].id);
            },false)
        }
    })
    .catch((e)=>{
        //Get error
        console.log(e);
    })
}

const getSellerCategories=(id)=>{
    const data = new FormData();
    data.append("id", id);

    //Get data from the server using axios
    axios.get(getSellerCategoriesAPI + "?id=" + id)
    .then(response =>  {
        //If no response, show that there's no categories
        if(response.data.length==0){
                categoriesUl.innerHTML = "";

                const li=document.createElement("li");
                li.innerText="No Categories";
                li.classList.add("categoriesItem");
                categoriesUl.appendChild(li);
            
        }
        else{
            categoriesUl.innerHTML = "";

            //Add a header
            const header =document.createElement("h4");
            header.innerText= "Categories";
            header.classList.add("categoriesHeader");
            categoriesUl.appendChild(header);

            for(let i = 0; i < response.data.length; i++){   
                //Create a new list item and add it to the categories container
                const li=document.createElement("li");
                li.innerText=response.data[i].name;
                li.id = response.data[i].id;
                li.classList.add("categoriesItem");
                li.classList.add("hover-underline-animation");
                categoriesUl.appendChild(li);

                //When a user clicks on a category, we get it's products
                li.addEventListener("click", (event) => {
                    productsDiv.innerHTML = "";
                    const data = new FormData();
                    data.append("seller_id", id);
                    data.append("category_id", response.data[i].id);

                    axios.post(getProductsByCatAPI, data)
                    .then(response =>  {
                        //Loop over the response
                        for(let i = 0; i < response.data.length; i++){
                            //Create a new div for each element and give it the product class
                            const product=document.createElement("div");
                            product.classList.add("product");
                            productsDiv.appendChild(product);

                            //Create a new image
                            const image=document.createElement("img");
                            image.classList.add("product_image");
                            image.src = response.data[i].thumbnail;
                            product.appendChild(image);

                            //Create a new div inside the main one to add the product description
                            const productDesc=document.createElement("div");
                            productDesc.classList.add("product_desc");
                            product.appendChild(productDesc);
                            const h4=document.createElement("h4");
                            h4.innerText=response.data[i].name;
                            const span=document.createElement("span");
                            span.innerText=response.data[i].price;

                            productDesc.appendChild(h4);
                            productDesc.appendChild(span);

                            product.setAttribute("productID", response.data[i].id);
                            product.addEventListener("click", openProduct)
                    } 
                });

            })
        }
    }});
}

const getRandomProducts=()=>{
    axios.get(getRandomProductsAPI)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            //Create a new div for each product
            const product=document.createElement("div");
            product.classList.add("product");
            productsDiv.appendChild(product);

            //Create a new image
            const image=document.createElement("img");
            image.classList.add("product_image");
            image.src = response.data[i].thumbnail;
            product.appendChild(image);

            //Create a new div to store inside it the description of the product
            const productDesc=document.createElement("div");
            productDesc.classList.add("product_desc");
            product.appendChild(productDesc);

            const h4=document.createElement("h4");
            h4.innerText=response.data[i].name;

            const span=document.createElement("span");
            span.innerText=response.data[i].price;

            productDesc.appendChild(h4);
            productDesc.appendChild(span);

            product.setAttribute("productID", response.data[i].id);
            product.addEventListener("click", openProduct)
        }
    });
}

const getSellerProducts = (sellerID) => {
    productsDiv.innerHTML = "";

    axios.get(getRandProductsBySellerAPI + sellerID)
    .then(response =>  {
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            //Create a new div to store data in it
            const product=document.createElement("div");
            product.classList.add("product");
            productsDiv.appendChild(product);
            
            //Create a new image
            const image=document.createElement("img");
            image.classList.add("product_image");
            image.src = response.data[i].thumbnail;
            product.appendChild(image);

            //Create a new div inside the main one to add the product description
            const productDesc=document.createElement("div");
            productDesc.classList.add("product_desc");
            product.appendChild(productDesc);

            const h4=document.createElement("h4");
            h4.innerText=response.data[i].name;

            const span=document.createElement("span");
            span.innerText=response.data[i].price;

            productDesc.appendChild(h4);
            productDesc.appendChild(span);

            product.setAttribute("productID", response.data[i].id);
            product.addEventListener("click", openProduct)
        }
    })
    .catch((e)=>{
        //Get error
        console.log(e);
    })
}

const openProduct = (event) => {
    productModal.style.display = "block";
    sellerID = event.currentTarget.getAttribute('productID');

    axios.get(getProductAPI + sellerID)
    .then(response => {
         
        //Make a clone of the tweet model
        let originalModal = document.getElementById("product_modal");
        let clone = originalModal.cloneNode(true);
        clone.style.display ="block";
        clone.id= response.data.id;
        clone.classList.add("modal");

        //Get the tweet text and modify on it
        let productName = clone.querySelector(".product_name");
        productName.textContent = response.data.name;

        //Get username
        let description = clone.querySelector(".product_description");
        description.textContent = response.data.description;

        //Get name
        let price = clone.querySelector(".price");
        price.textContent = response.data.price;

        //Get the image if avaiable and show it
        let image = clone.querySelector(".modalproduct_image");
        if(response.data.image == null){
            image.src = "images/empty.png"
        }
        else{
            image.src = "data:image/png;base64," + response.data.image;
        }
        
        //Get likes
        // let likes = clone.querySelector(".likes_number");
        // likes.textContent = data.likes_count;
        // likes.id = data.id;

        //Get like buttons, and save the product id
        let likeButton = clone.querySelector(".like_button");
        likeButton.setAttribute('data', response.data.id);

        //Check if the post is liked or not
        axios.get(likedProductAPI + "&product_id=" + response.data.id, config)
        .then(response =>{

            //Save the result of the product is liked or not, change the button accordingly
            likeButton.setAttribute('isLiked', response.data);
            likeButton.querySelector("#like_image").src = data ? "images/redheart.png" : "images/heart.png";

            //When like button is clicked, send a request to the server
            likeButton.addEventListener('click', (event) => {
                let productID = event.currentTarget.getAttribute('data');
                let isLiked = event.currentTarget.getAttribute('isLiked') === "true";
                const productAPI = isLiked ? unlikeAPI : likeAPI;

                //Send data to the server using axios
                axios.get(productAPI  + "&product_id=" +  productID, config)
                .then(response =>  {
                    //Change the number of likes on like/unlike
                    // likes.textContent = isLiked? parseInt(likes.textContent) -1 : parseInt(likes.textContent) + 1;

                    //Change button image on click
                    likeButton.setAttribute('isLiked', !isLiked);
                    likeButton.querySelector("#like_image").src = isLiked ? "images/heart.png" : "images/redheart.png";
                })
            });
        }
        )

        //Get favorite buttons, and save the product id
        let favoriteButton = clone.querySelector(".fav_button");
        favoriteButton.setAttribute('data', response.data.id);

        //Check if the post is favored or not
        axios.get(isFavoredAPI + "&product_id=" + response.data.id, config)
        .then(response =>{

            //Save the result of the product is favored or not, change the button accordingly
            favoriteButton.setAttribute('isFavored', response.data);
            favoriteButton.querySelector("#fav_image").src = data ? "images/yellowstar" : "images/star.png";

            //When favorite button is clicked, send a request to the server
            favoriteButton.addEventListener('click', (event) => {
                let productID = event.currentTarget.getAttribute('data');
                let isFavored = event.currentTarget.getAttribute('isFavored') === "true";
                const wishListAPI = isFavored ? rmFromWishlistAPI : addToWishlistAPI;

                //Send data to the server using axios
                axios(wishListAPI + "&product_id=" + productID, config)
                .then(response =>  {
                    //Change button image on click
                    favoriteButton.setAttribute('isFavored', !isFavored);
                    favoriteButton.querySelector("#fav_image").src = isFavored ? "images/star.png" : "images/yellowstar.png";
                })
            });
        }
        )

        //Get favorite buttons, and save the product id
        let cartButton = clone.querySelector(".cart_button");
        cartButton.setAttribute('data', response.data.id);

        //When favorite button is clicked, send a request to the server
        cartButton.addEventListener('click', (event) => {
            let productID = event.currentTarget.getAttribute('data');

            //Send data to the server using axios
            axios(addToCartAPI + "&product_id=" + productID, config)
            .then(response =>  {
                //Change button image on click
                console.log("hi")
                
            })
        });

        //Add div after the original tweet
        originalModal.before(clone);
        originalModal.style.display = "none";

        window.onclick = function(event) {
            if (event.target == clone) {
                clone.style.display = "none";
            }
        }
        }
    )
}

window.onclick = function(event) {
    if (event.target == productModal) {
        productModal.style.display = "none";
    }
}

const loadPage=()=>{
    getSellers();
    getRandomProducts();
}
window.addEventListener("load",loadPage);