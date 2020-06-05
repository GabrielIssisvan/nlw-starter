
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome").then( res =>  res.json() ).then (states => {

        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    // console.log(event.target.value)
    // console.log
    const ufValue = event.target.value
    const stateInput = document.querySelector("input[name=state]")    
    
   
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url).then( res =>  res.json() ).then (cities => {
        
        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })

}

 document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)
 
//items de coleta
//pegar todos os LI

const itemsToCollect =document.querySelectorAll(".items-grid li")

for (item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems =[]

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")
    const ItemId = itemLi.dataset.id
        
    //Visualizar LOG
    //Joga para console o resultado do ItemID
    // console.log('ITEM ID:',ItemId)
    
    //verificar itens selecionados
    //se sim pegar o item selecionado
    const alreadySelected = selectedItems.findIndex(item=>{
        const itemFound = item == ItemId // isso sera true ou false
        return itemFound
    })

    //se ja estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //tirar seleção
        const filteredItems = selectedItems.filter(item => {
            const ItemIsDifferent = item != ItemId // false
            return ItemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //se nao estiver selecionado, adicionar da seleção
        selectedItems.push(ItemId)
    }
    //mostra retorno na console

        //Visualizar LOG
    // console.log('Items selecionados',selectedItems)
 

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}