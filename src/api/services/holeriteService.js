const { buscarFuncionarioPorId } = require('../models/funcionarioModel');
const { buscarEmpresas } = require('../models/empresaModel');

function calcularFGTS(salarioBruto) {
    return salarioBruto * 0.08;
}

function calcularINSS(salarioBruto) {
    if (salarioBruto <= 1751.81) {
        return salarioBruto * 0.08;
    } else if (salarioBruto <= 2919.72) {
        return salarioBruto * 0.09;
    } else if (salarioBruto <= 5839.45) {
        return salarioBruto * 0.11;
    } else {
        return 642.34; // Valor fixo para a faixa mais alta
    }
}

function calcularIRRF(salarioBruto, inss) {
    // Considerando o INSS já calculado para dedução
    const salarioAposInss = salarioBruto - inss;

    if (salarioAposInss <= 1903.98) {
        return 0;
    } else if (salarioAposInss <= 2826.65) {
        return salarioAposInss * 0.075;
    } else if (salarioAposInss <= 3751.05) {
        return salarioAposInss * 0.15;
    } else if (salarioAposInss <= 4664.68) {
        return salarioAposInss * 0.225;
    } else {
        return salarioAposInss * 0.275;
    }
}

function calcularDescontos(salarioBruto, valeTransporteBeneficio) {
    const inss = calcularINSS(salarioBruto);
    const irrf = calcularIRRF(salarioBruto, inss);
    
    const valeTransporte = valeTransporteBeneficio ? salarioBruto * 0.06 : 0;
    const valeAlimentacao = salarioBruto * 0.1;

    const totalDescontos = inss + irrf + valeTransporte + valeAlimentacao;

    return {
        inss,
        irrf,
        valeTransporte,
        valeAlimentacao,
        totalDescontos
    };
}

function calcularAdicionais(salarioBase, adicionais) {
    let totalAdicionais = 0;

    // Adicional Noturno
    if (adicionais.noturno) totalAdicionais += salarioBase * 0.20;

    // Adicional de Insalubridade
    if (adicionais.insalubridade) {
        // Adicione lógica para calcular com base no grau de insalubridade
        // Exemplo: adicionais.insalubridadeGrau pode ser 'minimo', 'medio' ou 'maximo'
    }

    // Adicional de Periculosidade
    if (adicionais.periculosidade) totalAdicionais += salarioBase * 0.30;

    return totalAdicionais;
}


async function gerarHolerite(idFuncionario, mes, ano) {
    try {
        const funcionario = await buscarFuncionarioPorId(idFuncionario);
        const empresas = await buscarEmpresas();
        const empresa = empresas[0];

        if (!empresa) {
            return { erro: 'Empresa não encontrada' };
        }

        if (!funcionario) {
            return { erro: 'Funcionário não encontrado' };
        }

        const salarioBase = funcionario.salarioBase;
        const descontos = calcularDescontos(salarioBase, funcionario.valeTransporteBeneficio);
        const fgts = calcularFGTS(salarioBase); // FGTS não é descontado do funcionário, é um encargo do empregador
        const adicionais = calcularAdicionais(salarioBase, funcionario.adicionais);
        const salarioBruto = salarioBase + adicionais; // Adicionar a lógica para adicionais se houver
        const salarioLiquido = salarioBruto - descontos.totalDescontos;

        const holerite = {
            DadosEmpregador: { // Adicionando os detalhes da empresa
                nomeFantasia: empresa.nomeFantasia,
                cnpj: empresa.cnpj,
                endereco: empresa.endereco,
                telefone: empresa.telefone
            },
            DadosEmpregado: {
                nome: funcionario.nome,
                cargo: funcionario.cargo,
                periodo: `${mes}/${ano}`,
                salarioBase,
                salarioBruto,
                salarioLiquido,
                horasExtras: 0, // Adicionar lógica para calcular horas extras
                descontos: { ...descontos, fgts },
                adicionais: {adicionais},
                totalProventos: salarioBruto, // Adicionar lógica se houver outros proventos
                totalDescontos: descontos.totalDescontos

            },
        };

        return holerite;
    } catch (erro) {
        console.error(erro);
        return { erro: erro.message };
    }
}

module.exports = { gerarHolerite };