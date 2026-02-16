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
            <div class="card bg-base-100 shadow-sm py-8">
                        <figure>
                          <img
                            src=${image}
                            alt="Shoes"
                            class="w-70 h-50" />
                        </figure>
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <div class="badge badge-soft badge-primary">${category}</div>
                                <div class="flex items-center justify-between gap-2">
                                    <div class="rating rating-sm">
                                        <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400" aria-label="2 star" checked="checked" />
                                      </div>
                                      <p>${rating.rate} (${rating.count})</p>
                                </div>
                            </div>
                          <p class="text-base font-semibold">${title}</p>
                          <p class="text-base font-semibold">$${price}</p>
                          <div class="flex items-center justify-between gap-4 pt-4">
                            <button onClick="cardDetailed(${id})" class="btn"> <i class="fas fa-shopping-cart"></i> Details</button>
                            <button class="btn"> <i class="fas fa-shopping-cart"></i> Add</button>
                          </div>
                        </div>
                      </div>`;
      cardContainer.append(div);
    });
  }
};

const displayButton = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const buttonData = await res.json();

  const buttonContainer = document.getElementById("btn-container");
  buttonContainer.innerHTML = "";

    buttonData.forEach((button) => {
        const btn = document.createElement("div");
        btn.className = "btn rounded-full";
        btn.innerText = button;

        btn.addEventListener("click", () => {
            displayButtonCard(button)
        })

        buttonContainer.append(btn);
    })
};

const displayButtonCard = async(data) => {
    
    const res = await fetch(`https://fakestoreapi.com/products/category/${data}`);
    const categoryProductsData = await res.json();
    
    
    const btnCardContainer = document.getElementById("btn-card-section");
    btnCardContainer.innerHTML = ""

    categoryProductsData.forEach((product) => {
        const { id, title, price, description, category, image, rating } = product;
        const div = document.createElement("div");
        div.innerHTML= `
        <div class="card bg-base-100 shadow-sm py-8">
                            <figure>
                              <img
                                src=${image}
                                alt="Shoes"
                                class="w-70 h-50" />
                            </figure>
                            <div class="card-body">
                                <div class="flex items-center justify-between">
                                    <div class="badge badge-soft badge-primary">${category}</div>
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="rating rating-sm">
                                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400" aria-label="2 star" checked="checked" />
                                          </div>
                                          <p>${rating.rate} (${rating.count})</p>
                                    </div>
                                </div>
                              <p class="text-base font-semibold">${title}</p>
                              <p class="text-base font-semibold">$${price}</p>
                              <div class="flex items-center justify-between gap-4 pt-4">
                                <button onClick="cardDetailed(${id})" class="btn"> <i class="fas fa-shopping-cart"></i>Details</button>
                                <button class="btn"> <i class="fas fa-shopping-cart"></i> Add</button>
                              </div>
                            </div>
                          </div>
        `
        btnCardContainer.append(div)
    })
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
     <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
   </form>
                            <figure>
                              <img
                                src=${image}
                                alt="Shoes"
                                class="w-70 h-50" />
                            </figure>
                            <div class="card-body">
                                <div class="flex items-center justify-between">
                                    <div class="badge badge-soft badge-primary">${category}</div>
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