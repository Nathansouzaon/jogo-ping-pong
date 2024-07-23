const canvas = document.getElementById("canvas");
const contexto = canvas.getContext("2d");
let maiorPonto = document.querySelector(".maiorPonto");
let menorPontoVerde = document.querySelector(".menorPontoVerde");
let menorPontoAzul = document.querySelector(".menorPontoAzul");
let iniciarJogos = document.querySelector(".iniciar");
let fimDejogo = document.querySelector(".gameover");
let highScoreVerde =  localStorage.getItem("pontosVerde") || 0;
maiorPonto.innerHTML = `Maior ponto do jogador verde: ${highScoreVerde}`;
let highScoreAzul = localStorage.getItem("pontosAzul") || 0;
maiorPonto.innerHTML =  `Maior ponto do jogador Azul: ${highScoreAzul}`;
let raf;
let rafPoder;
let score = 0;
let scoreAzul = 0;


 


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


//
const iniciarGame = () => {
    contexto.fillStyle = "rgb(187 241 255 / 22%)";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    


        if(highScoreVerde === 100){
            fimDejogo.innerHTML = `Fim De Jogo Jogador Verde Venceu jogo Reniciando....`
            fimDejogo.style.color = "green";
            fimDejogo.style.fontSize = "30px";
            fimDejogo.style.textAlign = "center";
            fimDejogo.style.backgroundColor = "black";
            fimDejogo.style.borderRadius = "20px";
            fimDejogo.style.width = "50%";
            fimDejogo.style.margin = "0 auto";
            fimDejogo.style.marginTop = "10px";
            fimDejogo.style.marginBottom = "10px"; 
            setTimeout(() => {
                window.location.reload(true)
            }, 400);
        }else if(highScoreAzul === 100) {
            fimDejogo.innerHTML = `Fim De Jogo Jogador Azul Venceu jogo Reniciando....`
            fimDejogo.style.color = "blue";
            fimDejogo.style.fontSize = "30px";
            fimDejogo.style.textAlign = "center";
            fimDejogo.style.backgroundColor = "black";
            fimDejogo.style.borderRadius = "20px";
            fimDejogo.style.width = "50%";
            fimDejogo.style.margin = "0 auto";
            fimDejogo.style.marginTop = "10px";
            fimDejogo.style.marginBottom = "10px"; 
            setTimeout(() => {
                window.location.reload(true)
            }, 400);
        }
        if(score === 20 || score === 40 || score ===  60 || score ===  80 || score ===  100){
            bolaDoPong.x += bolaDoPong.vx + 1.5;
            bolaDoPong.y += bolaDoPong.vy + 1.5;
          
        }else if(scoreAzul === 20 || scoreAzul === 40 || scoreAzul ===  60 || scoreAzul ===  80 || scoreAzul ===  100){
            bolaDoPong.x += bolaDoPong.vx + 1.5;
            bolaDoPong.y += bolaDoPong.vy + 1.5;
        }
      


 


  
    // contexto.clearRect(0, 0, canvas.width, canvas.height);
    bolaDoPong.desenharBola();
    personagemPong.desenhar();
    personagemPongSegundoPlayer.desenhar();
    bolaDoPong.x += bolaDoPong.vx;
    bolaDoPong.y += bolaDoPong.vy;
   
        
//     // Verifica se a bola saiu do lado direito do canvas
// if (bolaDoPong.x + bolaDoPong.vx > canvas.width) {
//     // Define a ação a ser tomada quando a bola sair do lado direito
//     // Por exemplo, resetar a posição da bola para o meio do canvas
//     bolaDoPong.x = contexto.canvas.width / 2;  // Posição horizontal central
//     bolaDoPong.y = contexto.canvas.height / 2; // Posição vertical central
//     bolaDoPong.vx = -bolaDoPong.vx; // Inverte a direção horizontal
// } enquanto meu personagemPong.x for menos que esses valores vai funcionar

if(bolaDoPong.x + bolaDoPong.vx + bolaDoPong.radius > personagemPong.x &&
    bolaDoPong.x + bolaDoPong.vx < personagemPong.x + personagemPong.larguraPong + bolaDoPong.radius &&
    bolaDoPong.y > personagemPong.y &&
    bolaDoPong.y < personagemPong.y + personagemPong.alturaPong - bolaDoPong.radius) {
    score += 10;
    highScoreVerde = score >= highScoreVerde ? score : highScoreVerde;
    localStorage.setItem("pontosVerde", highScoreVerde);
    menorPontoVerde.innerHTML = `Score do jogador verde: ${score}`
}


if (bolaDoPong.x + bolaDoPong.vx + bolaDoPong.radius > personagemPongSegundoPlayer.x &&
    bolaDoPong.x + bolaDoPong.vx < personagemPongSegundoPlayer.x + personagemPongSegundoPlayer.larguraPongs &&
    bolaDoPong.y > personagemPongSegundoPlayer.y &&
    bolaDoPong.y < personagemPongSegundoPlayer.y + personagemPongSegundoPlayer.alturaPongs) {
    scoreAzul += 10;
    highScoreAzul = scoreAzul >= highScoreAzul ? scoreAzul : highScoreAzul;
    localStorage.setItem("pontosAzul", highScoreAzul);
    menorPontoAzul.innerHTML = `Score do jogador azul: ${score}`
}
     // Verifica colisão com o segundo personagem       //p valor do personagemPongSegundoPlayer.x e maior do que esses bolaDoPong.x + bolaDoPong.vx + bolaDoPong.radius entao e verdade
     //estou somando a largura por que eu quero que tenha uma ação somente quando tiver colisao com a largura do obj
     if(bolaDoPong.x + bolaDoPong.vx + bolaDoPong.radius > personagemPong.x &&
        bolaDoPong.x + bolaDoPong.vx < personagemPong.x + personagemPong.larguraPong + bolaDoPong.radius &&
        bolaDoPong.y > personagemPong.y &&
        bolaDoPong.y < personagemPong.y + personagemPong.alturaPong - bolaDoPong.radius) {
        bolaDoPong.vx = -bolaDoPong.vx;
    }

 
      if (bolaDoPong.x + bolaDoPong.vx + bolaDoPong.radius > personagemPongSegundoPlayer.x &&
        bolaDoPong.x + bolaDoPong.vx < personagemPongSegundoPlayer.x + personagemPongSegundoPlayer.larguraPongs &&
        bolaDoPong.y > personagemPongSegundoPlayer.y &&
        bolaDoPong.y < personagemPongSegundoPlayer.y + personagemPongSegundoPlayer.alturaPongs) {
        bolaDoPong.vx = -bolaDoPong.vx; // Rebate a bola na direção oposta
    }



    // colisao do eixo x
    // if(bolaDoPong.x + bolaDoPong.vx > canvas.width - bolaDoPong.radius || bolaDoPong.x + bolaDoPong.vx < bolaDoPong.radius){
    //     bolaDoPong.vx = -bolaDoPong.vx;
    // }

    if(bolaDoPong.y + bolaDoPong.vy > canvas.height - bolaDoPong.radius || bolaDoPong.y + bolaDoPong.vy < bolaDoPong.radius){
        bolaDoPong.vy = -bolaDoPong.vy;
    }

    if(bolaDoPong.x + bolaDoPong.vx > personagemPongSegundoPlayer.x){
        fimDejogo.innerHTML = `Fim De Jogo Jogador Azul Perdeu`;
        fimDejogo.style.color = "red";
        fimDejogo.style.fontSize = "30px";
        fimDejogo.style.textAlign = "center";
        fimDejogo.style.backgroundColor = "black";
        fimDejogo.style.borderRadius = "20px";
        fimDejogo.style.width = "50%";
        fimDejogo.style.margin = "0 auto";
        fimDejogo.style.marginTop = "10px";
        fimDejogo.style.marginBottom = "10px";
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
    }

    if(bolaDoPong.x + bolaDoPong.vx < personagemPong.x){
       fimDejogo.innerHTML = `Fim De Jogo Jogador Verde Perdeu`
       fimDejogo.style.color = "red";
       fimDejogo.style.fontSize = "30px";
       fimDejogo.style.textAlign = "center";
       fimDejogo.style.backgroundColor = "black";
       fimDejogo.style.borderRadius = "20px";
       fimDejogo.style.width = "50%";
       fimDejogo.style.margin = "0 auto";
       fimDejogo.style.marginTop = "10px";
       fimDejogo.style.marginBottom = "10px";
       setTimeout(() => {
        window.location.reload(true)
    }, 1000);
    }

    
    raf = window.requestAnimationFrame(iniciarGame);
}
    canvas.addEventListener("click", (e) => {
        raf = window.requestAnimationFrame(iniciarGame);
    });

 

document.addEventListener("keydown", (e) => {
    
    moverPersonagem(e)
})
document.addEventListener("keydown", (e) => {
    
    moverPersonagemTwo(e)
})



 
bolaDoPong.desenharBola();
personagemPong.desenhar();
personagemPongSegundoPlayer.desenhar();
