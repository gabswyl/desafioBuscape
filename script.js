// Menu 

const menu = document.querySelector('.menu')
const menuDrop = document.querySelector('.menu_dropdown')

menu.addEventListener('click', (e) => {
    e.preventDefault(); 
    menuDrop.classList.toggle('ativo')

})


// Produtos Dinâmicos 

let products = [
    {
        id: 0,
        nome: "Refrigerador Brastemp Inverse BRE50NK 422 Litros Inox",
        parcela: 6,
        precoParcela: 499.83,
        precoVista: 2699.30,
        imgPrincipal: "./assets/slide1.webp", 
        img2: "./assets/slide2.webp",
        img3: "./assets/slide3.webp",
        img4: "./assets/slide4.webp",
    },
    
    {
        id: 1, 
        nome: "Smart TV Samsung Série 4 UN32T4300AG 32 polegadas LED Plana", 
        parcela: 10,
        precoParcela: 366.53,
        precoVista: 3199.00,
        imgPrincipal: "./assets/slidetv1.png", 
        img2: "./assets/slidetv2.png",
        img3: "./assets/slidetv3.png",
        img4: "./assets/slidetv4.png",
    },
    
    {
        id: 2,
        nome: "SmartPhone Apple Iphone 14 Pro Max 128GB",
        parcela: 10,
        precoParcela: 134.11,
        precoVista: 1139.90,
        imgPrincipal: "./assets/slideapple1.jpg", 
        img2: "./assets/slideapple2.jpg",
        img3: "./assets/slideapple3.jpg",
        img4: "./assets/slideapple4.jpg",
    }
]

listaProdutos = () => {
    const localProdutos = document.querySelector(".listaProdutos")
    products.map((item) => {
        localProdutos.innerHTML += `
        <div class="produtos">
         <div class="produtos_container">
        <div class="imgs">
        <img class="slide" src="${item.imgPrincipal}" alt="televisao">
        <img class="slide" src="${item.img2}" alt="televisao">
        <img class="slide" src="${item.img3}" alt="televisao">
        <img class="slide" src="${item.img4}" alt="televisao">
        </div>
        
        <img class="main_slide" src="${item.imgPrincipal}" alt="televisao">
        
        <div class="desc">
        <div><p class="titulo">${item.nome}<button class="favorito"><img class="favorito" src="./assets/favorito.svg"></button></p></div>
        <div class="best_price">Melhor Preço</div>
        <div class="paragrafo"><p class="parcela">${item.parcela}x R$ ${item.precoParcela}<button class="addCarrinho">Adicionar ao carrinho <img class="arrow" src="./assets/seta direita.svg"></button></p></div>
        <div class="precoVista">
           ou <b>R$ ${item.precoVista}</b> à vista</div>
        </div>
        
        </div>
        </div> 
        
        `
    })
}

listaProdutos(); 

// Galeria de Imagens

const produtosContainers = document.querySelectorAll('.produtos');

produtosContainers.forEach((container) => {
    const imgs = container.querySelectorAll(".imgs img");
    const imgPrincipal = container.querySelector(".main_slide");

    imgs.forEach((item) => {
        item.addEventListener("click", (e) => {
            const targetSrc = e.target.src;
            imgPrincipal.src = targetSrc;

            imgs.forEach((img) => {
                img.classList.remove("ativo");
            })

            e.target.classList.add("ativo");
        });
    });
});


// Carrinho de Compras 

function carrinhoCompras() {
    const carrinho = document.querySelectorAll(".addCarrinho")

    carrinho.forEach((item) => {
        item.addEventListener('click', (e) => {
            const selecionar = e.target
            const info = selecionar.closest('.produtos_container')
            const img = info.querySelector(".main_slide")
            const imgSrc = img.src

            const titulos = info.querySelector(".titulo").textContent
            const precoParcelinha = info.querySelector('.parcela').textContent
            const precoVistinha = info.querySelector(".precoVista").textContent


            const menuContainer = document.querySelector(".teste")

            menuContainer.innerHTML += `
        <div class="menu_container">
         <div>
            <img class="img_dropdown" src="${imgSrc}">
         </div>

         <div class="desc_dropdown">
            <div class="title_text">
                <p class="desc_text">${titulos}</p>
                <button class="fechar">
                <img src="./assets/close (3).svg">
                </button>
            </div>
            <p class="price_text1">${precoParcelinha.replace("Adicionar ao carrinho", "")}</p>
            <p class="price_text2">${precoVistinha}</p>
         </div>
        </div>
        
        `

            // remover produtos 
            const fechar = document.querySelectorAll(".fechar")
    
            fechar.forEach((item) => {
                item.addEventListener('click', () => {
                    const remover = item.closest(".menu_container")
                    remover.remove();
                })
            })

            // atualizar preco 

            const precoParcelasub = document.querySelectorAll('.price_text1')
            

            let total = 0; 
            precoParcelasub.forEach((item) => {
                const price = item.textContent.replace("6x", "").replace("R$", "").replace("10x", "")
                total += +price
            })

            const subTotalParcela = document.querySelector(".pagamento1")
            subTotalParcela.innerText = "10x " + "R$" + total.toFixed()


            const precoParcelaVista = document.querySelectorAll('.price_text2')
            

            let totalzin = 0; 
            precoParcelaVista.forEach((item) => {
                const priceParcela = item.textContent.replace("ou", "").replace("R$", "").replace("à vista", "")
                totalzin += +priceParcela
            })

            const subTotalVista = document.querySelector(".pagamento2")
            subTotalVista.innerText = "ou " + "R$" + totalzin.toFixed() + " à vista"


            // atualizar preço caso se o usuario remova o produto no carrinho 

            const close = document.querySelectorAll('.fechar')

            close.forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const parcela = parseFloat(e.currentTarget.closest(".menu_container").querySelector(".price_text1").innerText.replace("R$", "").replace("10x", "").replace("6x", "0"))
                    const vista = parseFloat(e.currentTarget.closest(".menu_container").querySelector(".price_text2").innerText.replace("R$", "").replace("ou", "").replace("à vista", "0"))
                    
        
                    const valorParcelaElement = document.querySelector(".pagamento1")
                    const valorVistaElement = document.querySelector(".pagamento2")
                    
                    let valorParcela = parseFloat(valorParcelaElement.innerText.replace("R$", " ").replace("10x", " "))
                    let valorVista = parseFloat(valorVistaElement.innerText.replace("ou R$", " "))
                    

                    valorParcela -= parcela
                    valorVista -= vista
            
                
                    valorParcelaElement.innerHTML = "10x R$" + valorParcela.toFixed();
                    valorVistaElement.innerHTML = "ou R$" + valorVista.toFixed();
                })
            })

        


        })

    })
}


carrinhoCompras(); 

