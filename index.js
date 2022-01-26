let daftarKategori = [
    "Peralatan Makan",
    "Bahan Makan",
    "Aksesoris",
    "Alat Musik",
    "Peralatan",
    "Pakaian",
    "Alat/Bahan Cuci",
    "Elektronik",
    "Alat Tulis",
    "Dokumen/Buku",
    "Alat Mandi",
    "Belum diKategorikan"
];

let daftarStatus = [
    "Ada",
    "Belum Dibeli",
    "Dipinjam",
    "Hilang",
    "Habis"
]

class Barang{
    constructor([nama, type, status, jumlah]){
        this.barang = nama;
        this.kategori = type;
        this.status = status;
        this.jumlah = jumlah;
    }

    array(){
        return [this.barang, this.kategori, this.status, this.jumlah];
    }

    edit(menu, value){
        this[menu] = value;
        this.all[menu] = value;
    }

    editAll(dataArr){
        [this.barang,
        this.kategori,
        this.status,
        this.jumlah] = dataArr;
    }

}

class BarangList{
    constructor(name, init = ""){
        this.namaList = name;
        this.list = [];

        if(!localStorage.getItem(name))
            this.simpanKeStorage();

        if(init != "")
            this.import(localStorage.getItem(init));
    }

    tambahBarang(dataArr){
        this.list.push(new Barang(dataArr));
        this.simpanKeStorage();
    }

    simpanKeStorage(){
        localStorage.setItem(this.namaList, this.export());
    }

    ambilIndex(menu, value){
        var keyRes = [];
        this.list.forEach((isi, key) => {
            if(isi[menu] == value)
                keyRes.push(key);
        });

        return keyRes;
    }

    export(){
        var exportData = [];
        this.list.forEach(isi => {
            exportData.push(isi.array());
        })
        return JSON.stringify(exportData);
    }

    import(data){
        var dataArr = JSON.parse(data);
        dataArr.forEach(isi => {
            this.list.push(new Barang(isi));
        });

        this.simpanKeStorage();
    }

    hapus(index){
        this.list.splice(index,1);
        this.simpanKeStorage();
    }

    getIndexData(index){
        return this.list[index].array();
    }

    async sortData(sortBy = "barang"){
        this.list.sort((dataA,dataB) => {
            if(dataA[sortBy] > dataB[sortBy])
                return 1;
            else if(dataA[sortBy] < dataB[sortBy])
                return -1;
            else if(dataA[sortBy] == dataB[sortBy])
                return 0;
        });

        this.simpanKeStorage();
    }
}

//if (!dataBarang)
//    localStorage.setItem("barang", "[]");

//function exportDataDariStorage(){
//    return JSON.stringify(dataBarang);
//}

//function importDataKeStorage(code){
//    dataBarang = JSON.parse(code);
//    localStorage.setItem("barang", code);
//}

//function tambahBarang (nama, type, status, jumlah=0) {
//    dataBarang.push({"barang": nama, "kategori": type, "status": status, "jumlah": jumlah});
//    localStorage.setItem("barang", JSON.stringify(dataBarang));
//
//    tampilkanBarang();
//}

//ngebuat Data Barang List
let dataBarang = new BarangList("barang-yoel", "barang-yoel");


//...

function viewEditBarang(objList, index){
    [namaBarang.value,
    typeBarang.value,
    sttsBarang.value,
    jmlhBarang.value] = objList.getIndexData(index);
    
    tmbhBarang.style.display = "none";
    editForm.style.display = "inline";
    editBarang.setAttribute("data", index);
    hapusBarang.setAttribute("data", index);
}

function tampilkanBarang(objList){
    dataTable.innerHTML = "";
    var totalBarang = 0;
    var totalJenis = 0;

    objList.list.forEach((prop, key) => {
        var tampil = (lihatDariKategori.value == "0" || prop.kategori == lihatDariKategori.value); //kategori
        tampil *= (lihatDariStatus.value == "0" || prop.status == lihatDariStatus.value); //status
        
        if(tampil){
            dataTable.innerHTML += "<tr> <td>" + prop.barang + "</td><td>" + prop.kategori + "</td><td>" + prop.status + "</td><td>" + prop.jumlah + "</td><td><button onclick='viewEditBarang(dataBarang,"+key+")' class='btn btn-outline-warning'>Edit</button></td> </tr>";
            totalBarang += Number(prop.jumlah);
            totalJenis++;
        }
        });
    
    jumlahBarangView.innerHTML = "Jumlah Barang: "+ totalBarang;
}

function hapusIsiForm(){
    namaBarang.value = "";
    typeBarang.value = lihatDariKategori.value != "0"? lihatDariKategori.value : "Pilih Kategori";
    sttsBarang.value = lihatDariStatus.value != "0"? lihatDariStatus.value : "Pilih Status";
    jmlhBarang.value = "";
}

function tambahBarangDariForm(objList){
    objList.tambahBarang([namaBarang.value, typeBarang.value, sttsBarang.value, jmlhBarang.value]);
    hapusIsiForm();
    tampilkanBarang(dataBarang);
}

function editBarangDariForm(objList, index){
    objList.list[index].editAll([namaBarang.value, typeBarang.value, sttsBarang.value, jmlhBarang.value]);
    
    hapusIsiForm();
    tampilkanBarang(objList);
    tmbhBarang.style.display = "inline";
    editForm.style.display = "none";
}

function hapusData(objList, index, cnfrm){
    if(!cnfrm)
        alert("Data Tidak diHapus!")
    else {
        objList.hapus(index);
        alert("Data pada index ke-"+ index +" sudah terhapus!");
    }

    hapusIsiForm();
    tampilkanBarang(objList);
    tmbhBarang.style.display = "inline";
    editForm.style.display = "none";
}

//function sortDataBarang(sortBy = "barang"){
//    dataBarang.sort((dataA,dataB) => {
//        if(dataA[sortBy] > dataB[sortBy])
//            return 1;
//        else if(dataA[sortBy] < dataB[sortBy])
//            return -1;
//        else if(dataA[sortBy] == dataB[sortBy])
//            return 0;
//    });
//    localStorage.setItem("barang", JSON.stringify(dataBarang));
//
//    tampilkanBarang();
//}

//sementara doang
function jalankanCodeTerminal(code){
    var returnedData = eval(code);
    logTerminal.innerHTML += returnedData + "<br>";

}
window.addEventListener('DOMContentLoaded', (event) => {
    tampilkanBarang(dataBarang);

    daftarKategori.forEach(isi => {
        typeBarang.innerHTML += `<option value='${isi}'>${isi}</option>`;
        lihatDariKategori.innerHTML += `<option value='${isi}'>${isi}</option>`;
    });
    daftarStatus.forEach(isi => {
        sttsBarang.innerHTML += `<option value='${isi}'>${isi}</option>`;
        lihatDariStatus.innerHTML += `<option value='${isi}'>${isi}</option>`;
    });
});
