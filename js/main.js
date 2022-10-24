const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");

const itens = JSON.parse(localStorage.getItem("itens")) || [];


console.log(itens);
	itens.forEach( (elemento) => {
		criaElemento(elemento);
	});

form.addEventListener("submit", (evento) => {
	evento.preventDefault();
	
	const nome = evento.target.elements['nome'];
	const quantidade = evento.target.elements['quantidade'];
	
	const existe = itens.find( elemento => elemento.nome === nome.value);
	
	itemAtual = {
		"nome" : nome.value,
		"quantidade" : quantidade.value
	};
	
	if (existe) {
		itemAtual.id = existe.id
		atualizaElemento(itemAtual);
		
		itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
	} else {
		itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;
		
		if (itemAtual.nome == "" || itemAtual.quantidade == "") {
			console.log('erro');
		} else {
			criaElemento(itemAtual);
		}
		
		itens.push(itemAtual);
	}

	localStorage.setItem("itemAtual", JSON.stringify(itens));
	
	nome.value ="";
	quantidade.value ="";
});

function criaElemento (item) {
	
	//<li><strong></strong></li>
	
	const novoItem = document.createElement('li');
	novoItem.classList.add('lista__item');
	
	const numeroItem = document.createElement('strong');
	numeroItem.innerHTML = item.quantidade;
	numeroItem.dataset.id = item.id;
	
	
	novoItem.appendChild(numeroItem);
	novoItem.innerHTML += item.nome;
	
	lista.appendChild(novoItem);
	console.log(novoItem);
	
	
	novoItem.appendChild(botaoDeleta(item.id));
}

function atualizaElemento (item) {
	document.querySelector("[data-id = '" +item.id+ "']").innerHTML = item.quantidade;
}

function botaoDeleta (id) {
	const botao = document.createElement("button");
	botao.innerText = "X";
	
	botao.classList.add("botao-remove")
	
	botao.addEventListener("click", function() {
		deletaItem(this.parentNode, id);
	});
	
	return botao;
}

function deletaItem (tag, id) {
	tag.remove();
	
	itens.splice(itens.findIndex(elemento => elemento.id === id) , 1);
	
	console.log(itens);
	
	localStorage.setItem("itemAtual", JSON.stringify(itens));
}

	
	
	
	/*botao.addEventListener("click", function() {
		botao.parentElement.remove();
	});*/
