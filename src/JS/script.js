let shoplistItens=[{
    id:'1',
    amount:'1 kg',
    desc:'Banana',
    numberAmount: 1,
    typeAmount: 'kg'
},{
    id:'2',
    amount:'3 kg',
    desc:'Laranja',
    numberAmount: 3,
    typeAmount: 'kg'
}];

let stocklistItens=[{
    id:'1',
    amount: '1 kg',
    desc:'Banana',
    numberAmount:1,
    typeAmount: 'kg'
},
{
    id:'2',
    amount:'5 kg',
    desc:'Laranja',
    numberAmount: 5,
    typeAmount: 'kg'
}]

// logica do comparativo entre os elementos "desc" dos objetos em cada indice dos arrays stocklistItens e shoplistItens
stocklistItens.find(callback => callback.desc == 'Banana'  )


let addToList= ()=>{
    let itemName = document.getElementById('itemName').value ;
    let itemAmount = document.getElementById('itemAmount').value;
    let itemType = document.getElementById('itemType');
    let typeValue = itemType.options[itemType.selectedIndex].value;
    
    
    const listedItemId= shoplistItens.length +1;
    if(itemName==''||itemAmount==''||itemAmount<=0||typeValue==''){
        alert('Por favor, verifique se o NOME do seu item, a QUANTIDADE e a SELEÇÃO de unidades de medida estão devidamente preenchidas')
    } else {
        shoplistItens.push({
            id: listedItemId,
            amount: itemAmount + typeValue ,
            desc: itemName,
            numberAmount:itemAmount,
            typeAmount: typeValue
        });
        
        
        renderList()
        document.getElementById('itemName').value=''
        document.getElementById('itemAmount').value=''
      
    }
    
    itemName = '';
    itemAmount = '';
};

let renderList = ()=>{
    let shopListTable = document.getElementById('shopListTable')
    shopListTable.innerHTML=`
    <thead>
        <tr>
            <th scope="col">Quantidade</th>
            <th scope="col">Item</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `
    shoplistItens.forEach(shopItem =>{
        const itemRow=`
        <tr>
            <td>${shopItem.amount}</td>
            <td>${shopItem.desc}</td>
            <td style="width: fit-content;">
                <button class="btn btn-info btn-sm" onclick="showEditForm(${shopItem.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteItemRow(${shopItem.id})">Deletar</button>
            </td>
        </tr>`
        shopListTable.innerHTML += itemRow
    })
}

let showEditForm = (id)=>{
    
    const editedItem = shoplistItens.find(listItem => listItem.id == id)
    document.getElementById('editId').value = editedItem.id
    document.getElementById('editItem').value = editedItem.desc
    document.getElementById('editAmount').value = editedItem.amount
    document.getElementById('container').style.opacity="0.3"
    document.getElementById('editForm').style.display="block"
    document.getElementById('editForm').style.position="Absolute"
}



let hideEditForm = ()=>{
    document.getElementById('container').style.opacity="1"
    document.getElementById('editForm').style.display="none"
}

let updateItemRow = ()=>{
    editedItemType = document.getElementById('editItemType');
    editedtypeValue = editedItemType.options[editedItemType.selectedIndex].value;
    editedId = document.getElementById('editId').value
    editedItem = document.getElementById('editItem').value
    editedAmount = document.getElementById('editAmount').value
    editedIndex = shoplistItens.findIndex(shopIndex => shopIndex.id == editedId)
    if(editedItem==''||editedAmount==''||editedAmount<0||editedtypeValue==''){
        alert('Por favor, verifique se o NOME do seu item, a QUANTIDADE e a SELEÇÃO de unidades de medida estão devidamente preenchidas')
    } else{
        shoplistItens[editedIndex] = {
            id: editedId,
            amount:editedAmount + editedtypeValue, 
            desc:editedItem,
            numberAmount:editedAmount,
            typeAmount: editedtypeValue
        }
        renderList()
        hideEditForm()
    }  
}


let deleteItemRow = (id)=>{
    let selectedToDelete= shoplistItens[id-1].desc
    let confirmation = confirm(`Deseja deletar ${(selectedToDelete)} da lista?`)
    if(confirmation==true){
        shoplistItens = shoplistItens.filter(shopItem => shopItem.id != id);
        shoplistItens.forEach(shopItem=>{
            shopItem.id = shoplistItens.indexOf(shopItem)+1
        })
        renderList()
    } else{
        renderList()
    }
}

let showStock=()=>{
    renderStock()
    document.getElementById('container').style.display="none"
    document.getElementById('stockForm').style.display="block"
    document.getElementById('stockForm').style.position="absolute"

}

