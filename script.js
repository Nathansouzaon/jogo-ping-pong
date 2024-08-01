const canvas = document.getElementById("canvas");
const contexto = canvas.getContext("2d");
let maiorPonto = document.querySelector(".maiorPonto");
let menorPontoVerde = document.querySelector(".menorPontoVerde");
let menorPontoAzul = document.querySelector(".menorPontoAzul");
let iniciarJogos = document.querySelector(".iniciar");
let fimDejogo = document.querySelector(".gameover");
let ganhou = document.querySelector(".ganhou");
let avisos = document.querySelector(".obs");
let highScoreVerde =  localStorage.getItem("pontosVerde") || 0;
maiorPonto.innerHTML = `Maior ponto do jogador verde: ${highScoreVerde}`;
let highScoreAzul = localStorage.getItem("pontosAzul") || 0;
maiorPonto.innerHTML =  `Maior ponto do jogador Azul: ${highScoreAzul}`;
let raf;
let rafPoder;
let score = 0;
let scoreAzul = 0;
let aviso = 1;


//poder
const tiros = [];
const tirosAzul = [];
const atira = (x, y) => {
    let tiro = {
        x:x,
        y:y,
        largura:10,
        altura:5,
        velocidadeX:5,
        cor: "red",
        direcaoX: 1, //positivo para direita
    }
    //depois de criar o tiro add no meu array
    tiros.push(tiro);
}
const atiraAzul = (x, y) => {
    let tiroAzul = {
        x:x,
        y:y,
        largura:10,
        altura:5,
        velocidadeX:5,
        cor: "red",
        direcaoX: -1, //- para esquerda 
    }
    //depois de criar o tiro add no meu array
    tirosAzul.push(tiroAzul);
}

const controleDoTiro = () => {
    for (let index = tiros.length - 1; index >= 0; index--) {
        let tiro = tiros[index];

        tiro.x += tiro.velocidadeX * tiro.direcaoX;

        if(tiro.x < 0 || tiro.x > canvas.width){
            tiros.splice(index, 1);
            continue;
        }

        const posicaoX = tiro.x - bolaDoPong.x;
        const posicaoY = tiro.y - bolaDoPong.y;
        const distancia = Math.sqrt(posicaoX * posicaoX + posicaoY* posicaoY);

        if(distancia <  bolaDoPong.radius && tiro.x === bolaDoPong.x){
            tiros.splice(index, 1);
            bolaDoPong.vx = -bolaDoPong.vx;
            bolaDoPong.vy = -bolaDoPong.vy;

            
            tiro.direcaoX *= 1
 
            score += 5;
        }
        
    }
}
const controleDoTiroAzul = () => {
    for (let index = tirosAzul.length - 1; index >= 0; index--) {
        let tiro = tirosAzul[index];

        tiro.x +=tiro.velocidadeX * tiro.direcaoX;

        if(tiro.x < 0 || tiro.x > canvas.width){
            tirosAzul.splice(index, 1);
            continue;
        }

        const posicaoX = tiro.x - bolaDoPong.x;
        const posicaoY = tiro.y - bolaDoPong.y; 
        const distancia = Math.sqrt(posicaoX * posicaoX + posicaoY * posicaoY);

        if(distancia < bolaDoPong.radius && tiro.x === bolaDoPong.x){
            tirosAzul.splice(index, 1);
            bolaDoPong.vx = -bolaDoPong.vx;//alterando a velocidade da bola ou direcionamento quando um tiro acerta
            bolaDoPong.vy = -bolaDoPong.vy;


            tiro.direcaoX *= -1;
           scoreAzul += 5;
        }

    }

 
}


const objetoItem = {
    posicaoX: Math.floor(Math.random() * canvas.width),
    posicaoY: 0,
    larguraItem: 30,
    alturaItem: 30,
    velocidadeX: 0,
    velocidadeY: 0,
    gravidade: 0.5,
    colorItem: "red",
    desenharItem(){
        contexto.clearRect(this.posicaoX, this.posicaoY, this.larguraItem, this.alturaItem);
        contexto.fillRect(this.posicaoX, this.posicaoY, this.larguraItem, this.alturaItem);
        contexto.fillStyle = this.colorItem;
        contexto.fill();
    },
    reposicionar(){
        this.posicaoX = Math.floor(Math.random() * (canvas.width - this.larguraItem));
        this.posicaoY = 0;
        this.velocidadeY = 0; // Reiniciar a velocidade
      
    }
};
 





