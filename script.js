function validateCardNumber(number) {
    number = number.replace(/\s/g, ''); //Removendo espaços em branco

    const regex = new RegExp("^[0-9]{13,19}$"); //Checando se o valor contém apenas números 
                                                //E se o valor possui entre 13 e 19 dígitos
    if (!regex.test(number)) {
        return false;
    }

    var val = number;

    let checksum = 0;   //Iniciando o checkador da soma
    let j = 1;  //Pega valores entre 1 e 2

    for (let i = val.length - 1; i >= 0; i--) {    //Passa por cada dígito, começando pelo último
        let calc = 0;

        calc = Number(val.charAt(i)) * j;   //Pega o próximo dígito e multiplica por 1 ou 2, alternadamente

        if (calc > 9) { //Se o resultado tiver dois dígitos, é adicionado 1 na soma total
            checksum = checksum + 1;
            calc = calc - 10;
        }

        checksum = checksum + calc; //E é adicionado as unidades na soma total

        j = j == 1 ? 2 : 1; //Trocamos então o valor de j
    }

    return (checksum % 10) == 0;    //Checa para ver se a soma é divisível por 10
};

function displayErrors(errorCode) {
    console.log(errorCode);
}

function validateCard(field) {
    if (field == "cardNumber" || field == "all") {
        var cardNumberValue = cardNumber.value;
        if (cardNumberValue === '') return displayErrors('0'); //Campo do número vazio

        var numberValid = validateCardNumber(cardNumberValue);
        if (!numberValid) return displayErrors('5'); //Número do cartão inválido
    }

    if (field == "cardName" || field == "all") {
        var cardNameValue = cardName.value;
        if (cardNameValue === '') return displayErrors('1'); //Campo do nome vazio

        var nameValid = cardName.match(" ") != null && cardName.match(/\w/g).length > 7;
        if (!nameValid) return displayErrors('6'); //Nome do cartão inválido (Menos de dois nomes com no mínimo 3 letras cada)
    }

    if (field == "cardMonth"|| field == "all") {
        var cardMonthValue = cardMonth.value;
        if (cardMonthValue === '') return displayErrors('2'); //Campo do mês vazio

        var monthValid = cardMonth.match(/[a-z]|[A-Z]/g) == null && cardMonth.length == 2;
        if (!monthValid) return displayErrors('7'); //Mês do cartão inválido (Não é número ou não tem dois dígitos)
    }

    if (field == "cardYear" || field == "all") {
        var cardYearValue = cardYear.value;
        if (cardYearValue === '') return displayErrors('3'); //Campo do ano vazio

        var yearValid = cardYear.match(/[a-z]|[A-Z]/g) == null && cardYear.length == 4;
        if (!yearValid) return displayErrors('8'); //Ano do cartão inválido (Não é número ou não tem 4 dígitos)
    }

    if (field == "cardCvv" || field == "all") {
        var cardCvvValue = cardCvv.value;
        if (cardCvvValue === '') return displayErrors('4'); //Campo do cvv vazio

        var cvvValid = cardCvv.match(/[a-z]|[A-Z]/g) == null && cardCvv.length > 2 && cardCvv.length < 5;
        if (!cvvValid) return displayErrors('9'); //Cvv inválido (Não é número ou não tem 3 ou 4 dígitos)
    }

    if (field == "all") {
        var now = new Date();
        var cardDate = new Date(cardYear, cardMonth + 1);
    
        var dateValid = now < cardDate;
        if (!dateValid) return false, '10'; // Cartão já expirou
    }

    return true;
};



var cardNumber = document.querySelector('#cardNumber');
cardNumber.addEventListener('change', () => validateCard('cardNumber'));

var cardName = document.querySelector('#cardName');
cardName.addEventListener('change', () => validateCard('cardName'));

var cardMonth = document.querySelector('#cardMonth');
cardMonth.addEventListener('change', () => validateCard('cardMonth'));

var cardYear = document.querySelector('#cardYear');
cardYear.addEventListener('change', () => validateCard('cardYear'));

var cardCVV = document.querySelector('#cardCVV');
cardCVV.addEventListener('change', () => validateCard('cardCVV'));

var btnSend = document.querySelector('#btnSend');
btnSend.addEventListener('click', function(e) {
    e.preventDefault();
    validateCard('all');
});