let hideStock=()=>{
    document.getElementById('container').style.display="block"
    document.getElementById('stockForm').style.display="none"
    document.getElementById('stockForm').style.position="static"
}

let showStockEditor =(stockItemId)=>{
    stockEditItem = stocklistItens.find(editStockitem=>editStockitem.id == stockItemId)
    editStockId= document.getElementById('editStockId').value= stockEditItem.id
    editStockedItem = document.getElementById('editStockedItem').value = stockEditItem.desc
    editStockedAmount = document.getElementById('editStockedAmount').value = stockEditItem.amount
    document.getElementById('stockForm').style.opacity = '0.3'
    document.getElementById('stockEditor').style.display='block'
    document.getElementById('stockEditor').style.position='absolute'
}

let hideStockEditor=()=>{
    document.getElementById('stockForm').style.opacity = '1'
    document.getElementById('stockEditor').style.display='none'
}


let updateStockRow=()=>{
    updatedItemType = document.getElementById('editStockedType');
    updatedtypeValue = updatedItemType.options[updatedItemType.selectedIndex].value;
    updatedStockedId = document.getElementById('editStockId').value
    updatedStockedName= document.getElementById('editStockedItem').value
    updatedStockedAmount= document.getElementById('editStockedAmount').value
    updatedIndex= stocklistItens.findIndex(stockItem => stockItem.id ==updatedStockedId )
    if(updatedStockedName==''||updatedStockedAmount==''||updatedStockedAmount<0||updatedtypeValue==''){
        alert('Por favor, verifique se o NOME do seu item, a QUANTIDADE e a SELEÇÃO de unidades de medida estão devidamente preenchidas')
    } else{
        stocklistItens[updatedIndex] = {
            id:updatedStockedId,
            amount:updatedStockedAmount + updatedtypeValue,
            desc:updatedStockedName,
            numberAmount:updatedStockedAmount,
            typeAmount: updatedtypeValue
        }
        renderStock()
        hideStockEditor()
    }
}

let deleteStockRow=(id)=>{
    let markedToDelet= stocklistItens[id-1].desc
    let deleteConfirmation = confirm(`Deseja deletar ${(markedToDelet)} do estoque?`)
    if(deleteConfirmation==true){
        stocklistItens = stocklistItens.filter(stockItem => stockItem.id != id);
        
        renderStock()
    } else{
        renderStock()
    }
}



let sendToStock=()=>{
    let sendConfirmation = confirm(`Ao apertar "OK" você enviará todos os itens da lista para seu estoque e LIMPARÁ a lista, caso deseje cancelar, por favor, aperte "Cancelar"!`)
    if(sendConfirmation==true){
        
        shoplistItens.forEach(listItem => {
            const index= stocklistItens.findIndex(stockItem => stockItem.desc == listItem.desc &&stockItem.typeAmount==listItem.typeAmount)
            
            if(index<0){
                stocklistItens.push(listItem)
                
            } else{
                stocklistItens[index].numberAmount+=listItem.numberAmount
                stocklistItens[index].amount=stocklistItens[index].numberAmount +' '+ stocklistItens[index].typeAmount
            }
            
        } )
        shoplistItens = []
        console.log(stocklistItens)
        renderList()
        renderStock()
        
    }
}


let renderStock = ()=>{
    let stockListTable = document.getElementById('stockTable')
    stockListTable.innerHTML=`
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Item</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>`
    stocklistItens.forEach(stockItem =>{
        stockItem.id = stocklistItens.indexOf(stockItem)+1
        const stockRow=`
        <tr>
            <td>${stockItem.id}</td>
            <td>${stockItem.amount}</td>
            <td>${stockItem.desc}</td>
            <td style="width: fit-content;">
                <button class="btn btn-info btn-sm" onclick="showStockEditor(${stockItem.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStockRow(${stockItem.id})">Deletar</button>
            </td>
        </tr>`
        stockListTable.innerHTML += stockRow
        
    })
}



let clearList=()=>{
    let clearListConfirmation = confirm(`Aperte "OK" para DELETAR todos os itens da lista, aperte "CANCELAR" para retornar à lista sem alterá-la!`)
    if(clearListConfirmation==true)
    for(cont=shoplistItens.length;cont>0;cont=cont-1){
        shoplistItens.shift()
    }
    renderList()
    }

let clearStock=()=>{
        let clearStockConfirmation = confirm(`Aperte "OK" para DELETAR todos os itens da lista, aperte "CANCELAR" para retornar à lista sem alterá-la!`)
        if(clearStockConfirmation==true)
        for(cont=stocklistItens.length;cont>0;cont=cont-1){
            stocklistItens.shift()
        }
        renderStock()
}

renderList()
renderStock()