const personagemPong = {
    x: 10,
    y: 50,
    vy: 10,
    larguraPong: 30,
    alturaPong:160,
    colorOne: "blue",
    desenhar(){
       contexto.clearRect(this.x, this.y, this.larguraPong, this.alturaPong);
       contexto.fillRect(this.x, this.y, this.larguraPong, this.alturaPong);
       contexto.fillStyle = this.colorOne;
       contexto.fill();
    }
}


const personagemPongSegundoPlayer = {
    x: 1255,
    y: 50,
    vy: 10,
    larguraPongs: 30,
    alturaPongs:160,
    color:'red',
    desenhar(){
       contexto.clearRect(this.x, this.y, this.larguraPongs, this.alturaPongs);
       contexto.fillRect(this.x, this.y, this.larguraPongs, this.alturaPongs);
       contexto.fillStyle = this.color;
       contexto.fill()
    }
}


const bolaDoPong = {
    x:150,
    y:120,
    radius:25,//tamanho do circulo
    colors: "green",
    vx:5,
    vy:2,
    desenharBola(){
        contexto.beginPath();
        contexto.arc(this.x, this.y,this.radius,0,2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = this.colors;
        contexto.fill();
    }
}

// const atirar = {
//     posicaoX: 50,
//     posicaoY: 60,
//     larguraItem: 30,
//     alturaItem: 30,
//     velocidadeX: 200,
//     velocidadeY: 10,
//     gravidade: 0.5,
//     colorItem: "red",
//     desenharPoder(){
//         contexto.clearRect(this.posicaoX, this.posicaoY, this.larguraItem, this.alturaItem);
//         contexto.fillRect(this.posicaoX, this.posicaoY, this.larguraItem, this.alturaItem);
//         contexto.fillStyle = this.colorItem;
//         contexto.fill();
//     },

// };

 

// const atira = (x, y) => {
//     let criarDiv = document.createElement("div");
//     criarDiv.className = "tiroJogo";
//     criarDiv.style.top = y + "px";
//     criarDiv.style.left = x + "px";
//     criarDiv.style.position = "absolute"; // Adicione isso para garantir que o estilo funcione
//     criarDiv.style.width = "10px"; // Defina a largura do tiro
//     criarDiv.style.height = "5px"; // Defina a altura do tiro
//     criarDiv.style.backgroundColor = "red"; // Adicione uma cor para visualização
//     document.body.appendChild(criarDiv);
// }




// const controleDotiro = () => {
//     let tiros = document.getElementsByClassName('tiroJogo');//Obtém todos os elementos com a classe tiroJogo.
//     let tamanho = tiros.length;

//     for (let index = 0; index < tamanho; index++) {
//         if (tiros[index]) {
//             let tiro = tiros[index];
//             let posicaoX = parseFloat(tiro.style.left || 0);
//             posicaoX += velocidadeTiro; // Move o tiro para a direita Atualiza a posição horizontal de cada tiro com base na velocidadeTiro.
//             tiro.style.left = posicaoX + "px";

//               if (posicaoX >= bolaDoPong.x + bolaDoPong.vx){
//                  bolaDoPong.x = -bolaDoPong.x
//             }
            
         

//             if (posicaoX + velocidadeTiro > canvas.width) { // Verifica se o tiro saiu da tela
//                 tiro.remove();//Remove o tiro se ele sair da tela (window.innerWidth).
//             }
//         }
//     }
// }


const poderPersonagemOne = (e) => {
    if(e.keyCode === 69){
        atira(personagemPong.x + 50, personagemPong.y + 90)// cria um tiro na posição do personagem.
    } 
    
}
const poderPersonagemTwo = (e) => {
    if(e.keyCode === 37){
        atiraAzul(personagemPongSegundoPlayer.x  -80, personagemPongSegundoPlayer.y + 90)// cria um tiro na posição do personagem.
    } 
    
}

const moverPersonagem = (e) => {
    
    if(e.keyCode === 40){
        personagemPongSegundoPlayer.y += personagemPongSegundoPlayer.vy;
    }else if(e.keyCode === 38){
        personagemPongSegundoPlayer.y -= personagemPongSegundoPlayer.vy;
    }
    
    
 
}
const moverPersonagemTwo = (e) => {
    if(e.keyCode === 83){
        personagemPong.y += personagemPong.vy
    }else if(e.keyCode === 87){
        personagemPong.y -= personagemPong.vy
    } 
}
 
const objetosAleatorios = () => {
       
                            // Atualiza a posição do objeto com base na gravidade
                objetoItem.velocidadeY += objetoItem.gravidade;
                objetoItem.posicaoY += objetoItem.velocidadeY;
                
                
                if(objetoItem.posicaoY + objetoItem.alturaItem > canvas.height){
                    objetoItem.posicaoY = canvas.height - objetoItem.alturaItem
                   
                } 
                    objetoItem.desenharItem()  
  
}

// const poderPersonagemVerde = (e) => {
 
//     if(e.keyCode === 69){
//      // Verifique se o objeto ainda não atingiu a parte inferior da tela
//      if(objetoItem.posicaoY < canvas.height - objetoItem.alturaItem){
//          // Aumente a posição Y do objeto para fazê-lo descer
//         objetoItem.posicaoY += objetoItem.velocidadeY;

//         objetoItem.desenharItem(objetoItem.posicaoY);
//     }
//     }else if(e.keyCode === 82){
//         // Verifique se o objeto ainda não atingiu a parte inferior da tela
//         if(objetoItem.posicaoY < canvas.height - objetoItem.alturaItem){
//             // Aumente a posição Y do objeto para fazê-lo descer
//            objetoItem.posicaoY -= objetoItem.velocidadeY;
//            objetoItem.desenharItem(objetoItem.posicaoY);
//        }
//        }
//     rafPoder = window.requestAnimationFrame(poderPersonagemVerde)
// }

//

const iniciarGame = () => {
    // Limpa o canvas e desenha o fundo
    contexto.fillStyle = "rgb(187 241 255 / 22%)";
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    // Verifica condição de vitória e reinicia o jogo
    if (score === 100) {
        fimDejogo.innerHTML = `Fim De Jogo Jogador Verde Venceu jogo Reniciando....`;
        fimDejogo.style.color = "green";
        setTimeout(() => window.location.reload(true), 400);
    } else if (scoreAzul === 100) {
        fimDejogo.innerHTML = `Fim De Jogo Jogador Azul Venceu jogo Reniciando....`;
        fimDejogo.style.color = "blue";
        setTimeout(() => window.location.reload(true), 400);
    }

    // // Atualiza a posição da bola com base na pontuação
    // if (score % 20 === 0) {
    //     bolaDoPong.x += bolaDoPong.vx + 3.0;
    //     bolaDoPong.y += bolaDoPong.vy + 3.0;
    // }

    // Atualiza e desenha os objetos do jogo
    bolaDoPong.desenharBola();
    personagemPong.desenhar();
    personagemPongSegundoPlayer.desenhar();

//   objetosAleatorios()
   
        // Atualiza a posição da bola
    bolaDoPong.x += bolaDoPong.vx;
    bolaDoPong.y += bolaDoPong.vy;
 
    

        for(let tiro of tiros){
            contexto.fillStyle = tiro.cor;
            contexto.fillRect(tiro.x, tiro.y, tiro.largura, tiro.altura);
        }
        for(let tiroAzul of tirosAzul){
            contexto.fillStyle = tiroAzul.cor;
            contexto.fillRect(tiroAzul.x, tiroAzul.y, tiroAzul.largura, tiroAzul.altura);
        }
        

    // Verifica colisão com os personagens
    if (bolaDoPong.x + bolaDoPong.vx + bolaDoPong.radius > personagemPong.x &&
        bolaDoPong.x + bolaDoPong.vx < personagemPong.x + personagemPong.larguraPong + bolaDoPong.radius &&
        bolaDoPong.y > personagemPong.y &&
        bolaDoPong.y < personagemPong.y + personagemPong.alturaPong - bolaDoPong.radius) {
        score += 10;
        highScoreVerde = Math.max(score, highScoreVerde);
        localStorage.setItem("pontosVerde", highScoreVerde);
        localStorage.setItem("score", score);
        menorPontoVerde.innerHTML = `Score do jogador verde: ${score}`;
        bolaDoPong.vx = -bolaDoPong.vx;
    }

    if (bolaDoPong.x + bolaDoPong.vx + bolaDoPong.radius > personagemPongSegundoPlayer.x &&
        bolaDoPong.x + bolaDoPong.vx < personagemPongSegundoPlayer.x + personagemPongSegundoPlayer.larguraPongs &&
        bolaDoPong.y > personagemPongSegundoPlayer.y &&
        bolaDoPong.y < personagemPongSegundoPlayer.y + personagemPongSegundoPlayer.alturaPongs) {
        scoreAzul += 10;
        highScoreAzul = Math.max(scoreAzul, highScoreAzul);
        localStorage.setItem("pontosAzul", highScoreAzul);
        menorPontoAzul.innerHTML = `Score do jogador azul: ${scoreAzul}`;
        bolaDoPong.vx = -bolaDoPong.vx;
    }

    // Verifica colisão com as bordas do canvas
    if (bolaDoPong.y + bolaDoPong.vy + bolaDoPong.radius > canvas.height || bolaDoPong.y + bolaDoPong.vy < bolaDoPong.radius) {
        bolaDoPong.vy = -bolaDoPong.vy;
    }

    if (bolaDoPong.x + bolaDoPong.vx > canvas.width - bolaDoPong.radius || bolaDoPong.x + bolaDoPong.vx < bolaDoPong.radius) {
        bolaDoPong.vx = -bolaDoPong.vx;
    }

    if(score === 20  || score === 40 || score === 60 || score === 80 || score === 90){
        bolaDoPong.x += bolaDoPong.vx + 2
    }else if(scoreAzul === 20  || scoreAzul === 40 || scoreAzul === 60 || scoreAzul === 80 || scoreAzul === 90){
        bolaDoPong.x += bolaDoPong.vx + 2
    }

     


    // Verifica se o jogo acabou
    if (bolaDoPong.x + bolaDoPong.vx > canvas.width || bolaDoPong.x + bolaDoPong.vx > personagemPongSegundoPlayer.x) {
        fimDejogo.innerHTML = `Fim De Jogo Jogador Azul Perdeu`;
        fimDejogo.style.color = "red";
        setTimeout(() => window.location.reload(true), 1000);
    }else if (personagemPong.x > bolaDoPong.x + bolaDoPong.vx - bolaDoPong.radius) {
        fimDejogo.innerHTML = `Fim De Jogo Jogador Verde Perdeu`;
        fimDejogo.style.color = "red";
        setTimeout(() => window.location.reload(true), 1000);
    }

    // Solicita o próximo frame
    raf = window.requestAnimationFrame(iniciarGame);
}

//  setInterval(() => {
//     objetoItem.reposicionar();
// }, 3000);

    canvas.addEventListener("click", (e) => {
 
        raf = window.requestAnimationFrame(iniciarGame);
       
    });

    
 // Adiciona o evento para a tecla
 document.addEventListener('keydown', (e) => {
    poderPersonagemOne(e)
 });//Adiciona um listener para o evento keydown para que poderPersonagemOne seja chamado quando uma tecla é pressionada.
 // Adiciona o evento para a tecla
 document.addEventListener('keydown', (e) => {
    poderPersonagemTwo(e)
 });//Adiciona um listener para o evento keydown para que poderPersonagemOne seja chamado quando uma tecla é pressionada.

 //  // Configura a velocidade do tiro (ajuste conforme necessário)
 //  const velocidadeTiro = 5;
  
  //Usa setInterval para chamar controleDotiro regularmente, atualizando a posição dos tiros a cada frame (60 fps).
  // Você pode precisar de uma função para atualizar os tiros a cada frame
  setInterval(controleDoTiro, 1000 / 60); // Atualiza a cada 60 fps
  
  //Usa setInterval para chamar controleDotiro regularmente, atualizando a posição dos tiros a cada frame (60 fps).
  // Você pode precisar de uma função para atualizar os tiros a cada frame
  setInterval(controleDoTiroAzul, 1000 / 60); // Atualiza a cada 60 fps
  

// document.addEventListener("keydown", (e) => {
//     poderPersonagemVerde(e)
    
// })
document.addEventListener("keydown", (e) => {
    
    moverPersonagem(e)
})
document.addEventListener("keydown", (e) => {
    
    moverPersonagemTwo(e)
})





bolaDoPong.desenharBola();
personagemPong.desenhar();
personagemPongSegundoPlayer.desenhar();
 
