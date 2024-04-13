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
    const salarioAposInss = salarioBruto - inss;
    if (salarioAposInss <= 1903.98) {
        return 0;
    } else if (salarioAposInss <= 2826.65) {
        return salarioAposInss * 0.075 - 142.80;
    } else if (salarioAposInss <= 3751.05) {
        return salarioAposInss * 0.15 - 354.80;
    } else if (salarioAposInss <= 4664.68) {
        return salarioAposInss * 0.225 - 636.13;
    } else {
        return salarioAposInss * 0.275 - 869.36;
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
    let detalhesAdicionais = {
        noturno: adicionais.noturno ? salarioBase * 0.20 : 0,
        periculosidade: adicionais.periculosidade ? salarioBase * 0.30 : 0
    };

    // Insalubridade
    if (adicionais.insalubridade && adicionais.insalubridadeGrau) {
        const percentuais = {
            minimo: 0.10, // 10%
            medio: 0.20,  // 20%
            maximo: 0.40  // 40%
        };
        const grau = adicionais.insalubridadeGrau;
        const valorInsalubridade = salarioBase * percentuais[grau];

        detalhesAdicionais.insalubridade = {
            valor: valorInsalubridade,
            grau: grau
        };
    } else {
        detalhesAdicionais.insalubridade = {
            valor: 0,
            grau: 'não especificado'
        };
    }

    // Cálculo do total de adicionais incluindo insalubridade
    let totalAdicionais = detalhesAdicionais.noturno + detalhesAdicionais.periculosidade +
        (detalhesAdicionais.insalubridade ? detalhesAdicionais.insalubridade.valor : 0);

    return {
        totalAdicionais,
        detalhesAdicionais
    };
}




function calcularHorasExtras(quantidade, valorHoraExtra) {
    return quantidade * valorHoraExtra;
}

async function gerarHolerite(idFuncionario, mes, ano) {
    try {
        const funcionario = await buscarFuncionarioPorId(idFuncionario);
        const empresas = await buscarEmpresas();
        const empresa = empresas.length > 0 ? empresas[0] : null;

        if (!empresa || !funcionario) {
            return { erro: 'Empresa ou Funcionário não encontrado' };
        }

        const salarioBase = funcionario.salarioBase;
        // A função calcularAdicionais agora retorna um objeto com totalAdicionais e detalhes
        const { totalAdicionais, detalhesAdicionais } = calcularAdicionais(salarioBase, funcionario.adicionais);
        const horasExtras = calcularHorasExtras(funcionario.horasExtras.quantidade, funcionario.horasExtras.valorHoraExtra);
        const descontos = calcularDescontos(salarioBase, funcionario.valeTransporteBeneficio);
        const fgts = calcularFGTS(salarioBase + totalAdicionais + horasExtras);
        const salarioBruto = salarioBase + totalAdicionais + horasExtras;
        const salarioLiquido = salarioBruto - descontos.totalDescontos;

        return {
            DadosEmpregador: {
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
                adicionaisDetalhados: {
                    totalAdicionais: totalAdicionais,
                    noturno: detalhesAdicionais.noturno,
                    insalubridade: detalhesAdicionais.insalubridade.valor,
                    insalubridadeGrau: detalhesAdicionais.insalubridade.grau,
                    periculosidade: detalhesAdicionais.periculosidade
                },
                horasExtras,
                salarioBruto,
                descontosDetalhados: descontos,
                fgts,
                salarioLiquido,
                totalProventos: salarioBruto,
                totalDescontos: descontos.totalDescontos
            }
        };

    } catch (erro) {
        console.error(erro);
        return { erro: erro.message };
    }
}

module.exports = { gerarHolerite };
