// dados de entrada

var data = new Date();
var time = data.getHours();
console.log(time);

if (time >= 10) {
  var day = String(data.getDate()).padStart(2, "0");
  var month = String(data.getMonth() + 1).padStart(2, "0");
  var year = data.getFullYear();
  console.log(day);
  console.log(month);
  console.log(year);
} else {
  var day = String(data.getDate() - 1).padStart(2, "0");
  var month = String(data.getMonth() + 1).padStart(2, "0");
  var year = data.getFullYear();
  console.log(day);
  console.log(month);
  console.log(year);
}

//puxar cotacao do dolar

var urlDolar =
  "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" +
  month +
  "-" +
  day +
  "-" +
  year +
  "'&$format=json";
let requestDolar = new XMLHttpRequest();
requestDolar.open("GET", urlDolar, true);
requestDolar.onload = function () {
  if (requestDolar.readyState == 4 && requestDolar.status == 200) {
    var respostaDolar = JSON.parse(requestDolar.responseText);
    var valoresDolar = respostaDolar.value[0];
    cotDolar = valoresDolar.cotacaoCompra;
  }
};
requestDolar.onerror = function () {
  console.log("Erro:" + requestDolar);
};
requestDolar.send();

//puxar cotacao do euro

var urlEuro =
  "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='EUR'&@dataCotacao='" +
  month +
  "-" +
  day +
  "-" +
  year +
  "'&$top=100&$format=json&$select=cotacaoCompra";

let requestEuro = new XMLHttpRequest();
requestEuro.open("GET", urlEuro, true);
requestEuro.onload = function () {
  if (requestEuro.readyState == 4 && requestEuro.status == 200) {
    var respostaEuro = JSON.parse(requestEuro.responseText);
    var valoresEuro = respostaEuro.value[4];
    cotEuro = valoresEuro.cotacaoCompra;
  }
};
requestEuro.onerror = function () {
  console.log("Erro:" + requestEuro);
};
requestEuro.send();

//puxar cotacao do libra

var urlLibra =
  "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='GBP'&@dataCotacao='" +
  month +
  "-" +
  day +
  "-" +
  year +
  "'&$top=100&$format=json&$select=cotacaoCompra";

let requestLibra = new XMLHttpRequest();
requestLibra.open("GET", urlLibra, true);
requestLibra.onload = function () {
  if (requestLibra.readyState == 4 && requestLibra.status == 200) {
    var respostaLibra = JSON.parse(requestLibra.responseText);
    var valoresLibra = respostaLibra.value[4];
    cotLibra = valoresLibra.cotacaoCompra;
  }
};
requestLibra.onerror = function () {
  console.log("Erro:" + requestLibra);
};
requestLibra.send();

//puxar cotacao do iene

var urlIene =
  "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='JPY'&@dataCotacao='" +
  month +
  "-" +
  day +
  "-" +
  year +
  "'&$top=100&$format=json&$select=cotacaoCompra";

let requestIene = new XMLHttpRequest();
requestIene.open("GET", urlIene, true);
requestIene.onload = function () {
  if (requestIene.readyState == 4 && requestIene.status == 200) {
    var respostaIene = JSON.parse(requestIene.responseText);
    var valoresIene = respostaIene.value[4];
    cotIene = valoresIene.cotacaoCompra;
  }
};
requestIene.onerror = function () {
  console.log("Erro:" + requestIene);
};
requestIene.send();

//puxar cotacao do bitcoin

var urlBitcoin =
  "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL";

let requestBitcoin = new XMLHttpRequest();
requestBitcoin.open("GET", urlBitcoin, true);
requestBitcoin.onload = function () {
  if (requestBitcoin.readyState == 4 && requestBitcoin.status == 200) {
    var respostaBitcoin = JSON.parse(requestBitcoin.responseText);

    var valoresBitcoin = respostaBitcoin.BTCBRL;
    cotBitcoin1 = valoresBitcoin.bid;
    var cotBitcoin2 = cotBitcoin1.replace(".", "");
    cotBitcoin = cotBitcoin2;
    console.log(cotBitcoin);
  }
};
requestBitcoin.onerror = function () {
  console.log("Erro:" + requestBitcoin);
};
requestBitcoin.send();

// ----------------------

// programa converter

function Converter() {
  var valorElemento = document.getElementById("valor");
  var valor = valorElemento.value;
  var valorNumerico = parseFloat(valor);

  var valorDolar1 = valorNumerico / cotDolar;
  var valorDolar = valorDolar1.toFixed(2);
  var moedaDolar = "USD " + valorDolar;
  var cotDiaDolar = "US$ 1.00 = " + "R$ " + cotDolar;
  var printmoedaDolar = document.getElementById("resultadoDolar");
  printmoedaDolar.innerHTML = moedaDolar;
  var printCotDolar = document.getElementById("cotDiaDolar");
  printCotDolar.innerHTML = cotDiaDolar;

  var valorEuro1 = valorNumerico / 6;
  var valorEuro = valorEuro1.toFixed(2);
  var moedaEuro = "EUR " + valorEuro;
  var cotDiaEuro = "€ 1.00 = " + "R$ " + cotEuro;
  var printmoedaEuro = document.getElementById("resultadoEuro");
  printmoedaEuro.innerHTML = moedaEuro;
  var printCotEuro = document.getElementById("cotDiaEuro");
  printCotEuro.innerHTML = cotDiaEuro;

  var valorLibra1 = valorNumerico / cotLibra;
  var valorLibra = valorLibra1.toFixed(2);
  var moedaLibra = "GBP " + valorLibra;
  var cotDiaLibra = "£ 1.00 = " + "R$ " + cotLibra;
  var printmoedaLibra = document.getElementById("resultadoLibra");
  printmoedaLibra.innerHTML = moedaLibra;
  var printCotLibra = document.getElementById("cotDiaLibra");
  printCotLibra.innerHTML = cotDiaLibra;

  var valorIene1 = valorNumerico * cotIene;
  var valorIene = valorIene1.toFixed(2);
  var moedaIene = "JPY " + valorIene;
  var cotDiaIene = "¥ 1.00 = " + "R$ " + cotIene;
  var printmoedaIene = document.getElementById("resultadoIene");
  printmoedaIene.innerHTML = moedaIene;
  var printCotIene = document.getElementById("cotDiaIene");
  printCotIene.innerHTML = cotDiaIene;

  var valorBitcoin1 = valorNumerico / cotBitcoin;
  var valorBitcoin = valorBitcoin1.toFixed(2);
  var moedaBitcoin = "BTC " + valorBitcoin;
  var cotDiaBitcoin = "₿ 1.00 = " + "R$ " + cotBitcoin;
  var printmoedaBitcoin = document.getElementById("resultadoBitcoin");
  printmoedaBitcoin.innerHTML = moedaBitcoin;
  var printCotBitcoin = document.getElementById("cotDiaBitcoin");
  printCotBitcoin.innerHTML = cotDiaBitcoin;
}