function drop(ev){
  ev.preventDefault();
  const pedraId_2 = ev.dataTransfer.getData("pedraId");
  const nPedra = document.getElementById(pedraId_2)
  if(nPedra.dataset.cor == 'red'
  && npedra.parentElement.dataset.linha-1 == ev.target.dataset.linha
  && (npedra.parentElement.dataset.coluna-1 == ev.target.dataset.coluna
  || npedra.parentElement.dataset.coluna == ev.target.dataset.coluna)
  || npedra.dataset.cor == 'black'
  && npedra.parentElement.dataset.linha == ev.targent.dataset.linha-1
  && (npedra.parentElement.dataset.coluna-1 == ev.targent.dataset.coluna
  || npedra.parentElement.dataset.coluna == ev.targent.dataset.coluna-1)) {
    npedra.parentElement.addEventListener('dragover',allowDrop)
    ev.target.appendChild(npedra);
    npedra.parentElement.removeElementListener('dragover', allowDrop)
    trocaVez()
    }
}

function trocaVez(){
  const allPawns = document.querySelectorAll('img');
  allPawns.forEach(pedra=>{
    pedra.draggable = !pedra.draggable;
  })
}

function drag(ev){
  ev.dataTransfer.setData('pedraId', ev.target.id);
}

function allowDrop(ev){
  ev.preventDefault();
}

function criaPedra(cor){
  let img = document.createElement('img');
  img.setAttribute('src',`${cor}.png`);
  img.setAttribute('widht',`${tamanhoCelula-4}px`);
  img.setAttribute('height',`${tamanhoCelula-4}px`);
  img.addEventListener('dragstart', drop);
  img.id = `pedra ${pedraId++}`;
  img.dataset.cor = cor
  return img;
}

//declaração de variaveis iniciais
const tamanhoCelula = 40;
let pedraId = 0;
document.body.append(tabuleiro())

//função principal
function tabuleiro(){
  const tab = document.createElement('table');
  tab.style.borderStyle = 'solid';
  tab.style.Color = 'dark green';
  tab.style.margin = 'auto';
  tab.style.borderSpacing = 0;
  for(let i = 0; i < 8 ; i++ ){
    const line = document.createElement('tr');
    tab.append(line);
    for(let j = 0; j< 8 ; j++){
      const cel = document.createElement('td');
      line.append(cel);
      cel.dataset.linha = i;
      cel.dataset.coluna = j;
      cel.style.width = `${tamanhoCelula}px`;
      cel.style.height =`${tamanhoCelula}px`;
      if(i%2 == j%2){
        cel.style.backgroundColor = 'green';
        cel.addEventListener('drop',drop);
        if(i*8 + j < 24){
          const pedra = criaPedra('black');
          cel.append(pedra);
          pedra.draggable = false;
        }
        else if(i*8 + j > 40){
          cel.append(criaPedra('red'));
        }
        else {
          cel.addEventListener('dragover', allowDrop);
        }
      }
      else{
        cel.style.backgroundColor = 'white';
      }
    }
  }
  return tab;
}
