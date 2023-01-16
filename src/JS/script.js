let shoplistItens=[{
    id:'1',
    amount:'1 kg',
    name:'Banana'
}];
// let shoplistItens=[]


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
            name: itemName
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
            <td>${shopItem.name}</td>
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
    document.getElementById('editItem').value = editedItem.name
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
    if(editedItem==''||editedAmount==''||editedAmount<=0||editedtypeValue==''){
        alert('Por favor, verifique se o NOME do seu item, a QUANTIDADE e a SELEÇÃO de unidades de medida estão devidamente preenchidas')
    } else{
        shoplistItens[editedIndex] = {
            id: editedId,
            amount:editedAmount + editedtypeValue, 
            name:editedItem
        }
        renderList()
        hideEditForm()
    }
    
}

let deleteItemRow = (id)=>{
    shoplistItens = shoplistItens.filter(shopItem => shopItem.id != id);
    shoplistItens.forEach(shopItem=>{
        shopItem.id = shoplistItens.indexOf(shopItem)+1
    })
    renderList()
}

let showStock=()=>{
    document.getElementById('container').style.display="none"
    document.getElementById('stockForm').style.display="block"
    document.getElementById('stockForm').style.position="absolute"
}

let hideStock=()=>{
    document.getElementById('container').style.display="block"
    document.getElementById('stockForm').style.display="none"
    document.getElementById('stockForm').style.position="static"
}

renderList()