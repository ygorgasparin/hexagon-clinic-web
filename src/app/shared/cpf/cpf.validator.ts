export const CPF_VALIDATOR = function (cpf: string) {
    let s, r;

    console.log(cpf);

    s = 0;
    if (cpf == "00000000000") return false;

    for (let i = 1; i <= 9; i++) s = s + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    r = (s * 10) % 11;

    if ((r == 10) || (r == 11)) r = 0;
    if (r != parseInt(cpf.substring(9, 10))) return false;

    s = 0;
    for (let i = 1; i <= 10; i++) s = s + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    r = (s * 10) % 11;



    if ((r == 10) || (r == 11)) r = 0;
    if (r != parseInt(cpf.substring(10, 11))) return false;
    return true;
}