let dataBarang = JSON.parse(localStorage.getItem("barang"));

if (!dataBarang)
    localStorage.setItem("barang", "[]");

function exportDataDariStorage(){
    return JSON.stringify(dataBarang);
}

function importDataKeStorage(code){
    dataBarang = JSON.parse(code);
    localStorage.setItem("barang", code);
}

function tambahBarang (nama, type, jumlah=0) {
    dataBarang.push({"barang":nama, "kategori":type, "jumlah":jumlah});
    localStorage.setItem("barang", JSON.stringify(dataBarang));

    tampilkanBarang();
}

function viewEditBarang(index){
    [namaBarang.value, typeBarang.value, jmlhBarang.value] = [dataBarang[index].barang, dataBarang[index].kategori, dataBarang[index].jumlah];
    tmbhBarang.style.display = "none";
    editBarang.style.display = "inline";
    editBarang.setAttribute("data", index);
}

function tampilkanBarang(){
    dataTable.innerHTML = "";

    /*dataBarang.forEach( (prop,key) => {
        dataTable.innerHTML += "<tr> <td>"+prop.barang+"</td><td>"+prop.kategori+"</td><td>"+prop.jumlah+"</td><td><button onclick='viewEditBarang("+key+")' class='btn btn-outline-warning'>Edit</button></td> </tr>";
    });*/
    dataBarang.forEach( (prop,key) => {
        if(lihatDari.value == "0"){
            //pass
        } else { 
            if(prop.kategori != lihatDari.value)
                return 0;
        }

            dataTable.innerHTML += "<tr> <td>"+prop.barang+"</td><td>"+prop.kategori+"</td><td>"+prop.jumlah+"</td><td><button onclick='viewEditBarang("+key+")' class='btn btn-outline-warning'>Edit</button></td> </tr>";
        });
    
    
}

function hapusIsiForm(){
    [namaBarang.value, typeBarang.value, jmlhBarang.value] = ["", "", ""];
}

function tambahBarangDariForm(){
    tambahBarang(namaBarang.value, typeBarang.value, jmlhBarang.value);
    hapusIsiForm();
}

function editBarangDariForm(index){
    [dataBarang[index].barang, dataBarang[index].kategori, dataBarang[index].jumlah] = [namaBarang.value, typeBarang.value, jmlhBarang.value];
    hapusIsiForm();
    tampilkanBarang();
    tmbhBarang.style.display = "inline";
    editBarang.style.display = "none";
}

window.addEventListener('DOMContentLoaded', (event) => {
    tampilkanBarang();
});
