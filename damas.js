function drop(ev){
  ev.preventDefault();
  const idPedra = ev.dataTransfer.getData('pedraId');
  const pedra = document.getElementById(idPedra);
  if(pedra.dataset.cor == 'red'
  && pedra.parentElement.dataset.lin-1 == ev.target.dataset.lin
  && (pedra.parentElement.dataset.col-1 == ev.target.dataset.col
  || pedra.parentElement.dataset.col == ev.target.dataset.col-1)
  || pedra.dataset.cor == 'black'
  && pedra.parentElement.dataset.lin == ev.targent.dataset.lin-1
  && (pedra.parentElement.dataset.col-1 == ev.targent.dataset.col
  || pedra.parentElement.dataset.col == ev.targent.dataset.col-1)) {
    pedra.parentElement.addEventListener('dragover', allowDrop)
    ev.target.appendChild(pedra);
    pedra.parentElement.removeElementListener('dragover', allowDrop)
    trocaVez()
    }
}

function trocaVez(){
  const allPawns = document.querySelectorAll('img');
  allPawns.forEach(pedra=>{
    pedra.draggable = !pedra.draggable
  })
}

function drag(ev){
  ev.dataTransfer.setData("pedraId", ev.target.id);
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
  img.id = `p${pedraId++}`;
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
  tab.style.borderColor = 'dark green';
  tab.style.margin = 'auto';
  tab.style.borderSpacing = 0;
  for(let i = 0; i < 8 ; i++ ){
    const line = document.createElement('tr');
    tab.append(line);
    for(let j = 0; j< 8 ; j++){
      const cel = document.createElement('td');
      line.append(cel);
      cel.dataset.lin = i;
      cel.dataset.col = j;
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
