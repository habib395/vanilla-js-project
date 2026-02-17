

const showHome = () => {
    document.getElementById("home-section").classList.remove("hidden");
    document.getElementById("product-section").classList.add("hidden");
};


const showProduct = () => {
    document.getElementById("home-section").classList.add("hidden");
    document.getElementById("product-section").classList.remove("hidden")
};


const displayProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const productsData = await res.json();

  const cardContainer = document.getElementById("card-container");

  if (productsData.length === 0) {
    cardContainer.innerHTML = `
        <div class="min-h-[500px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="./assets/error.png" />
        <h2 class="text-center text-xl font-bold">No Product are show.</h2>
        </div>
        `;
    return;
  } else {
    const topThreeProducts = productsData
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 3);

    topThreeProducts.forEach((product) => {
      const { id, title, price, description, category, image, rating } = product;
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card bg-base-100 shadow-sm py-6 h-full flex flex-col">
    
        <figure class="h-44 flex items-center justify-center">
          <img
            src="${image}"
            alt="product"
            class="h-full object-contain" />
        </figure>
    
        <div class="card-body flex flex-col flex-grow">
    
          <div class="flex items-center justify-between">
            <div class="badge badge-soft badge-primary text-xs">
              ${category}
            </div>
            <div class="flex items-center gap-2">
              <div class="rating rating-sm">
                <input
                  type="radio"
                  class="mask mask-star-2 bg-orange-400"
                  checked />
              </div>
              <p class="text-sm">${rating.rate} (${rating.count})</p>
            </div>
          </div>
    
          <p class="text-base font-semibold line-clamp-2">
            ${title}
          </p>
    
          <p class="text-base font-semibold">
            $${price}
          </p>
    
          <div class="flex items-center justify-between gap-4 pt-4 mt-auto">
            <button
              class="btn btn-xs sm:btn-sm">
              Details
            </button>
            <button class="btn btn-xs sm:btn-sm">
              Add
            </button>
          </div>
    
        </div>
      </div>
    `;
    
      cardContainer.append(div);
    });
  }
};
displayProducts();

const displayButton = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const buttonData = await res.json();
  
    const buttonContainer = document.getElementById("btn-container");
    buttonContainer.innerHTML = "";
  
    const allBtn = document.createElement("button");
    allBtn.className = "btn rounded-full active";
    allBtn.innerText = "All";
  
    allBtn.addEventListener("click", () => {
      removeActive();
      allBtn.classList.add("active");
      displayButtonCard("all");
    });
  
    buttonContainer.append(allBtn);
  
    buttonData.forEach((category) => {
      const button = document.createElement("button");
      button.className = "btn rounded-full";
      button.innerText = category;
  
      button.addEventListener("click", () => {
        removeActive();
        button.classList.add("active");
        displayButtonCard(category);
      });
  
      buttonContainer.append(button);
    });
  };
  
  const removeActive = () => {
    document
      .querySelectorAll("#btn-container button")
      .forEach(btn => btn.classList.remove("active"));
  };
  

const displayButtonCard = async (data = "all") => {

    let url = "";
  
    if (data === "all") {
      url = "https://fakestoreapi.com/products";
    } else {
      url = `https://fakestoreapi.com/products/category/${data}`;
    }
  
    const res = await fetch(url);
    const products = await res.json();
  
    const btnCardContainer = document.getElementById("btn-card-section");
    btnCardContainer.innerHTML = "";
  
    products.forEach((product) => {
      const { id, title, price, category, image, rating } = product;
  
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card bg-base-100 shadow-sm py-6 h-full flex flex-col">
  
          <figure class="h-44 flex items-center justify-center">
            <img src="${image}" class="h-full object-contain" />
          </figure>
  
          <div class="card-body flex flex-col flex-grow">
  
            <div class="flex items-center justify-between gap-2">
              <div class="sm:badge badge-soft badge-primary">${category}</div>
              <p class="text-sm">${rating.rate} (${rating.count})</p>
            </div>
  
            <p class="text-base font-semibold line-clamp-2">${title}</p>
            <p class="text-base font-semibold">$${price}</p>
  
            <div class="flex gap-3 pt-4 mt-auto">
              <button onClick="cardDetailed(${id})" class="btn btn-xs sm:btn-sm">
                Details
              </button>
              <button class="btn btn-xs sm:btn-sm active">
                Add
              </button>
            </div>
  
          </div>
        </div>
      `;
  
      btnCardContainer.append(div);
    });
  };
  

const cardDetailed = async(id) => {

    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const cardDetailData = await res.json();
    const { title, price, description, category, image, rating } = cardDetailData;

    const cardDetailModal = document.getElementById('card-modal');
    cardDetailModal.innerHTML = `
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
  <div class="card bg-base-100 shadow-sm py-8">
  <form method="dialog">
     <button class="btn btn-sm btn-circle btn-ghost absolute top-1 right-1 sm:right-2 sm:top-2">✕</button>
   </form>
                            <figure>
                              <img
                                src=${image}
                                alt="Shoes"
                                class="w-70 h-50" />
                            </figure>
                            <div class="card-body">
                                <div class="flex items-center justify-between">
                                <div class="badge  badge-soft badge-primary">${category}</div>
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="rating rating-sm">
                                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400" aria-label="2 star" checked="checked" />
                                          </div>
                                          <p>${rating.rate} (${rating.count})</p>
                                    </div>
                                </div>
                              <p class="text-base font-semibold">${title}</p>
                              <p class="text-base font-semibold">$${price}</p>
                              <p class="text-base font-semibold">${description}</p>
                              <div class="flex items-center justify-between gap-4 pt-4">
                                <button class="btn"> <i class="fas fa-shopping-cart"></i> Add to cart</button>
                              </div>
                            </div>
                          </div>

    <div class="modal-action">
    </div>
  </div>
</dialog>
    `
    my_modal_1.showModal();
};

displayButton();
displayButtonCard("all");
